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
import { useFeedStore } from "@/store/useFeedStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatTimeAgo } from "@/utils/formatDate";

export const CommentSection = ({ comments, postId }) => {
  const { addComment, deleteComment } = useFeedStore();
  const { user: currentUser } = useAuthStore();
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    await addComment(postId, comment, currentUser);
    setComment("");
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(postId, commentId);
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4 px-2">
      <h4 className="font-semibold text-sm mb-4 text-gray-800">
        Comments ({comments?.length || 0})
      </h4>

      {comments?.length > 0 ? (
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {comments.map((c) => (
            <div
              key={c.id}
              className={`flex items-start space-x-3 group relative ${
                c._isOptimistic ? "opacity-70" : ""
              }`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-blue-200">
                <AvatarImage src={c.user?.image} alt={c.user?.username} className="object-cover" />
                <AvatarFallback className="bg-yellow-500 text-white text-xs">
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
                    {c._isOptimistic ? "Posting..." : formatTimeAgo(c.createdAt)}
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
                      aria-label="Comment options"
                      className="absolute top-1 right-3 h-6 w-6"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
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
          No comments yet. Be the first!
        </p>
      )}

      {/* Input for new comment */}
      <div className="mt-6 flex">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 p-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all pl-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddComment();
            }
          }}
        />
        <Button
          className="rounded-r-full px-6 bg-yellow-500 hover:bg-yellow-600 transition-colors"
          onClick={handleAddComment}
          disabled={!comment.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};
