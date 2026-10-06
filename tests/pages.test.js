import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { App } from "../src/components/App.js";
import { pages } from "../src/site.js";
for (const path of Object.keys(pages))
  test(`static page ${path} is renderable with one h1 and legal links`, () => {
    const html = App(path);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.match(html, /href="\/privacy"/);
    assert.match(html, /href="\/cookie-policy"/);
    assert.match(html, /01574970156/);
  });
test("map iframe is only inside inert template", () => {
  const html = App("/dove-siamo");
  const withoutTemplates = html.replace(/<template[\s\S]*?<\/template>/g, "");
  assert.doesNotMatch(withoutTemplates, /<iframe/);
  assert.match(html, /data-load-map/);
  assert.match(html, /data-revoke-map/);
});
test("CSP and deployment configuration", async () => {
  const config = JSON.parse(await readFile("vercel.json", "utf8"));
  const csp = config.headers[0].headers.find(
    (h) => h.key === "Content-Security-Policy",
  ).value;
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /connect-src 'self'/);
  assert.equal(config.outputDirectory, "dist");
  assert.equal(config.rewrites, undefined);
});

test("form is disabled until its JS handler is ready and never submits PII by GET", () => {
  const html = App("/");
  assert.match(html, /method="post" action="\/api\/contact"/);
  assert.match(html, /data-form-fields disabled/);
});
