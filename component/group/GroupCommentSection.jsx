"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, Trash2 } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useGroupStore } from "@/store/useGroupStore";
import { formatTimeAgo } from "@/utils/formatDate";

const GroupCommentSection = ({ comments, groupId, postId }) => {
  const { user: currentUser } = useAuthStore();
  const { commentOnGroupPost, deleteGroupPostComment } = useGroupStore();

  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!commentInput.trim()) return;
    setLoading(true);

    try {
      await commentOnGroupPost(groupId, postId, commentInput);
      setCommentInput("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Optional: Show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteGroupPostComment(groupId, postId, commentId);
  };

  const commentCount = comments?.length || 0;

  return (
    <div className="mt-4 border-t border-gray-200 pt-4 px-1">
      <h4 className="font-semibold text-sm mb-4 text-gray-800">
        Comments ({commentCount})
      </h4>

      {/* List comments */}
      {commentCount > 0 ? (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex items-start space-x-3 group relative"
            >
              <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-green-200">
                <AvatarImage
                  src={c.user?.image}
                  alt={c.user?.username}
                  className="object-cover"
                />
                <AvatarFallback className="bg-green-600 text-white text-xs">
                  {c.user?.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 bg-gray-100 p-3 rounded-xl">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-gray-800">
                    {c.user?.username || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(c.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{c.content}</p>
              </div>

              {currentUser?.id === c.user?.id && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-3 h-6 w-6  transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4 text-black" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Comment
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          No comments yet. Be the first to start the conversation!
        </p>
      )}

      <div className="mt-6 flex">
        <input
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all pl-4"
          onKeyDown={(e) => {
            if (e.key === "Enter" && commentInput.trim() && !loading) {
              handleSubmit();
            }
          }}
          disabled={loading}
        />
        <Button
          className="rounded-r-full px-6 bg-green-600 hover:bg-green-700 transition-colors"
          onClick={handleSubmit}
          disabled={!commentInput.trim() || loading}
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default GroupCommentSection;
