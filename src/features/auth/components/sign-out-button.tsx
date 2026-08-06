"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { signOutAction } from "../action/sign-out.action";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    await signOutAction();
  };

  return (
    <Button onClick={handleSignIn} disabled={isLoading} variant={"destructive"}>
      Sign Out
    </Button>
  );
}
