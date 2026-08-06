import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";

import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import db from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your drizzle schema
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [username(), nextCookies()],
});
