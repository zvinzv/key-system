import db from "@/db";
import { auth } from "@/lib/auth";
import * as schema from "@/db/schema"; // your drizzle schema
import { eq } from "drizzle-orm";
import { LoginFormType } from "../types/login.type";
import { findEmailByUsername } from "../repositories/login.repository";
import { headers } from "next/headers";

export const login = async (data: LoginFormType) => {
  let { email, password } = data;
  if (!email.includes("@")) {
    email = await findEmailByUsername(email);
  }

  await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/",
    },
    headers: await headers(),
  });
};
