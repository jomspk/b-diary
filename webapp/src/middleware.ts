import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(request: NextRequest) {
  const session = await getSession(request, NextResponse.next());
  const url = request.nextUrl.clone();
  if (!session) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (url.pathname === "/") {
    url.pathname = "/diary";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/diary", "/"],
};
