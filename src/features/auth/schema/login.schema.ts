import * as z from "zod";

const LoginSchema = z.object({
  email: z
    .string("Please enter a valid email address")
    .min(4, "Username/Email must be at least 6 characters")
    .max(256, "Password must be at most 256 characters")
    .regex(/^[^\s<>]+$/, "Invalid Format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(256, "Password must be at most 256 characters"),
});
const LoginFormSchema = LoginSchema.extend({
  rememberMe: z.boolean().default(false),
});
export default LoginFormSchema;
