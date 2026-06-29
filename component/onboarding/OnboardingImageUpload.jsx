"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, Pencil, Upload } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

// Profile + cover photo capture for onboarding. Reuses the same upload actions
// as the in-app photo editor, so the image is saved to the user record
// (user.image / user.coverImage) and shows everywhere — navbar, search, profile.
export default function OnboardingImageUpload() {
  const { user, uploadImage, uploadCoverImage } = useAuthStore();
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const profileRef = useRef(null);
  const coverRef = useRef(null);

  const onProfile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingProfile(true);
    await uploadImage(file);
    setUploadingProfile(false);
    e.target.value = "";
  };

  const onCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    await uploadCoverImage(file);
    setUploadingCover(false);
    e.target.value = "";
  };

  const hasCover = Boolean(user?.coverImage);
  const hasPhoto = Boolean(user?.image);

  return (
    <div className="mb-8">
      {/* Cover */}
      <button
        type="button"
        onClick={() => coverRef.current?.click()}
        aria-label={hasCover ? "Change cover photo" : "Add cover photo"}
        className={cn(
          "group relative block h-32 w-full overflow-hidden rounded-2xl transition-all sm:h-40",
          hasCover
            ? "ring-1 ring-gray-200"
            : "border-2 border-dashed border-yellow-300/70 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-50 hover:border-yellow-400 hover:from-yellow-100 hover:to-amber-100"
        )}
        style={
          hasCover
            ? {
                backgroundImage: `url(${user.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {hasCover ? (
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {uploadingCover ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Pencil className="h-3.5 w-3.5" />
              )}
              Change cover
            </span>
          </span>
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-yellow-700/90">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:scale-105">
              {uploadingCover ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ImagePlus className="h-5 w-5" />
              )}
            </span>
            <span className="text-xs font-semibold">Add cover photo</span>
          </span>
        )}
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onCover}
        />
      </button>

      {/* Profile photo, overlapping the cover */}
      <div className="-mt-12 flex items-end gap-4 px-4 sm:px-5">
        <button
          type="button"
          onClick={() => profileRef.current?.click()}
          aria-label={hasPhoto ? "Change profile photo" : "Add profile photo"}
          className="group relative h-24 w-24 flex-shrink-0 transition-transform hover:scale-[1.03]"
        >
          {/* Clipped circle (image / empty state) */}
          <span
            className={cn(
              "relative block h-full w-full overflow-hidden rounded-full bg-white shadow-md",
              hasPhoto
                ? "border-4 border-white"
                : "border-2 border-dashed border-gray-300"
            )}
          >
            {hasPhoto ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <Pencil className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </>
            ) : (
              <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 bg-gray-50 text-gray-400">
                <Camera className="h-6 w-6" />
                <span className="text-[10px] font-medium">Add</span>
              </span>
            )}
          </span>

          {/* Upload badge — sits OUTSIDE the circle, on top of the edge */}
          <span className="absolute -bottom-1 -right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-yellow-400 shadow-md">
            {uploadingProfile ? (
              <Loader2 className="h-4 w-4 animate-spin text-black" />
            ) : (
              <Upload className="h-4 w-4 text-black" />
            )}
          </span>

          <input
            ref={profileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onProfile}
          />
        </button>

        <div className="pb-2">
          <p className="text-sm font-medium text-gray-900">
            Add your photos
          </p>
          <p className="text-xs text-gray-500">
            A profile photo &amp; cover help creators recognize you.
          </p>
        </div>
      </div>
    </div>
  );
}
