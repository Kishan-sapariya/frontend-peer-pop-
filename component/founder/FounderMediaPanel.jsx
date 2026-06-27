"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Trash2, ImageIcon, Video as VideoIcon } from "lucide-react";
import { useFounderStore } from "@/store/useFounderStore";

/**
 * Renders a founder media tab (gallery images or showcase videos).
 * type: "IMAGE" | "VIDEO". Shows an upload control for the owner and a
 * responsive grid with per-item delete.
 */
export default function FounderMediaPanel({ type, media = [], isOwnProfile }) {
  const { uploadFounderMedia, deleteFounderMedia, uploading } = useFounderStore();
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const isVideo = type === "VIDEO";
  const items = media.filter((m) => m.type === type);

  const handleUpload = async () => {
    if (!file) return;
    const res = await uploadFounderMedia(file, type, caption);
    if (res?.success) {
      setFile(null);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {isVideo ? <VideoIcon className="w-5 h-5 text-amber-500" /> : <ImageIcon className="w-5 h-5 text-amber-500" />}
          {isVideo ? "Video Showcase" : "Gallery"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {isOwnProfile && (
          <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <input
              ref={fileRef}
              type="file"
              accept={isVideo ? "video/*" : "image/*"}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileRef.current?.click()}
              className="justify-start border-amber-200"
            >
              {isVideo ? <VideoIcon className="w-4 h-4 mr-2" /> : <ImageIcon className="w-4 h-4 mr-2" />}
              {file ? file.name : `Choose ${isVideo ? "video" : "image"}`}
            </Button>
            <Input
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              Upload
            </Button>
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-sm">
            {isVideo ? "No videos yet." : "No images yet."}
          </p>
        ) : (
          <div className={`grid gap-4 ${isVideo ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
            {items.map((m) => (
              <div key={m.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                {isVideo ? (
                  <video src={m.url} controls className="w-full h-44 object-cover bg-black" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.caption || "founder media"} loading="lazy" className="w-full h-40 object-cover" />
                )}
                {m.caption && (
                  <div className="px-3 py-2 text-xs text-gray-600 truncate">{m.caption}</div>
                )}
                {isOwnProfile && (
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete media"
                    onClick={() => deleteFounderMedia(m.id)}
                    className="absolute top-2 right-2 h-8 w-8 bg-white/90 text-red-500 hover:text-red-600 hover:bg-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
