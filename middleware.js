import { NextResponse } from "next/server";

export function middleware(request) {
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
  ];

  if (authToken) {
    if (publicPaths.includes(pathname)) {
      console.log("🔄 Redirecting logged-in user away from auth page");
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  } else {
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtected) {
      console.log("🔒 No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
