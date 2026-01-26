"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useYoutubeStore } from "@/store/useYoutubeStore";

export default function YouTubeConnectToast() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const getYoutubeStats = useYoutubeStore((s) => s.getYoutubeStats);
  const fired = useRef(false);

  useEffect(() => {
    if (!user?.id) return; 
    if (fired.current) return;

    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");

    if (connected === "1") {
      fired.current = true;

      getYoutubeStats(user.id)
        .then(() => toast.success("YouTube connected & stats imported!"))
        .catch(() => toast.error("Connected but failed to import stats"));

      params.delete("connected");
      const qs = params.toString();
      router.replace(`${window.location.pathname}${qs ? `?${qs}` : ""}`, {
        scroll: false,
      });
    }
  }, [user?.id, getYoutubeStats, router]);

  return null;
}
