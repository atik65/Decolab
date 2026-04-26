import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Check if user has a saved locale preference (cookie)
  const localeCookie = request.cookies.get("NEXT_LOCALE");

  // If no cookie exists, remove Accept-Language header
  // This forces next-intl to use defaultLocale (Arabic) instead of browser language
  if (!localeCookie) {
    const modifiedRequest = new NextRequest(request, {
      headers: new Headers(request.headers),
    });
    modifiedRequest.headers.delete("accept-language");
    return intlMiddleware(modifiedRequest);
  }

  // If cookie exists, use normal behavior (respects user's choice)
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
