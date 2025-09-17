import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;

  console.log("Auth token from cookie:", authToken, "Path:", pathname);

  const unauthenticatedPaths = ["/login", "/signup", "/verify-otp"];

  const protectedRoutes = [
    "/profile",
    "/onboarding",
    "/admin",
    "/connections",
    "/conversations",
    "/feed",
    "/notification",
    "/search",
  ];

  if (authToken) {
    if (unauthenticatedPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
