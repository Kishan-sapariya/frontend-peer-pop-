import { NextResponse } from "next/server";

// Renamed from middleware.js → proxy.js for Next.js 16
// (the `middleware` file convention is deprecated in favor of `proxy`).
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;

  const publicPaths = ["/login", "/signup", "/verify-otp"];

  const protectedRoutes = [
    "/profile",
    "/onboarding",
    "/admin",
    "/feed",
    "/connections",
    "/conversations",
    "/notification",
    "/search",
    "/groups",
    "/posts",
  ];

  if (authToken) {
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  } else {
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
