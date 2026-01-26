"use client";

import React, { useState } from "react";
import { Plus, PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useComedianStore } from "@/store/useComedianStore";

export default function AchievementModal() {
  const { addAchievement } = useComedianStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    achievement: "",
    status: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.achievement || !formData.status || !formData.year) {
      toast.error("Please fill in all fields.");
      return;
    }
    addAchievement([{ ...formData }]);
    setOpen(false);
    setFormData({
      achievement: "",
      status: "",
      year: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-3 py-1.5 text-xs rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
          <Plus className="mr-1 h-3 w-3" /> Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-xl">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add New Achievement
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Add a new professional milestone to your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="achievement" className="text-right col-span-1">
              Achievement
            </Label>
            <Input
              id="achievement"
              value={formData.achievement}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., Gotham Comedy Club Regular"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right col-span-1">
              Status
            </Label>
            <Input
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., Weekly performer status"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right col-span-1">
              Year
            </Label>
            <Input
              id="year"
              value={formData.year}
              onChange={handleInputChange}
              type="number"
              className="col-span-3 rounded-md"
              placeholder="e.g., 2021"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            type="submit"
            onClick={handleSave}
            className="w-full rounded-md font-semibold text-lg py-2"
          >
            Save Achievement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
