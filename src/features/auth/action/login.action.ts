"use server";
import db from "@/db";
import { auth } from "@/lib/auth";
import * as schema from "@/db/schema"; // your drizzle schema
import { eq } from "drizzle-orm";
import { LoginFormType } from "../types/login.type";
import { login } from "../services/login.services";
import { redirect } from "next/navigation";

export const loginAction = async (data: LoginFormType) => {
  await login(data);
  // redirect("/");
};
