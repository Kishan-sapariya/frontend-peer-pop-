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

const ShareDialog = ({ username, creatorType }) => {
  const baseUrl = "http://localhost:3000";
  const shareUrl = `${baseUrl}/profile/${username}/${creatorType?.toLowerCase()}`;
  const encodedUrl = encodeURIComponent(shareUrl);

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
        <Button variant="outline" size="lg">
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[530px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share Profile
          </DialogTitle>
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
                  window.open(`https://www.instagram.com/`, "_blank")
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
                  window.open(`https://wa.me/?text=${encodedUrl}`, "_blank")
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
                    `https://twitter.com/intent/tweet?url=${encodedUrl}`,
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

export default ShareDialog;
