import db from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
export const findEmailByUsername = async (username: string) => {
  const [user] = await db
    .select({
      email: schema.user.email,
    })
    .from(schema.user)
    .where(eq(schema.user.username, username))
    .limit(1);

  if (!user) {
    throw new Error("Invalid credentials");
  }
  return user.email;
};
