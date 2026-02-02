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
  Camera,
  Settings,
  Globe,
  Shield,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LoadingSpinner from "../LoadingSpinner";
import { getInitialLetter } from "@/utils/formatDate";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    <div className="min-h-[90vh] flex justify-center items-center bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href={`/groups/${groupId}`}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-zinc-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-zinc-900">Group Settings</h1>
              <p className="text-sm text-zinc-500">Manage your group preferences</p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSaving || isUploadingImage}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-5"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Group Image & Name Section */}
            <div className="p-6 border-b border-zinc-100">
              <div className="flex items-center gap-5">
                {/* Image Upload */}
                <div className="relative group">
                  <Avatar className="h-20 w-20 ring-4 ring-zinc-100">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt={formData.name}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-2xl">
                        {getInitialLetter(formData.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    {isUploadingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    ) : uploadSuccess ? (
                      <Check className="h-6 w-6 text-green-400" />
                    ) : (
                      <Camera className="h-6 w-6 text-white" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploadingImage}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Group Name */}
                <div className="flex-1">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-700 mb-1.5 block"
                  >
                    Group Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-zinc-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                    placeholder="Enter group name"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6 border-b border-zinc-100">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-zinc-700 mb-1.5 block"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border-zinc-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl resize-none"
                placeholder="What is this group about?"
                rows={3}
              />
            </div>

            {/* Privacy Section */}
            <div className="p-6">
              <Label className="text-sm font-medium text-zinc-700 mb-3 block">
                Privacy & Joining
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleJoinTypeChange("ANYONE_CAN_JOIN")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.joinType === "ANYONE_CAN_JOIN"
                      ? "border-green-500 bg-green-50"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.joinType === "ANYONE_CAN_JOIN"
                          ? "bg-green-500 text-white"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      <Globe className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-semibold ${
                        formData.joinType === "ANYONE_CAN_JOIN"
                          ? "text-green-700"
                          : "text-zinc-700"
                      }`}
                    >
                      Public
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Anyone can find and join this group
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleJoinTypeChange("INVITE_ONLY")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.joinType === "INVITE_ONLY"
                      ? "border-green-500 bg-green-50"
                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.joinType === "INVITE_ONLY"
                          ? "bg-green-500 text-white"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      <Shield className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-semibold ${
                        formData.joinType === "INVITE_ONLY"
                          ? "text-green-700"
                          : "text-zinc-700"
                      }`}
                    >
                      Private
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Members need approval to join
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupSettingsPage;
