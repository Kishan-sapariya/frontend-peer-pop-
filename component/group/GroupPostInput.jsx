"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useGroupStore } from "@/store/useGroupStore";
import { ImageIcon, Video, X } from "lucide-react";
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
    <Card className="p-4 mb-6 shadow-xl border-green-400">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h3 className="text-lg font-semibold text-zinc-800">
          Share something with the group
        </h3>

        <Textarea
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          disabled={isPosting}
          className="resize-none focus:border-green-500"
        />

        {(image || images.length > 0 || video) && (
          <div className="relative bg-zinc-100 p-3 rounded-lg flex gap-3 flex-wrap">
            {image && (
              <div className="relative w-32 h-32">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {images.length > 0 &&
              images.map((img, i) => (
                <div key={i} className="relative w-32 h-32">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover rounded-lg"
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

            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-3">
            <label className="cursor-pointer flex items-center gap-1 text-green-600 font-medium">
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              Image
            </label>

            <label className="cursor-pointer flex items-center gap-1 text-green-600 font-medium">
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleMultiImageUpload}
              />
              Images
            </label>

            <label className="cursor-pointer flex items-center gap-1 text-green-600 font-medium">
              <Video size={18} />
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoUpload}
              />
              Video
            </label>
          </div>

          <Button
            type="submit"
            disabled={isPosting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default GroupPostInput;
