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

export default function UpdateBasicInfo() {
  const { businessProfileDetails, updateBasicInfo, loading } =
    useBusinessStore();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    about: "",
    website: "",
    supportEmail: "",
    phone: "",
  });

  useEffect(() => {
    if (businessProfileDetails && open) {
      setFormData({
        about: businessProfileDetails.businessProfile?.about || "",
        website: businessProfileDetails.businessProfile?.website || "",
        supportEmail:
          businessProfileDetails.businessProfile?.supportEmail || "",
        phone: businessProfileDetails.businessProfile?.phone || "",
      });
    }
  }, [businessProfileDetails, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBasicInfo(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer justify-start bg-gray-100 hover:bg-gray-200 text-black"
        >
          ✏️ Update Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Business Info</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Input
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about your business"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              name="supportEmail"
              type="email"
              value={formData.supportEmail}
              onChange={handleChange}
              placeholder="support@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
            />
          </div>

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
