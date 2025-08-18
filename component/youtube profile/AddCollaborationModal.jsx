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

export default function AddCollaborationModal() {
  const { addCollaboration } = useYoutubeStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    with: "",
    monthsAgo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = [
      {
        title: form.title,
        with: form.with,
        monthsAgo: Number(form.monthsAgo),
      },
    ];
    await addCollaboration(payload);
    setForm({ title: "", with: "", monthsAgo: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isOwnProfile && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Collaboration
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Collaboration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            placeholder="With whom?"
            name="with"
            value={form.with}
            onChange={handleChange}
          />
          <Input
            placeholder="How many months ago?"
            name="monthsAgo"
            type="number"
            value={form.monthsAgo}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} disabled={!form.title || !form.with}>
            Add Collaboration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
