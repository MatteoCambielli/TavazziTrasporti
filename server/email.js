import { createHmac } from "node:crypto";
import { requestTypes } from "../src/validation.js";

export async function sendContact(data, requestId, env, fetcher = fetch) {
  // Plain text: user input never becomes HTML or mail headers.
  const payload = {
    from: env.EMAIL_FROM,
    to: [env.CONTACT_EMAIL],
    reply_to: data.email,
    subject: `Tavazzi Trasporti — ${requestTypes[data.tipo_richiesta]}`,
    text: `Nome: ${data.nome}\nEmail: ${data.email}\nTelefono: ${data.telefono || "Non indicato"}\nRichiesta: ${requestTypes[data.tipo_richiesta]}\n\n${data.messaggio}`,
  };
  const key = createHmac("sha256", env.RATE_LIMIT_SECRET)
    .update(JSON.stringify({ requestId, payload }))
    .digest("hex");
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `contact-${key}`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("EMAIL_UNAVAILABLE");
  const result = await response.json();
  if (typeof result.id !== "string" || !result.id)
    throw new Error("EMAIL_INVALID");
}
