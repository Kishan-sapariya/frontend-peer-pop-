"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGroupStore } from "@/store/useGroupStore";
import { ImageIcon, Images, Video, X, Send, PenLine } from "lucide-react";
import toast from "react-hot-toast";

const GroupPostInput = ({ groupId }) => {
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const { createGroupPost } = useGroupStore();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImages([]);
    setVideo(null);
  };

  const handleMultiImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImages(files);
    setImage(null);
    setVideo(null);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideo(file);
    setImage(null);
    setImages([]);
  };

  const clearMedia = () => {
    setImage(null);
    setImages([]);
    setVideo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() && !image && !images.length && !video) {
      toast.error("Post cannot be empty.");
      return;
    }

    setIsPosting(true);

    try {
      await createGroupPost(
        groupId,
        {
          description,
          category: "GROUP_POST",
          hashtags: [],
        },
        { image, images, video }
      );

      toast.success("Posted to group!");

      setDescription("");
      clearMedia();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to post");
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-100">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <PenLine className="h-4 w-4 text-green-600" />
          </div>
          <h3 className="text-base font-semibold text-zinc-800">
            Share something with the group
          </h3>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5">
          <Textarea
            placeholder="What's on your mind? Share updates, ideas, or start a discussion..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isPosting}
            className="resize-none border-zinc-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl text-sm"
          />

          {/* Media Preview */}
          {(image || images.length > 0 || video) && (
            <div className="relative mt-4 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <div className="flex gap-3 flex-wrap">
                {image && (
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-full h-full object-cover"
                      alt="Upload preview"
                    />
                  </div>
                )}

                {images.length > 0 &&
                  images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                        alt={`Upload preview ${i + 1}`}
                      />
                    </div>
                  ))}

                {video && (
                  <video
                    controls
                    className="w-48 rounded-lg"
                    src={URL.createObjectURL(video)}
                  />
                )}
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-7 w-7 p-0 rounded-full shadow-md"
                onClick={clearMedia}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-zinc-50 border-t border-zinc-100">
          <div className="flex gap-1">
            <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white text-zinc-600 hover:text-green-600 font-medium text-sm transition-colors border border-transparent hover:border-zinc-200">
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <span className="hidden sm:inline">Photo</span>
            </label>

            <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white text-zinc-600 hover:text-green-600 font-medium text-sm transition-colors border border-transparent hover:border-zinc-200">
              <Images size={18} />
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleMultiImageUpload}
              />
              <span className="hidden sm:inline">Gallery</span>
            </label>

            <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white text-zinc-600 hover:text-green-600 font-medium text-sm transition-colors border border-transparent hover:border-zinc-200">
              <Video size={18} />
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoUpload}
              />
              <span className="hidden sm:inline">Video</span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isPosting}
            className="bg-green-600 hover:bg-green-700 font-semibold px-5 rounded-xl"
          >
            {isPosting ? (
              "Posting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GroupPostInput;
