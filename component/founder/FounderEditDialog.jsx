"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil } from "lucide-react";
import { useFounderStore } from "@/store/useFounderStore";

// Edit dialog for the founder's text + social links.
export default function FounderEditDialog({ profile }) {
  const { updateFounderProfile, saving } = useFounderStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    headline: profile?.headline || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    linkedinUrl: profile?.linkedinUrl || "",
    twitterUrl: profile?.twitterUrl || "",
    instagramUrl: profile?.instagramUrl || "",
    youtubeUrl: profile?.youtubeUrl || "",
  });

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    const res = await updateFounderProfile(form);
    if (res?.success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Pencil className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Founder Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              placeholder="Founder & CEO of Peer Pop"
              value={form.headline}
              onChange={(e) => setField("headline", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bio">Founding story / vision</Label>
            <Textarea
              id="bio"
              rows={5}
              placeholder="Share the story, mission and vision..."
              value={form.bio}
              onChange={(e) => setField("bio", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => setField("website", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                value={form.linkedinUrl}
                onChange={(e) => setField("linkedinUrl", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="twitterUrl">Twitter / X URL</Label>
              <Input
                id="twitterUrl"
                value={form.twitterUrl}
                onChange={(e) => setField("twitterUrl", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                value={form.instagramUrl}
                onChange={(e) => setField("instagramUrl", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <Input
                id="youtubeUrl"
                value={form.youtubeUrl}
                onChange={(e) => setField("youtubeUrl", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
