import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { services } from "./services";
import { user } from "./auth";

// ─────────────────────────────────────────────
// Enum
// ─────────────────────────────────────────────

export const templateInputTypeEnum = pgEnum("template_inputs_type_enum", [
  "text",
  "password",
  "email",
  "number",
  "url",
  "ip",
  "textarea",
  "boolean",
]);

// ─────────────────────────────────────────────
// Templates
// ─────────────────────────────────────────────

export const templates = pgTable(
  "templates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    name: text("name").notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    deletedAt: timestamp("deleted_at"),
  },

  (table) => [uniqueIndex("templates_index_1").on(table.serviceId, table.name)],
);

// ─────────────────────────────────────────────
// Template Inputs
// ─────────────────────────────────────────────

export const templateInputs = pgTable(
  "template_inputs",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    templateId: uuid("template_id")
      .notNull()
      .references(() => templates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    name: text("name").notNull(),

    type: templateInputTypeEnum("type").default("text"),

    required: boolean("required").default(false),

    sortOrder: integer("sort_order").default(0),

    isSecret: boolean("is_secret").default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    deletedAt: timestamp("deleted_at"),
  },

  (table) => [
    uniqueIndex("template_inputs_index_1").on(table.templateId, table.name),
  ],
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;

export type TemplateInput = typeof templateInputs.$inferSelect;
export type NewTemplateInput = typeof templateInputs.$inferInsert;
