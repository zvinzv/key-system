import { Button } from "@/components/ui/button";
import SignOutButton from "@/features/auth/components/sign-out-button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <SignOutButton />
    </div>
  );
}
