"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatDate";
import { useComedianStore } from "@/store/useComedianStore";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function UpcomingShowModal() {
  const [open, setOpen] = useState(false);
  const { addUpcomingShow } = useComedianStore();
  const [formData, setFormData] = useState({
    title: "",
    date: undefined,
    time: "",
    place: "",
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

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setOpen(false);
    const show = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      place: formData.place,
    };
    addUpcomingShow(show); 
    setFormData({ title: "", date: undefined, time: "", place: "" });
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? "AM" : "PM";
        const minute = j === 0 ? "00" : j;
        times.push(`${hour}:${minute} ${ampm}`);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add New Show
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-md">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-medium text-gray-900">
            Add Upcoming Show
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right col-span-1">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., Comedy Cellar"
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
            <Label htmlFor="time" className="text-right col-span-1">
              Time
            </Label>
            <Select
              value={formData.time}
              onValueChange={(value) => handleSelectChange("time", value)}
            >
              <SelectTrigger className="col-span-3 rounded-md">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="place" className="text-right col-span-1">
              Place
            </Label>
            <Input
              id="place"
              value={formData.place}
              onChange={handleInputChange}
              className="col-span-3 rounded-md"
              placeholder="e.g., New York, NY"
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
