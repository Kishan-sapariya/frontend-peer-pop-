"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Video, Image, Images, Upload, Loader2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UploadRecentContentDialog({ isOwnProfile }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addRecentContent } = useInfluencerStore();
  const [isUploading, setIsUploading] = useState(false);
  const [contentType, setContentType] = useState("VIDEO");
  const [video, setVideo] = useState(null);
  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState(null);
  const [open, setOpen] = useState(false);

  const videoInputRef = useRef(null);
  const singleImageInputRef = useRef(null);
  const multiImagesInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("contentType", contentType);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);

    if (contentType === "VIDEO") {
      if (!video) {
        toast.error("Please select a video file.");
        setIsUploading(false);
        return;
      }
      formData.append("video", video);
    }

    if (contentType === "SINGLE_IMAGE") {
      if (!singleImage) {
        toast.error("Please select an image file.");
        setIsUploading(false);
        return;
      }
      formData.append("image", singleImage);
    }

    if (contentType === "MULTIPLE_IMAGES") {
      if (!multiImages || multiImages.length === 0) {
        toast.error("Please select at least one image file.");
        setIsUploading(false);
        return;
      }
      Array.from(multiImages).forEach((file) => {
        formData.append("images", file);
      });
    }

    const result = await addRecentContent(formData);
    setIsUploading(false);

    if (result) {
      setOpen(false);
      router.push(
        `/profile/${user?.username}/${user?.creatorType?.toLowerCase()}`
      );
      e.target.reset();
      setVideo(null);
      setSingleImage(null);
      setMultiImages(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (singleImageInputRef.current) singleImageInputRef.current.value = "";
      if (multiImagesInputRef.current) multiImagesInputRef.current.value = "";
    }
  };

  const getFileName = (file) => (file ? file.name : "No file chosen");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Recent Content</h1>
        {isOwnProfile && (
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Recent Content
            </Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Post Recent Content
          </DialogTitle>
          <DialogDescription>
            Upload a video, a single image, or multiple images to share with
            your audience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs
            value={contentType}
            onValueChange={(v) => {
              setContentType(v);
              setVideo(null);
              setSingleImage(null);
              setMultiImages(null);
              if (videoInputRef.current) videoInputRef.current.value = "";
              if (singleImageInputRef.current)
                singleImageInputRef.current.value = "";
              if (multiImagesInputRef.current)
                multiImagesInputRef.current.value = "";
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="VIDEO">Video</TabsTrigger>
              <TabsTrigger value="SINGLE_IMAGE">Single Image</TabsTrigger>
              <TabsTrigger value="MULTIPLE_IMAGES">Multiple Images</TabsTrigger>
            </TabsList>

            <TabsContent value="VIDEO" className="space-y-4 pt-4">
              <Label htmlFor="video-upload" className="block">
                Video File
              </Label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-start items-center gap-2 h-12"
                onClick={() => videoInputRef.current?.click()}
              >
                <Video className="w-5 h-5 text-gray-500" />
                <span>{video ? video.name : "Choose Video"}</span>
              </Button>
            </TabsContent>

            <TabsContent value="SINGLE_IMAGE" className="space-y-4 pt-4">
              <Label htmlFor="single-image-upload" className="block">
                Upload Image
              </Label>
              <input
                id="single-image-upload"
                type="file"
                accept="image/*"
                ref={singleImageInputRef}
                onChange={(e) => setSingleImage(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-start items-center gap-2 h-12"
                onClick={() => singleImageInputRef.current?.click()}
              >
                <Image className="w-5 h-5 text-gray-500" />
                <span>{singleImage ? singleImage.name : "Choose Image"}</span>
              </Button>
            </TabsContent>

            <TabsContent value="MULTIPLE_IMAGES" className="space-y-4 pt-4">
              <Label htmlFor="multi-images-upload" className="block">
                Upload Images
              </Label>
              <input
                id="multi-images-upload"
                type="file"
                accept="image/*"
                multiple
                ref={multiImagesInputRef}
                onChange={(e) => setMultiImages(e.target.files)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-start items-center gap-2 h-12"
                onClick={() => multiImagesInputRef.current?.click()}
              >
                <Images className="w-5 h-5 text-gray-500" />
                <span>
                  {multiImages && multiImages.length > 0
                    ? `${multiImages.length} image(s) selected`
                    : "Choose Images"}
                </span>
              </Button>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {!isUploading ? (
              <div className="flex gap-2 items-center">
                <Upload className="mr-2 h-4 w-4" /> Upload Content
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Loader2 className="size-5 animate-spin" /> Uploading...
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
