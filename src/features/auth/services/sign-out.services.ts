import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
