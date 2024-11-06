import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const session = await getSession(request, NextResponse.next());
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const localeMatch = RegExp(/^[a-zA-Z]{2}$/).exec(pathname.split("/")[1]);
  const locale = localeMatch ? localeMatch[0] : "ja";

  if (!session) {
    if (pathname !== `/${locale}/login`) {
      url.pathname = `/${locale}/login`;
      return NextResponse.redirect(url);
    }
  } else if (pathname !== `/${locale}/diary`) {
    url.pathname = `/${locale}/diary`;
    return NextResponse.redirect(url);
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/", "/(th|en|ja)/:path*", "/login", "/diary"],
};
