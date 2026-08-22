import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const start = Date.now();

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("[proxy] getSession:", Date.now() - start, "ms");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/accounts/:path*",
    "/templates/:path*",
    "/settings/:path*",
    "/connections/:path*",
  ],
};
