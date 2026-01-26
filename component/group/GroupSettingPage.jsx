"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useGroupStore } from "@/store/useGroupStore";
import {
  ChevronLeft,
  Save,
  Lock,
  LockOpen,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingSpinner from "../LoadingSpinner";

const GroupSettingsPage = () => {
  const { id: groupId } = useParams();

  const { groups, fetchGroupById, updateGroup, uploadImage } = useGroupStore();

  const group = groups[groupId];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    joinType: "",
    image: null,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    fetchGroupById(groupId);
  }, [groupId, fetchGroupById]);

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        joinType: group.joinType,
        image: group.image,
      });
    }
  }, [group]);

  useEffect(() => {
    if (uploadSuccess) {
      const t = setTimeout(() => setUploadSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [uploadSuccess]);

  if (!group)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner text="Loading settings..." />
      </div>
    );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleJoinTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, joinType: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadSuccess(false);

    const previewURL = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewURL }));

    try {
      await uploadImage(file, groupId);
      toast.success("Group image updated");
      setUploadSuccess(true);
    } catch (err) {
      toast.error("Image upload failed");
      setFormData((prev) => ({ ...prev, image: group.image }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploadingImage) {
      toast.error("Wait for image upload to finish");
      return;
    }

    setIsSaving(true);

    try {
      await updateGroup(groupId, {
        name: formData.name,
        description: formData.description,
        joinType: formData.joinType,
      });

      toast.success("Group settings updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/groups/${groupId}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold">Group Settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Group Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <Label>Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </CardContent>
          </Card>

          {/* IMAGE */}
          <Card>
            <CardHeader>
              <CardTitle>Group Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                {/* IMAGE PREVIEW */}
                <div className="w-24 h-24 relative rounded-full overflow-hidden border">
                  <img
                    src={formData.image}
                    className="object-cover w-full h-full"
                  />
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <Label>Upload New Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingImage}
                    onChange={handleImageUpload}
                  />

                  {uploadSuccess && (
                    <Check className="h-5 w-5 text-green-600 animate-pulse" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JOIN TYPE */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Joining</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.joinType}
                onValueChange={handleJoinTypeChange}
              >
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem id="public" value="ANYONE_CAN_JOIN" />
                  <Label htmlFor="public">
                    <LockOpen className="inline h-4 w-4 mr-1" />
                    Public
                  </Label>
                </div>

                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem id="private" value="INVITE_ONLY" />
                  <Label htmlFor="private">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Private
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isSaving || isUploadingImage}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GroupSettingsPage;
