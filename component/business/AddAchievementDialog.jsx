"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";

export default function AddAchievementDialog({ isOwnProfile }) {
  const { updateAchievements, businessProfileDetails } = useBusinessStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const currentAchievements =
      businessProfileDetails?.businessProfile?.achievements || [];

    const payload = [
      ...currentAchievements,
      { title: form.title, description: form.description, date: form.date },
    ];

    await updateAchievements(payload);

    setForm({ title: "", description: "", date: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isOwnProfile && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Achievement
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Achievement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Achievement Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            type="date"
            placeholder="Date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} disabled={!form.title}>
            Add Achievement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
