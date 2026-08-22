import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/index";

export const relations = defineRelations(schema, (r) => ({
  // ─────────────────────────────────────────────
  // Services
  // ─────────────────────────────────────────────

  services: {
    templates: r.many.templates({
      from: r.services.id,
      to: r.templates.serviceId,
    }),
    user: r.one.user({
      from: r.services.userId,
      to: r.user.id,
      optional: false,
    }),
  },

  // ─────────────────────────────────────────────
  // Templates
  // ─────────────────────────────────────────────

  templates: {
    service: r.one.services({
      from: r.templates.serviceId,
      to: r.services.id,
      optional: false,
    }),

    inputs: r.many.templateInputs({
      from: r.templates.id,
      to: r.templateInputs.templateId,
    }),

    credentials: r.many.credentials({
      from: r.templates.id,
      to: r.credentials.templateId,
    }),
  },

  // ─────────────────────────────────────────────
  // Template Inputs
  // ─────────────────────────────────────────────

  templateInputs: {
    template: r.one.templates({
      from: r.templateInputs.templateId,
      to: r.templates.id,
      optional: false,
    }),

    credentialInputs: r.many.credentialInputs({
      from: r.templateInputs.id,
      to: r.credentialInputs.templateInputId,
    }),
  },

  // ─────────────────────────────────────────────
  // Credentials
  // ─────────────────────────────────────────────

  credentials: {
    user: r.one.user({
      from: r.credentials.userId,
      to: r.user.id,
      optional: false,
    }),

    template: r.one.templates({
      from: r.credentials.templateId,
      to: r.templates.id,
      optional: false,
    }),

    inputs: r.many.credentialInputs({
      from: r.credentials.id,
      to: r.credentialInputs.credentialId,
    }),
  },

  // ─────────────────────────────────────────────
  // Credential Inputs
  // ─────────────────────────────────────────────

  credentialInputs: {
    credential: r.one.credentials({
      from: r.credentialInputs.credentialId,
      to: r.credentials.id,
      optional: false,
    }),

    templateInput: r.one.templateInputs({
      from: r.credentialInputs.templateInputId,
      to: r.templateInputs.id,
      optional: false,
    }),
  },

  // ─────────────────────────────────────────────
  // Better Auth
  // ─────────────────────────────────────────────

  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
}));
