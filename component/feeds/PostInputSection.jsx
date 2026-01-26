"use client";

import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostInputSection = () => {
  const { user: currentUser } = useAuthStore();
  const { createPost, loading } = useFeedStore();

  const [postType, setPostType] = useState("");
  const [newPost, setNewPost] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [media, setMedia] = useState({});

  const handleFileChange = (e, type) => {
    if (!e.target.files) return;

    // Reset all other media types when a new one is selected
    const newMedia = {};
    if (type === "images") {
      newMedia.images = Array.from(e.target.files);
    } else {
      newMedia[type] = e.target.files[0];
    }
    setMedia(newMedia);
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

  // Determine media count and type for display
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
      <Card className="border-0 shadow-xl bg-white">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10 border-2">
              <AvatarImage src={currentUser?.image} className="object-cover" />
              <AvatarFallback className="bg-yellow-500 text-white font-medium text-sm">
                {currentUser?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Textarea
                placeholder="Share your creative work, find collaborators, or post opportunities..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 resize-none text-base transition-colors duration-200"
                rows={3}
                onFocus={() => setShowPostOptions(true)}
              />

              {showPostOptions && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-3">
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

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      <MediaInputLabel
                        Icon={ImageIcon}
                        label="Photo"
                        type="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <MediaInputLabel
                        Icon={Video}
                        label="Video"
                        type="video"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                      <MediaInputLabel
                        Icon={FileText}
                        label="Multiple"
                        type="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />

                      {hasMedia && (
                        <span className="text-xs text-green-600 font-medium ml-2">
                          {mediaCount} {mediaType} selected
                        </span>
                      )}
                    </div>

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
                        className="border-gray-300 hover:bg-gray-100 text-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePostSubmit}
                        disabled={!newPost.trim() || loading || postType === ""}
                        className="bg-yellow-500 hover:bg-yellow-500 text-black font-semibold shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
    className={`w-full sm:w-auto flex-1 h-auto p-4 flex flex-col items-center space-y-1 transition-all duration-200 border-2 ${
      postType === type
        ? "bg-yellow-500 hover:bg-yellow-500 text-black font-semibold border-yellow-500 shadow-lg"
        : "text-gray-700 hover:bg-gray-50 border-gray-300"
    }`}
    onClick={() => setPostType(type)}
  >
    <Icon className="w-5 h-5" />
    <div className="text-center">
      <div className="font-medium text-sm">{label}</div>
      <div className="text-xs opacity-70">{description}</div>
    </div>
  </Button>
);

const MediaInputLabel = ({ Icon, label, type, accept, multiple, onChange }) => (
  <label className="cursor-pointer hover:bg-yellow-500/20 text-yellow-600 flex items-center text-sm px-3 py-2 rounded-full transition-colors duration-200 font-medium">
    <Icon className="w-4 h-4 mr-2" />
    {label}
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      hidden
      onChange={(e) => onChange(e, type)}
    />
  </label>
);
