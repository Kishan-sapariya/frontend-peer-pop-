import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const unauthenticatedPaths = ["/login", "/signup", "/verify-otp"];

  if (authToken) {
    if (unauthenticatedPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If the user is NOT authenticated (no token cookie)
    // Redirect to /login if accessing protected routes
    if (pathname.startsWith("/profile") || pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
