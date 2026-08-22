import LoginForm from "@/features/auth/components/login-form";
import SignInButton from "@/features/auth/components/sign-in-button";
import React from "react";

export default function page() {
  return (
    <div className="z-10 overflow-hidden relative bg-background flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      {/* <div className="-z-10 top-0 absolute size-40 bg-zinc-900 blur-3xl scale-[5]"></div>
      <div className="-z-10 bottom-0 absolute size-40 bg-zinc-900 blur-3xl scale-[5]"></div> */}
      <LoginForm />
    </div>
  );
}
