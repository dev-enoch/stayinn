import { redis } from './redis';

export async function rateLimit(identifier: string, limit: number, windowSeconds: number): Promise<{ success: boolean, remaining: number, reset: number }> {
  const current = Math.floor(Date.now() / 1000);
  const windowStart = current - (current % windowSeconds);
  const key = `ratelimit:${identifier}:${windowStart}`;

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: windowStart + windowSeconds
  };
}
