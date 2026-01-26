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
import { useYoutubeStore } from "@/store/useYoutubeStore";

export default function AddAchievementModal() {
  const { addAchievement } = useYoutubeStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    year: "",
    milestone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = [
      {
        title: form.title,
        milestone: form.milestone,
        year: Number(form.year),
      },
    ];
    await addAchievement(payload);
    setForm({ title: "", year: "", milestone: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Achievement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Achievement Title eg.(Silver play button)"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            placeholder="Milestone Achieved eg.(100k subs)"
            name="milestone"
            value={form.milestone}
            onChange={handleChange}
          />
          <Input
            placeholder="Year eg.(2025)"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} disabled={!form.title || !form.year}>
            Add Achievement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
