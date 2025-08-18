import React from "react";
import AddAchievementModal from "./AddAchievementModal";
import { useYoutubeStore } from "@/store/useYoutubeStore";
import { Card, CardContent } from "@/components/ui/card";
import { Award, MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const AchievementTab = ({ isOwnProfile }) => {
  const { profile, deleteAchievement } = useYoutubeStore();
  const achievements = profile?.data.achievements || [];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Achievements & Milestones</h2>
          <p className="text-gray-600">Recognition and platform milestones</p>
        </div>
        {isOwnProfile && <AddAchievementModal />}
      </div>

      {achievements.length === 0 ? (
        <div className="text-center text-gray-500 p-10 border border-dashed border-gray-300 rounded-md">
          <p className="text-lg font-medium mb-2">No achievements yet</p>
          <p className="text-sm">
            Add your first achievement to showcase your progress and
            recognition.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="relative">
              <CardContent className="px-4 py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    {achievement.milestone && (
                      <p className="text-sm text-gray-600">
                        {achievement.milestone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{achievement.year}</p>
                  </div>
                </div>
                {isOwnProfile && (
                  <div className="absolute top-4 right-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-30 px-3 py-2">
                        <Button
                          className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => deleteAchievement(achievement.id)}
                        >
                          <Trash2 />
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementTab;
