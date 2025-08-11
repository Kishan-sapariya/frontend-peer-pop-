"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useInfluencerStore } from "@/store/useInfluencerStore";

export function UploadCampaignForm() {
  const { addCampaign } = useInfluencerStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [engagement, setEngagement] = useState("");
  const [reach, setReach] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !type) return;

    await addCampaign({
      campaigns: [
        {
          name,
          type,
          engagement: engagement || "N/A",
          reach: reach || "N/A",
          description,
        },
      ],
    });

    setName("");
    setType("");
    setEngagement("");
    setReach("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Campaigns</h1>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Campaign
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Add New Campaign</DialogTitle>
          <DialogDescription>
            Fill in the details for your recent campaign. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Campaign
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 'Summer Collection Launch'"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select onValueChange={setType} value={type}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram Post + Stories">
                    Instagram Post + Stories
                  </SelectItem>
                  <SelectItem value="TikTok Series">TikTok Series</SelectItem>
                  <SelectItem value="YouTube Integration">
                    YouTube Integration
                  </SelectItem>
                  <SelectItem value="Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Podcast Ad">Podcast Ad</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="engagement" className="text-right">
                Engagement
              </Label>
              <Input
                id="engagement"
                type="number" // Changed to number type
                value={engagement}
                onChange={(e) => setEngagement(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 4.8"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reach" className="text-right">
                Reach
              </Label>
              <Input
                id="reach"
                type="number" // Changed to number type
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 125000"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 resize-none"
                placeholder="A brief description of the campaign..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
