import * as z from "zod";
import LoginFormSchema from "../schema/login.schema";

export type LoginFormType = z.input<typeof LoginFormSchema>;
