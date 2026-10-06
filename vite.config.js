import { defineConfig, loadEnv } from "vite";
import { createContactHandler } from "./server/contact.js";
import { Readable } from "node:stream";
export default defineConfig(({ mode }) => ({
  server: { host: "127.0.0.1" },
  plugins: [
    {
      name: "local-contact-api",
      configureServer(server) {
        const handler = createContactHandler({
          env: { ...loadEnv(mode, process.cwd(), ""), ...process.env },
        });
        server.middlewares.use("/api/contact", async (req, res) => {
          try {
            const request = new Request(
              `http://${req.headers.host}/api/contact`,
              {
                method: req.method,
                headers: req.headers,
                ...(req.method !== "GET" && req.method !== "HEAD"
                  ? { body: Readable.toWeb(req), duplex: "half" }
                  : {}),
              },
            );
            const response = await handler(request);
            res.writeHead(
              response.status,
              Object.fromEntries(response.headers),
            );
            res.end(await response.text());
          } catch {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end('{"error":"Servizio non disponibile."}');
          }
        });
      },
    },
  ],
}));
