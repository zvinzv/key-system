import { redis } from "@/lib/redis";

export async function GET() {
  await redis.set(new Date().toString(), "hello");

  const value = await redis.get("hello");

  return Response.json({
    value,
  });
}
