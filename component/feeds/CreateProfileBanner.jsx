"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

// Nudge shown to a signed-in user who hasn't completed onboarding (no creator,
// business, or founder profile yet) — prompting them to create their profile.
export default function CreateProfileBanner() {
  const { user } = useAuthStore();

  if (!user) return null;

  const hasProfile = !!(
    user.creatorType ||
    user.isFounder ||
    user.role === "BUSINESS"
  );
  if (hasProfile) return null;

  return (
    <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-gray-900">
              Finish setting up your profile
            </p>
            <p className="text-sm text-gray-600">
              You haven&apos;t created your profile yet — set it up so others can
              discover and connect with you.
            </p>
          </div>
        </div>
        <Link href="/onboarding" className="shrink-0">
          <Button className="w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
            Create profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
