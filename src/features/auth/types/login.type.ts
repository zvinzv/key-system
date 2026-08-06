import * as z from "zod";
import LoginFormSchema from "../schema/login.schema";

export type LoginFormType = z.infer<typeof LoginFormSchema>;
