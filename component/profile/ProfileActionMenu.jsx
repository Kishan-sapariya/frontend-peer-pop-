"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Loader2,
  Image as ImageIcon,
  MoreVertical,
  Trash2,
  Lock,
  Globe,
} from "lucide-react";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ReuploadDocumentsDialog from "../business/ReUploadDocuments";

export default function ProfileActionsMenu() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { deleteImage, toggleVisibility, user } = useAuthStore();

  const deleteProfileImage = () => {
    deleteImage();
    setIsPopoverOpen(false);
  };
  const accountVisibility = user?.visibility;
  const isPrivate = accountVisibility === "PRIVATE";

  const handleToggleVisibility = async () => {
    try {
      const newVisibility = await toggleVisibility();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-2 py-2 w-56 space-y-2">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            {isPrivate ? (
              <Lock className="h-4 w-4 text-gray-500" />
            ) : (
              <Globe className="h-4 w-4 text-green-500" />
            )}
            <Label htmlFor="visibility-mode" className="text-gray-700">
              {isPrivate ? "Private account" : "Public account"}
            </Label>
          </div>
          <Switch
            id="visibility-mode"
            checked={!isPrivate}
            onCheckedChange={handleToggleVisibility}
          />
        </div>
        <div className="border-t border-gray-200"></div>
        <UploadCoverImageDialog />
        {user?.role === "BUSINESS" && <ReuploadDocumentsDialog />}
        <Button
          className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
          onClick={deleteProfileImage}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete profile picture
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function UploadCoverImageDialog() {
  const { uploadCoverImage } = useAuthStore();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    setLoading(true);
    const result = await uploadCoverImage(imageFile);
    setLoading(false);

    if (result) {
      setImageFile(null);
      setPreviewUrl(null);
      setOpen(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button is the trigger for the dialog */}
        <Button className="w-full justify-start bg-gray-50 hover:bg-gray-100 text-black">
          <Upload className="mr-2 h-4 w-4" /> Add Cover image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Upload Cover Picture
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6">
          {previewUrl ? (
            <div className="relative w-full h-48 sm:w-64 sm:h-64 border-4 border-gray-200 rounded-sm overflow-hidden shadow-inner">
              <Image
                src={previewUrl}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-full h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 border-4 border-dashed border-gray-300">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Button
            onClick={triggerFileInput}
            variant="outline"
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" /> Choose a file
          </Button>
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={handleUpload}
            disabled={!imageFile || loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
