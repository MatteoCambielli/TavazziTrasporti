import { createHmac } from "node:crypto";
import { isIP } from "node:net";

// Atomic across all Vercel instances. Redis retains only HMAC keys and counters.
const script = `local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return {n,redis.call('TTL',KEYS[1])}`;
export async function rateLimit(request, env, fetcher = fetch) {
  const url = new URL(env.UPSTASH_REDIS_REST_URL);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".upstash.io"))
    throw new Error("RATE_LIMIT_CONFIG");
  // On Vercel this header is overwritten by the trusted ingress, not taken from user input.
  const raw = request.headers
    .get("x-vercel-forwarded-for")
    ?.split(",")[0]
    .trim();
  if (!raw || !isIP(raw)) throw new Error("RATE_LIMIT_IP");
  const fingerprint = createHmac("sha256", env.RATE_LIMIT_SECRET)
    .update(raw)
    .digest("hex");
  const response = await fetcher(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      script,
      "1",
      `contact:v1:${fingerprint}`,
      "600",
    ]),
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error("RATE_LIMIT_UNAVAILABLE");
  const result = await response.json();
  if (
    result.error ||
    !Array.isArray(result.result) ||
    !Number.isInteger(result.result[0]) ||
    !Number.isInteger(result.result[1]) ||
    result.result[1] < 0
  )
    throw new Error("RATE_LIMIT_INVALID");
  return {
    allowed: result.result[0] <= 5,
    retryAfter: Math.max(1, result.result[1]),
  };
}
