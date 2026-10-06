import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../server/contact.js";
import { rateLimit } from "../server/rate-limit.js";
import { sendContact } from "../server/email.js";
import { validateContact } from "../src/validation.js";
const env = {
  SITE_URL: "https://company.test",
  CONTACT_EMAIL: "office@company.test",
  EMAIL_FROM: "web@company.test",
  RESEND_API_KEY: "test-placeholder",
  UPSTASH_REDIS_REST_URL: "https://database.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "test-placeholder",
  RATE_LIMIT_SECRET: "test-only-key-with-at-least-32-characters",
};
const payload = {
  nome: "Mario Rossi",
  email: "mario@example.test",
  telefono: "+39 0377 000000",
  tipo_richiesta: "preventivo",
  messaggio: "Richiesta di informazioni sul trasporto.",
  website: "",
  startedAt: 10000,
  requestId: "11111111-1111-4111-8111-111111111111",
};
const request = (body = payload, headers = {}, method = "POST") =>
  new Request("https://company.test/api/contact", {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: env.SITE_URL,
      "x-vercel-forwarded-for": "192.0.2.1",
      ...headers,
    },
    ...(method !== "GET"
      ? { body: typeof body === "string" ? body : JSON.stringify(body) }
      : {}),
  });
const make = (options = {}) =>
  createContactHandler({
    env,
    now: () => 15000,
    limiter: async () => ({ allowed: true }),
    sender: async () => {},
    ...options,
  });

test("valid data is delivered to the server-configured sender and accepted", async () => {
  let sent;
  const response = await make({
    sender: async (data) => {
      sent = data;
    },
  })(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(sent.email, payload.email);
  assert.equal(sent.website, undefined);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
for (const [name, body] of [
  ["empty fields", { ...payload, nome: "   " }],
  ["invalid email", { ...payload, email: "bad" }],
  ["header injection", { ...payload, email: "a@b.test\r\nBcc: victim@b.test" }],
  ["unknown type", { ...payload, tipo_richiesta: "__proto__" }],
  ["too long", { ...payload, messaggio: "x".repeat(5001) }],
  ["non-string", { ...payload, telefono: {} }],
  ["control characters", { ...payload, nome: "Mario\u0000Rossi" }],
  ["empty body", null],
  ["honeypot", { ...payload, website: "bot" }],
  ["too fast", { ...payload, startedAt: 14900 }],
  ["expired", { ...payload, startedAt: -90000000 }],
  ["invalid request id", { ...payload, requestId: "bad" }],
]) {
  test(name + " is rejected without email", async () => {
    let sent = false;
    const response = await make({
      sender: async () => {
        sent = true;
      },
    })(request(body));
    assert.equal(response.status, 400);
    assert.equal(sent, false);
  });
}
test("multiline text and optional telephone allowed", () => {
  const result = validateContact({
    ...payload,
    telefono: "",
    messaggio: "Buongiorno,\nvorrei un preventivo.\nGrazie.",
  });
  assert.deepEqual(result.errors, {});
});
test("method, content type and origin checks", async () => {
  assert.equal((await make()(request(undefined, {}, "GET"))).status, 405);
  assert.equal(
    (await make()(request(payload, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await make()(request(payload, { Origin: "https://attacker.test" })))
      .status,
    403,
  );
  assert.equal(
    (await make()(request(payload, { "sec-fetch-site": "cross-site" }))).status,
    403,
  );
});
test("oversized body is rejected including with no Content-Length", async () => {
  assert.equal(
    (await make()(request('"' + "x".repeat(25000) + '"'))).status,
    413,
  );
  assert.equal(
    (await make()(request(payload, { "Content-Length": "25000" }))).status,
    413,
  );
});
test("malformed JSON is rejected", async () => {
  assert.equal((await make()(request("{"))).status, 400);
});
test("missing configuration fails closed", async () => {
  assert.equal((await make({ env: {} })(request())).status, 503);
  assert.equal(
    (await make({ env: { ...env, RATE_LIMIT_SECRET: "short" } })(request()))
      .status,
    503,
  );
});
test("rate limit returns Retry-After and never sends", async () => {
  let sent = false;
  const response = await make({
    limiter: async () => ({ allowed: false, retryAfter: 100 }),
    sender: async () => {
      sent = true;
    },
  })(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "100");
  assert.equal(sent, false);
});
test("provider errors are not leaked", async () => {
  const response = await make({
    sender: async () => {
      throw new Error("secret-provider-details");
    },
  })(request());
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /secret-provider-details/);
});
test("Redis failure fails closed", async () => {
  let sent = false;
  const response = await make({
    limiter: async () => {
      throw new Error("secret");
    },
    sender: async () => {
      sent = true;
    },
  })(request());
  assert.equal(response.status, 503);
  assert.equal(sent, false);
});
test("atomic Redis EVAL stores only HMAC and TTL, persists across handlers", async () => {
  let counter = 0;
  const fetcher = async (_url, options) => {
    const command = JSON.parse(options.body);
    assert.equal(command[0], "EVAL");
    assert.match(command[1], /EXPIRE/);
    assert.equal(command[4], "600");
    assert.doesNotMatch(options.body, /192\.0\.2\.1|mario|Richiesta/);
    return Response.json({ result: [++counter, 600] });
  };
  for (let i = 1; i <= 6; i++)
    assert.equal((await rateLimit(request(), env, fetcher)).allowed, i <= 5);
});
test("Redis errors and untrusted IP headers are rejected", async () => {
  await assert.rejects(
    rateLimit(request(), env, async () => Response.json({ error: "ERR" })),
  );
  const req = new Request("https://company.test", {
    headers: { "x-forwarded-for": "192.0.2.1" },
  });
  await assert.rejects(rateLimit(req, env));
});
test("email uses configured recipient, plaintext, Reply-To and stable idempotency", async () => {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, ...options });
    return Response.json({ id: "accepted-id" });
  };
  await sendContact(payload, payload.requestId, env, fetcher);
  await sendContact(payload, payload.requestId, env, fetcher);
  const mail = JSON.parse(calls[0].body);
  assert.deepEqual(mail.to, [env.CONTACT_EMAIL]);
  assert.equal(mail.reply_to, payload.email);
  assert.equal(mail.html, undefined);
  assert.equal(
    calls[0].headers["Idempotency-Key"],
    calls[1].headers["Idempotency-Key"],
  );
  await assert.rejects(
    sendContact(payload, payload.requestId, env, async () =>
      Response.json({ error: "bad" }, { status: 500 }),
    ),
  );
});
