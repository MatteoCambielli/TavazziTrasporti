import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
const script = resolve("scripts/prerender.js");
async function fixture(env, inspect) {
  const dir = await mkdtemp(join(tmpdir(), "tavazzi-seo-"));
  try {
    await mkdir(join(dir, "dist"));
    await writeFile(
      join(dir, "dist/index.html"),
      '<html><head><title>test</title><!--metadata--></head><body><div id="root"></div></body></html>',
    );
    const result = spawnSync(process.execPath, [script], {
      cwd: dir,
      env: { ...process.env, SITE_URL: "", VERCEL_ENV: "", ...env },
      encoding: "utf8",
    });
    await inspect(result, dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
test("official-domain build generates coherent canonical, schema and sitemap", async () =>
  fixture(
    { SITE_URL: "https://example.org", VERCEL_ENV: "production" },
    async (result, dir) => {
      assert.equal(result.status, 0, result.stderr);
      const html = await readFile(join(dir, "dist/dove-siamo.html"), "utf8");
      assert.match(
        html,
        /rel="canonical" href="https:\/\/example.org\/dove-siamo"/,
      );
      assert.match(html, /content="index, follow"/);
      assert.equal(
        JSON.parse(
          html.match(
            /<script type="application\/ld\+json">(.*?)<\/script>/s,
          )[1],
        ).vatID,
        "IT01574970156",
      );
      assert.match(
        await readFile(join(dir, "dist/sitemap.xml"), "utf8"),
        /https:\/\/example.org\/privacy/,
      );
      assert.doesNotMatch(
        await readFile(join(dir, "dist/sitemap.xml"), "utf8"),
        /404/,
      );
      assert.match(
        await readFile(join(dir, "dist/robots.txt"), "utf8"),
        /Sitemap: https:\/\/example.org\/sitemap.xml/,
      );
    },
  ));
test("production cannot accidentally publish without a domain", async () =>
  fixture({ VERCEL_ENV: "production" }, async (result) => {
    assert.notEqual(result.status, 0);
  }));
test("preview build is noindex even with the real-domain configuration", async () =>
  fixture(
    { SITE_URL: "https://example.org", VERCEL_ENV: "preview" },
    async (result, dir) => {
      assert.equal(result.status, 0);
      assert.match(
        await readFile(join(dir, "dist/index.html"), "utf8"),
        /noindex, nofollow/,
      );
      assert.equal(
        await readFile(join(dir, "dist/robots.txt"), "utf8"),
        "User-agent: *\nDisallow: /\n",
      );
    },
  ));
test("unconfigured local build has no invented canonical", async () =>
  fixture({}, async (result, dir) => {
    assert.equal(result.status, 0);
    assert.doesNotMatch(
      await readFile(join(dir, "dist/index.html"), "utf8"),
      /rel="canonical"/,
    );
  }));
