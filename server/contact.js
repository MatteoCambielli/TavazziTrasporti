import { validateContact } from "../src/validation.js";
import { rateLimit } from "./rate-limit.js";
import { sendContact } from "./email.js";
const MAX_BYTES = 24000;
const reply = (status, body, headers = {}) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });

async function readBody(request) {
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new RangeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createContactHandler({
  env = process.env,
  limiter = rateLimit,
  sender = sendContact,
  now = Date.now,
} = {}) {
  return async function contact(request) {
    if (request.method !== "POST")
      return reply(405, { error: "Metodo non consentito." }, { Allow: "POST" });
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return reply(415, { error: "Formato non supportato." });
    let site;
    try {
      site = new URL(env.SITE_URL);
      if (
        site.protocol !== "https:" ||
        site.origin !== env.SITE_URL.replace(/\/$/, "")
      )
        throw new Error();
    } catch {
      return reply(503, {
        error:
          "Il modulo non è al momento disponibile. Contattaci via email o telefono.",
      });
    }
    if (
      request.headers.get("origin") !== site.origin ||
      ["cross-site", "same-site"].includes(
        request.headers.get("sec-fetch-site"),
      )
    )
      return reply(403, {
        error: "Richiesta non autorizzata. Ricarica la pagina.",
      });
    if (
      ![
        "CONTACT_EMAIL",
        "EMAIL_FROM",
        "RESEND_API_KEY",
        "UPSTASH_REDIS_REST_URL",
        "UPSTASH_REDIS_REST_TOKEN",
        "RATE_LIMIT_SECRET",
      ].every((key) => env[key]) ||
      env.RATE_LIMIT_SECRET.length < 32
    )
      return reply(503, {
        error:
          "Il modulo non è al momento disponibile. Contattaci via email o telefono.",
      });
    try {
      const limit = await limiter(request, env);
      if (!limit.allowed)
        return reply(
          429,
          {
            error:
              "Troppe richieste. Attendi qualche minuto prima di riprovare.",
          },
          { "Retry-After": String(limit.retryAfter) },
        );
    } catch {
      console.warn("contact:rate_limit_unavailable");
      return reply(503, {
        error: "Servizio temporaneamente non disponibile. Riprova più tardi.",
      });
    }
    let input;
    try {
      input = await readBody(request);
    } catch (error) {
      return reply(error instanceof RangeError ? 413 : 400, {
        error:
          error instanceof RangeError
            ? "Messaggio troppo grande."
            : "Controlla i dati inseriti.",
      });
    }
    if (!input || typeof input !== "object" || Array.isArray(input))
      return reply(400, { error: "Richiesta non valida." });
    if (typeof input.website !== "string" || input.website !== "")
      return reply(400, { error: "Richiesta non valida." });
    const elapsed = now() - input.startedAt;
    if (
      !Number.isSafeInteger(input.startedAt) ||
      elapsed < 2000 ||
      elapsed > 86400000
    )
      return reply(400, {
        error: "Ricarica il modulo e dedica qualche secondo alla compilazione.",
      });
    if (
      typeof input.requestId !== "string" ||
      !/^[a-f0-9-]{36}$/i.test(input.requestId)
    )
      return reply(400, { error: "Ricarica il modulo e riprova." });
    const { data, errors } = validateContact(input);
    if (Object.keys(errors).length)
      return reply(400, { error: "Controlla i campi indicati.", errors });
    try {
      await sender(data, input.requestId, env);
      return reply(200, { success: true });
    } catch {
      console.warn("contact:email_unavailable");
      return reply(502, {
        error:
          "Non è stato possibile confermare l’invio. Riprova più tardi o contattaci direttamente.",
      });
    }
  };
}
