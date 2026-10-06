import { readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { App } from "../src/components/App.js";
import { pages, company, escapeHtml } from "../src/site.js";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
let origin = "";
if (env.SITE_URL) {
  const site = new URL(env.SITE_URL);
  if (
    site.protocol !== "https:" ||
    site.username ||
    site.password ||
    site.port ||
    site.search ||
    site.hash ||
    site.pathname !== "/" ||
    /(^localhost$|\.invalid$|\.example$|\.test$|\.vercel\.app$|^127\.)/.test(
      site.hostname,
    )
  )
    throw new Error(
      "SITE_URL deve essere il dominio ufficiale HTTPS, senza percorsi, credenziali o domini temporanei.",
    );
  origin = site.origin;
}
if (env.VERCEL_ENV === "production" && !origin)
  throw new Error(
    "Configura SITE_URL con il dominio ufficiale prima del deploy di produzione.",
  );
const indexable = Boolean(origin) && env.VERCEL_ENV !== "preview";
const template = await readFile("dist/index.html", "utf8");
for (const [path, metadata] of Object.entries(pages)) {
  const is404 = path === "/404";
  const canonical =
    origin && !is404 ? `${origin}${path === "/" ? "/" : path}` : "";
  const tags = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}">`,
    `<meta name="robots" content="${indexable && !is404 ? "index, follow" : "noindex, nofollow"}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="it_IT">`,
    `<meta property="og:site_name" content="Tavazzi Trasporti">`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}">`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}">`,
  ];
  if (canonical)
    tags.push(
      `<link rel="canonical" href="${escapeHtml(canonical)}">`,
      `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    );
  if (origin)
    tags.push(
      `<meta property="og:image" content="${escapeHtml(origin)}/images/social.jpg">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="La flotta di Tavazzi Trasporti">`,
      `<meta name="twitter:image" content="${escapeHtml(origin)}/images/social.jpg">`,
    );
  if (!is404) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      legalName: company.legalName,
      telephone: company.telephone,
      email: company.email,
      vatID: `IT${company.vat}`,
      description: pages["/"].description,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        addressLocality: company.city,
        addressRegion: company.province,
        postalCode: company.postalCode,
        addressCountry: "IT",
      },
      ...(origin ? { url: origin } : {}),
    };
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    );
  }
  if (path === "/")
    tags.push(
      '<link rel="preload" as="image" href="/images/autostrada.webp" fetchpriority="high">',
    );
  const html = template
    .replace(/<title>.*?<\/title>/s, "")
    .replace("<!--metadata-->", tags.join("\n"))
    .replace('<div id="root"></div>', `<div id="root">${App(path)}</div>`);
  await writeFile(path === "/" ? "dist/index.html" : `dist${path}.html`, html);
}
await writeFile(
  "dist/robots.txt",
  indexable
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
    indexable
      ? Object.keys(pages)
          .filter((p) => p !== "/404")
          .map(
            (path) =>
              `<url><loc>${escapeHtml(origin + (path === "/" ? "/" : path))}</loc></url>`,
          )
          .join("")
      : ""
  }</urlset>\n`,
);
console.log(
  indexable
    ? "Pagine statiche, metadata e sitemap generati con SITE_URL."
    : "Build di verifica: noindex, robots bloccato e nessun dominio inventato. Configurare SITE_URL per il go-live.",
);
