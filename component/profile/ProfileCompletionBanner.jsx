"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

// Owner-only profile-completion nudge.
//
// Driven entirely by the backend `completion` object:
//   { percentage, tier, nextTier, pointsToNextTier, missing: [{ label }] }
//
// - Hidden for visitors (only the owner sees their own setup progress).
// - At the top tier / 100%, it celebrates instead of nagging.
// - Otherwise it shows the exact next tier and the highest-impact missing
//   fields, so "fill in the missing details" is actually actionable.
export default function ProfileCompletionBanner({ completion, isOwner }) {
  if (!isOwner || !completion) return null;

  const {
    percentage = 0,
    tier,
    nextTier,
    pointsToNextTier = 0,
    missing = [],
  } = completion;

  // Reached the top tier — celebrate, don't nag.
  if (!nextTier) {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>
          Your profile is{" "}
          <span className="font-semibold">{percentage}% complete</span> — you've
          reached <span className="font-semibold">{tier}</span> status. Nice
          work!
        </span>
      </div>
    );
  }

  const topMissing = missing.slice(0, 3).map((m) => m.label);

  return (
    <div className="mt-4 rounded-xl border border-yellow-100 bg-yellow-50/70 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Sparkles className="h-4 w-4 shrink-0 text-yellow-600" />
        <span>
          Your profile is{" "}
          <span className="font-semibold text-gray-900">{percentage}%</span>{" "}
          complete. More complete profiles get discovered more — you&apos;re only{" "}
          <span className="font-semibold text-gray-900">{pointsToNextTier}%</span>{" "}
          from <span className="font-semibold text-gray-900">{nextTier}</span>.
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-yellow-100">
        <div
          className="h-full rounded-full bg-yellow-500 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      {topMissing.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          Add{" "}
          <span className="font-medium text-gray-700">
            {topMissing.join(", ")}
          </span>
          {missing.length > topMissing.length ? " and more" : ""} to level up.
        </p>
      )}
    </div>
  );
}
