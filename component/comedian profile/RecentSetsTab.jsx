"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  MoreVertical,
  Trash2,
  Users,
  Mic2,
} from "lucide-react";
import { useComedianStore } from "@/store/useComedianStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import RecentSetsModal from "./RecentSetsModal";
import EmptyState from "@/component/profile/EmptyState";
import { capitalizeInitials, formatDate } from "@/utils/formatDate";

export default function RecentSetsTab({ isOwnProfile }) {
  const { profile, deleteRecentSets } = useComedianStore();
  const recentSets = profile?.data?.recentSets || [];

  return (
    <div className="p-4 pt-2 sm:p-6 max-w-full md:max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-inner">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Recent Sets
        </h2>
        {isOwnProfile && <RecentSetsModal />}
      </div>

      {/* Set List */}
      <div className="space-y-4">
        {recentSets.length > 0 ? (
          recentSets.map((set, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm p-4 pr-16"
            >
              {/* Fixed Three-dot Menu */}
              {isOwnProfile && (
                <div className="absolute top-4 right-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Set options">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 px-3 py-2">
                      <Button
                        className="w-full justify-start text-sm bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors py-1.5"
                        onClick={() => deleteRecentSets(set.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Title */}
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {capitalizeInitials(set.title)}
              </h3>

              {/* Venue */}
              <div className="flex items-center text-gray-700 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                <span>{set.venue}</span>
              </div>

              {/* Info */}
              <div className="flex flex-wrap text-gray-600 text-xs gap-x-6 gap-y-2 mb-3">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{formatDate(set.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{set.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{set.audience} audience</span>
                </div>
              </div>

              {/* Audience Rating */}
              <div className="flex items-center text-yellow-500 font-bold text-base">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{set.audienceRating}</span>
                <span className="ml-2 text-xs font-normal text-gray-500">
                  audience rating
                </span>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon={Mic2}
            title="No recent sets yet"
            description="Add your recent stand-up sets to showcase your performances."
          />
        )}
      </div>
    </div>
  );
}
