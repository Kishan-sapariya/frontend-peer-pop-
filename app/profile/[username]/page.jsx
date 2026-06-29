"use client";

import { useParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import ProfileNotSetUp from "@/component/profile/ProfileNotSetUp";

// Fallback route for a user who exists but hasn't completed onboarding
// (no creator/business/founder profile to route to).
export default function ProfileNotSetUpPage() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const isOwner =
    !!user?.username &&
    !!username &&
    user.username === decodeURIComponent(username);

  return <ProfileNotSetUp username={username} isOwner={isOwner} />;
}
