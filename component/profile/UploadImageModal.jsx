"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";

export default function UploadImageModal() {
  const { uploadImage } = useAuthStore();
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
    const result = await uploadImage(imageFile);
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
        <div className="w-8 h-8 absolute bottom-1 right-1 bg-black rounded-full flex justify-center items-center cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg">
          <Upload className="w-4 h-4 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Upload Profile Picture
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6">
          {previewUrl ? (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 border-4 border-gray-200 rounded-full overflow-hidden shadow-inner">
              <Image
                src={previewUrl}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-dashed border-gray-300">
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
