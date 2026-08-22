import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { templates } from "./templates";
import { templateInputs } from "./templates";

// ─────────────────────────────────────────────
// Credentials
// ─────────────────────────────────────────────

export const credentials = pgTable(
  "credentials",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    templateId: uuid("template_id")
      .notNull()
      .references(() => templates.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    name: text("name"),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    deletedAt: timestamp("deleted_at"),
  },

  (table) => [index("credentials_index_1").on(table.userId, table.templateId)],
);

// ─────────────────────────────────────────────
// Credential Inputs
// ─────────────────────────────────────────────

export const credentialInputs = pgTable(
  "credential_inputs",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    credentialId: uuid("credential_id")
      .notNull()
      .references(() => credentials.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    templateInputId: uuid("template_input_id")
      .notNull()
      .references(() => templateInputs.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    value: text("value"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },

  (table) => [
    uniqueIndex("credential_inputs_index_1").on(
      table.credentialId,
      table.templateInputId,
    ),
  ],
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type Credential = typeof credentials.$inferSelect;
export type NewCredential = typeof credentials.$inferInsert;

export type CredentialInput = typeof credentialInputs.$inferSelect;
export type NewCredentialInput = typeof credentialInputs.$inferInsert;
