import { defineRelations } from "drizzle-orm";

import { authRelations } from "./schema/auth";
export const relations = defineRelations(authRelations);
