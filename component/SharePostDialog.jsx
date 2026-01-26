// components/SharePostDialog.js
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Share2,
  Instagram,
  Twitter,
  Linkedin,
  Copy,
  MessageCircleMore,
} from "lucide-react";
import toast from "react-hot-toast";

const SharePostDialog = ({ postId }) => {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
  const shareUrl = `${baseUrl}/posts/${postId}`;

  const shareMessage = `Check out this awesome post. You can find it here: ${shareUrl}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMessage = encodeURIComponent(shareMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[530px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="share-link"
              className="text-sm font-medium text-gray-500"
            >
              Copy link
            </label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="share-link"
                value={shareUrl}
                readOnly
                className="flex-1 truncate"
              />
              <Button
                onClick={handleCopy}
                size="icon"
                variant="secondary"
                aria-label="Copy link"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Share directly
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2"
                style={{ borderColor: "#E1306C", color: "#E1306C" }}
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/`, // Instagram's sharing API is complex, so we just open the home page as a fallback.
                    "_blank"
                  )
                }
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                style={{ borderColor: "#25D366", color: "#25D366" }}
                onClick={() =>
                  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank")
                }
              >
                <MessageCircleMore className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                style={{ borderColor: "#1DA1F2", color: "#1DA1F2" }}
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodedMessage}`,
                    "_blank"
                  )
                }
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                style={{ borderColor: "#0077b5", color: "#0077b5" }}
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
                    "_blank"
                  )
                }
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePostDialog;
