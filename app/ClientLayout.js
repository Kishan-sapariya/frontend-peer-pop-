"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Navbar from "@/component/Navbar";

export default function ClientLayout({ children }) {
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
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}