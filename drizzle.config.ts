import { config } from "dotenv";

config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.local" });
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
