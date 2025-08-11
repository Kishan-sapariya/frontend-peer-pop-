"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Navbar from "@/component/Navbar"; 

export default function ClientLayout({ children }) {
  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> 
      <Navbar />
      {children}
    </>
  );
}