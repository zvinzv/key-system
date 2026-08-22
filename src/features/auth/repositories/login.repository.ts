import db from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
export const findEmailByUsername = async (username: string) => {
  try {
    const [user] = await db
      .select({
        email: schema.user.email,
      })
      .from(schema.user)
      .where(eq(schema.user.username, username))
      .limit(1);
    return user?.email;
  } catch (error) {
    throw new Error("Somthing wrong in database");
  }
};
