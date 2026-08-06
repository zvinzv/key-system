"use server";
import { redirect } from "next/navigation";
import { signOut } from "../services/sign-out.services";

export const signOutAction = async () => {
  await signOut();
  redirect("/");
};
