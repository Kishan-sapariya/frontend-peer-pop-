"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Eye,
  MessageCircle,
  Image as ImageIcon,
  Video,
  FileText,
  Send,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useFeedStore } from "@/store/useFeedStore";

const PostInputSection = () => {
  const { user: currentUser } = useAuthStore();
  const { createPost, loading } = useFeedStore();

  const [postType, setPostType] = useState("");
  const [newPost, setNewPost] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [media, setMedia] = useState({});

  const handleFileChange = (e, type) => {
    if (!e.target.files) return;

    if (type === "images") {
      setMedia((prev) => ({ ...prev, images: Array.from(e.target.files) }));
    } else {
      setMedia((prev) => ({ ...prev, [type]: e.target.files[0] }));
    }
  };

  const extractHashtags = (text) => {
    return text.match(/#\w+/g) || [];
  };

  const handlePostSubmit = async () => {
    try {
      const hashtags = extractHashtags(newPost);

      await createPost(
        {
          description: newPost,
          category: postType.toUpperCase(),
          hashtags,
          ...(postType === "general" && { customLabel: "Custom Label" }),
        },
        media
      );

      setNewPost("");
      setPostType("");
      setMedia({});
      setShowPostOptions(false);
    } catch (error) {
      console.error("Post creation failed", error);
    }
  };

  // Corrected logic for media count and type
  const mediaCount = media.images
    ? media.images.length
    : media.image || media.video
    ? 1
    : 0;
  const mediaType = media.images
    ? "Images"
    : media.image
    ? "Photo"
    : media.video
    ? "Video"
    : "";

  const hasMedia = mediaCount > 0;

  return (
    <div>
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            {/* User Avatar */}
            <Avatar className="w-10 h-10 border-2 border-blue-200">
              <AvatarImage src={currentUser?.image} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-600 text-white text-sm">
                {currentUser?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Post Input */}
            <div className="flex-1">
              <Textarea
                placeholder="Share your creative work, find collaborators, or post opportunities..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-300 resize-none text-sm"
                rows={3}
                onFocus={() => setShowPostOptions(true)}
              />

              {/* Post Options */}
              {showPostOptions && (
                <div className="mt-4 space-y-4">
                  {/* Post Type Selection */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-800 mb-3">
                      What type of post is this?
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <PostTypeButton
                        type="collaboration"
                        icon={Users}
                        label="Collaboration"
                        description="Find partners"
                        postType={postType}
                        setPostType={setPostType}
                      />
                      <PostTypeButton
                        type="opportunity"
                        icon={Briefcase}
                        label="Opportunity"
                        description="Job posting"
                        postType={postType}
                        setPostType={setPostType}
                      />
                      <PostTypeButton
                        type="showcase"
                        icon={Eye}
                        label="Showcase"
                        description="Share work"
                        postType={postType}
                        setPostType={setPostType}
                      />
                      <PostTypeButton
                        type="general"
                        icon={MessageCircle}
                        label="General"
                        description="Discussion"
                        postType={postType}
                        setPostType={setPostType}
                      />
                    </div>
                  </div>

                  {/* Media Options */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer hover:bg-blue-50 text-blue-600 flex items-center text-sm px-2 py-1 rounded">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Photo
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleFileChange(e, "image")}
                        />
                      </label>
                      <label className="cursor-pointer hover:bg-blue-50 text-blue-600 flex items-center text-sm px-2 py-1 rounded">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                        <input
                          type="file"
                          accept="video/*"
                          hidden
                          onChange={(e) => handleFileChange(e, "video")}
                        />
                      </label>
                      <label className="cursor-pointer hover:bg-blue-50 text-blue-600 flex items-center text-sm px-2 py-1 rounded">
                        <FileText className="w-4 h-4 mr-2" />
                        Multiple
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) => handleFileChange(e, "images")}
                        />
                      </label>
                      {/* Media Indicator */}
                      {hasMedia && (
                        <span className="text-xs text-gray-500 font-medium ml-2">
                          {mediaCount} {mediaType} selected
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowPostOptions(false);
                          setNewPost("");
                          setPostType("");
                          setMedia({});
                        }}
                        className="border-gray-300 hover:bg-gray-50 text-gray-600"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePostSubmit}
                        disabled={!newPost.trim() || loading || postType === ""}
                        className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white"
                      >
                        {loading ? (
                          "Posting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> Post
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostInputSection;

/* PostType Button (responsive friendly) */
const PostTypeButton = ({
  type,
  icon: Icon,
  label,
  description,
  postType,
  setPostType,
}) => (
  <Button
    variant={postType === type ? "default" : "outline"}
    className={`w-full sm:w-auto flex-1 h-auto p-4 flex flex-col items-center space-y-2 ${
      postType === type
        ? "bg-gradient-to-r from-blue-500 to-sky-600 text-white"
        : "hover:bg-blue-50 border-blue-200"
    }`}
    onClick={() => setPostType(type)}
  >
    <Icon className="w-6 h-6" />
    <div className="text-center">
      <div className="font-medium text-sm">{label}</div>
      <div className="text-xs opacity-75">{description}</div>
    </div>
  </Button>
);
