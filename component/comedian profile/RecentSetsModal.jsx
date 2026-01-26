"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils"; // Assuming you have this utility for conditional class names
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useComedianStore } from "@/store/useComedianStore";

export default function RecentSetsModal() {
  const { addRecentSets } = useComedianStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: undefined,
    duration: "",
    audience: "",
    audienceRating: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleSubmit = () => {
    setOpen(false);

    const newSet = {
      title: formData.title,
      venue: formData.venue,
      date: formData.date,
      duration: Number(formData.duration),
      audience: Number(formData.audience),
      audienceRating: Number(formData.audienceRating),
    };

    addRecentSets([newSet]);

    setFormData({
      title: "",
      venue: "",
      date: undefined,
      duration: "",
      audience: "",
      audienceRating: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-3 py-1.5 text-sm rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
          <Plus className="mr-1 h-3 w-3" /> Add Past Show
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-xl">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Add Past Show
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right col-span-1">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., Family Dinner Disasters"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="venue" className="text-right col-span-1">
              Venue
            </Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., The Stand NYC"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right col-span-1">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal rounded-md",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "MMM dd, yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-md">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right col-span-1">
              Duration
            </Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., 20 min"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audience" className="text-right col-span-1">
              Audience
            </Label>
            <Input
              id="audience"
              value={formData.audience}
              onChange={handleInputChange}
              type="number"
              className="col-span-3 rounded-md"
              placeholder="e.g., 220"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audienceRating" className="text-right col-span-1">
              Rating
            </Label>
            <Input
              id="audienceRating"
              value={formData.audienceRating}
              onChange={handleInputChange}
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="col-span-3 rounded-md"
              placeholder="e.g., 4.9"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-md font-semibold text-lg py-2"
          >
            Add Show
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
