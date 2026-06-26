"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const AVATARS = [12, 32, 45];

/**
 * Branded side-panel for auth pages.
 * - Pass `image` to use a photo background (with a dark overlay).
 * - Otherwise it renders an abstract panel: tone "dark" | "amber".
 */
export default function AuthShowcase({
  tone = "dark",
  image,
  eyebrow,
  title,
  highlight,
  subtitle,
  points = [],
  className = "",
}) {
  const dark = tone === "dark";
  const light = dark || !!image; // light text on dark/image backgrounds

  return (
    <div
      className={`relative hidden flex-col justify-end overflow-hidden p-12 lg:flex lg:w-1/2 ${
        image
          ? "bg-gray-900"
          : dark
          ? "bg-gradient-to-br from-gray-900 to-black"
          : "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500"
      } ${className}`}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt="Creators collaborating"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
        </>
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -right-20 -top-24 h-80 w-80 rounded-full blur-3xl ${
              dark ? "bg-yellow-500/25" : "bg-white/30"
            }`}
          />
          <div
            className={`absolute -bottom-16 -left-16 h-72 w-72 blur-2xl ${
              dark ? "bg-amber-500/15" : "bg-black/10"
            }`}
            style={{ borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%" }}
          />
          <div
            className={`absolute right-12 top-1/3 h-40 w-40 rotate-12 rounded-3xl border ${
              dark ? "border-white/10" : "border-white/30"
            }`}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: dark
                ? "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)"
                : "radial-gradient(rgba(0,0,0,0.35) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {eyebrow && (
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              light ? "text-yellow-400" : "text-black/70"
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h2
          className={`mt-2 text-4xl font-bold leading-tight ${
            light ? "text-white" : "text-black"
          }`}
        >
          {title}{" "}
          {highlight && (
            <span className={light ? "text-yellow-400" : "text-white"}>
              {highlight}
            </span>
          )}
        </h2>
        {subtitle && (
          <p className={`mt-3 max-w-sm ${light ? "text-white/75" : "text-black/75"}`}>
            {subtitle}
          </p>
        )}

        {points.length > 0 && (
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className={`flex items-center gap-2.5 ${
                  light ? "text-white/90" : "text-black/90"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    light ? "bg-yellow-400 text-black" : "bg-black text-yellow-400"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {AVATARS.map((n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={n}
                src={`https://i.pravatar.cc/80?img=${n}`}
                alt="creator"
                className={`h-9 w-9 rounded-full border-2 object-cover ${
                  light ? "border-white/70" : "border-white"
                }`}
              />
            ))}
          </div>
          <p className={`text-sm ${light ? "text-white/80" : "text-black/80"}`}>
            Join a growing creator community
          </p>
        </div>
      </div>
    </div>
  );
}
