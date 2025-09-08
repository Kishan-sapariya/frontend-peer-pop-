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

export default function AddServiceDialog({ isOwnProfile }) {
  const { updateServices, businessProfileDetails } = useBusinessStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const currentServices =
      businessProfileDetails?.businessProfile?.services || [];

    const payload = [
      ...currentServices,
      { title: form.title, description: form.description },
    ];

    await updateServices(payload);

    setForm({ title: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isOwnProfile && (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Service Title"
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
          <Button onClick={handleSubmit} disabled={!form.title}>
            Add Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
