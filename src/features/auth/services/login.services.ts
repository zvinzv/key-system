import db from "@/db";
import { auth } from "@/lib/auth";
import * as schema from "@/db/schema"; // your drizzle schema
import { eq } from "drizzle-orm";
import { LoginFormType } from "../types/login.type";
import { findEmailByUsername } from "../repositories/login.repository";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { rateLimit } from "@/lib/redis";
type Error = {
  success: false;
  massage: string;
};
type Success = {
  success: true;
  data: unknown;
};
type ReturnValue = Error | Success;
export const login = async (data: LoginFormType) => {
  let { email, password } = data;
  const headersData = await headers();
  const ip = headersData.get("x-forwarded-for") ?? "127.0.0.1";
  try {
    const limit = await rateLimit.limit(ip);
    if (!limit.success) {
      return {
        success: false,
        massage: "عدد كثير من الطلبات",
      };
    }
  } catch (error) {
    throw Error("خلل في قاعدة البيانات");
  }
  if (!email.includes("@")) {
    const user = await findEmailByUsername(email);
    if (!user) {
      return {
        success: false,
        massage: "المستخدم غير موجود",
      };
    }
    email = user;
  }
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
        rememberMe: false,
      },
      returnStatus: true,
      headers: await headers(),
    });
    await rateLimit.resetUsedTokens(ip);
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.body?.code) {
        case "INVALID_EMAIL_OR_PASSWORD":
          return {
            success: false,
            massage: "خطا في اسم المستخدم او كلمة المرور",
          };
        default:
          throw error;
      }
    }

    throw error;
  }
};
