"use client";
import { useState, useEffect } from "react";
import { useBusinessStore } from "@/store/useBusinessStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const socialPlatforms = [
  {
    name: "LinkedIn",
    urlKey: "linkedinUrl",
    followersKey: "linkedinFollowers",
  },
  { name: "Twitter", urlKey: "twitterUrl", followersKey: "twitterFollowers" },
  {
    name: "Instagram",
    urlKey: "instagramUrl",
    followersKey: "instagramFollowers",
  },
  {
    name: "Facebook",
    urlKey: "facebookUrl",
    followersKey: "facebookFollowers",
  },
];

export default function UpdateSocials() {
  const { businessProfileDetails, updateSocials, loading } = useBusinessStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (businessProfileDetails && open) {
      const socials = businessProfileDetails.businessProfile || {};
      const initialData = {};
      socialPlatforms.forEach((platform) => {
        initialData[platform.urlKey] = socials[platform.urlKey] || "";
        initialData[platform.followersKey] =
          socials[platform.followersKey] || "";
      });
      setFormData(initialData);
    }
  }, [businessProfileDetails, open]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "number" ? (value === "" ? "" : parseInt(value, 10)) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSocials(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer justify-start bg-gray-100 hover:bg-gray-200 text-black"
        >
          ✏️ Update Socials
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Socials</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.urlKey} className="space-y-2">
              <Label htmlFor={platform.urlKey}>{platform.name} URL</Label>
              <Input
                id={platform.urlKey}
                name={platform.urlKey}
                value={formData[platform.urlKey] || ""}
                onChange={handleChange}
                placeholder={`Enter your ${platform.name} URL`}
              />
              <Label htmlFor={platform.followersKey}>
                {platform.name} Followers
              </Label>
              <Input
                id={platform.followersKey}
                name={platform.followersKey}
                type="number"
                value={formData[platform.followersKey] || ""}
                onChange={handleChange}
                placeholder={`Enter number of ${platform.name} followers`}
              />
            </div>
          ))}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
