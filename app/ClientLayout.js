"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Navbar from "@/component/Navbar";

// On landing routes the hero sits flush under the fixed navbar and supplies
// its own top spacing, so we skip the default top padding there.
const LANDING_ROUTES = new Set(["/", "/home"]);
// Auth pages are full-screen and chrome-free (no app navbar, no top padding).
const BARE_ROUTES = new Set(["/login", "/login/business", "/signup", "/verify-otp"]);

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLanding = LANDING_ROUTES.has(pathname);
  const isBare = BARE_ROUTES.has(pathname);

  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only fetch user once on app mount, not on every navigation
    if (!hasInitialized.current && !isInitialized) {
      hasInitialized.current = true;
      getCurrentUser();
    }
  }, [getCurrentUser, isInitialized]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!isBare && <Navbar />}
      <div className={isLanding || isBare ? "" : "pt-16"}>{children}</div>
    </>
  );
}