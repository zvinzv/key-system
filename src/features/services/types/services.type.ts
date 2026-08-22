import * as z from "zod";
import { ServicesSchema } from "../schema/services.schema";

export type ServicesInsertType = z.input<typeof ServicesSchema>;
export type ServicesUpdateType = z.input<typeof ServicesSchema> & {
  id: string;
};
