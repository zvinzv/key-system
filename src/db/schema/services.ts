import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { defineRelations, defineRelationsPart } from "drizzle-orm";
import { user } from "./auth";
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  icon: text("icon"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
