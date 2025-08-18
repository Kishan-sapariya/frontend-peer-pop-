"use client";

import React from "react";
import { Award, MoreVertical, Trash2 } from "lucide-react";
import { useComedianStore } from "@/store/useComedianStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import AchievementModal from "./AchievementModal";

export default function AchievementTab({ isOwnProfile }) {
  const { profile, deleteAchievement } = useComedianStore();
  const achievements = profile?.data?.achievements || [];

  return (
    <div className="p-4 pt-2 sm:p-6 max-w-full md:max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-inner">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Recent achievements
        </h2>
        {isOwnProfile && <AchievementModal />}
      </div>

      {/* Achievement List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-sm p-4 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg flex-shrink-0 mt-1">
                <Award className="w-6 h-6" />
              </div>

              {/* Achievement Info */}
              <div className="flex-grow pr-16">
                <h3 className="font-semibold text-base text-gray-900 mb-1 leading-snug">
                  {achievement.achievement}
                </h3>
                <p className="text-sm text-gray-600 leading-tight">
                  {achievement.status}
                </p>
                <p className="text-xs text-gray-500 mt-2">{achievement.year}</p>
              </div>

              {/* Actions Popover */}
              {isOwnProfile && (
                <div className="absolute top-2 right-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-1">
                      <Button
                        className="w-full justify-start text-sm bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors py-1.5"
                        onClick={() => deleteAchievement(achievement.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="sm:col-span-2 text-center text-gray-500 p-8 sm:p-10 border border-dashed border-gray-300 rounded-md">
            <p className="text-base sm:text-lg font-medium mb-2">
              No Recent achievements yet
            </p>
            <p className="text-sm">Add your first professional milestone</p>
          </div>
        )}
      </div>
    </div>
  );
}
