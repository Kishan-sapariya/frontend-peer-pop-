"use client";

import React from "react";
import { Calendar, Clock, MapPin, MoreVertical, Trash2 } from "lucide-react";
import { format } from "date-fns";
import UpcomingShowModal from "./UpcomingShowModal";
import { useComedianStore } from "@/store/useComedianStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function UpcomingShowsTab() {
  const { profile, deleteShow } = useComedianStore();
  const upcomingShow = profile?.data?.upcomingShows;

  return (
    <div className="p-4 pt-2 sm:p-6 max-w-full md:max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-inner">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Upcoming Shows
        </h2>
        <UpcomingShowModal />
      </div>

      {/* Show List */}
      <div className="space-y-4">
        {upcomingShow?.length > 0 ? (
          upcomingShow.map((show, index) => {
            const showDate =
              show.date instanceof Date ? show.date : new Date(show.date);

            return (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-sm p-4 pr-16"
              >
                {/* Fixed Three-dot Menu */}
                <div className="absolute top-4 right-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 px-3 py-2">
                      <Button
                        className="w-full justify-start text-sm bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors py-1.5"
                        onClick={() => deleteShow(show.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {show.title}
                </h3>

                {/* Info */}
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                    <span>{format(showDate, "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    <span>{show.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    <span>{show.place}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 p-8 sm:p-10 border border-dashed border-gray-300 rounded-md">
            <p className="text-base sm:text-lg font-medium mb-2">
              No Shows yet
            </p>
            <p className="text-sm">Add your first Upcoming show</p>
          </div>
        )}
      </div>
    </div>
  );
}
