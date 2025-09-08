import { Card } from "@/components/ui/card";
import React from "react";
import AddCollaborationModal from "./AddCollaborationModal";
import { useYoutubeStore } from "@/store/useYoutubeStore";
import { capitalizeInitials } from "@/utils/formatDate";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function RecentCollaborations({ isOwnProfile }) {
  const { profile, deleteCollaboration } = useYoutubeStore();
  const collaborations = profile?.data.collaborations || [];

  return (
    <section className="bg-gray-50 p-6 rounded-md">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Recent Collaborations</h2>
          <p className="text-muted-foreground">
            Successful partnerships with other creators
          </p>
        </div>
        {isOwnProfile && <AddCollaborationModal isOwnProfile={isOwnProfile} />}
      </div>

      <div className="space-y-4">
        {collaborations.length === 0 ? (
          <div className="text-center text-gray-500 p-10 border border-dashed border-gray-300 rounded-md">
            <p className="text-lg font-medium mb-2">No collaborations yet</p>
            <p className="text-sm">
              Add your first collaboration to showcase your creative
              partnerships.
            </p>
          </div>
        ) : (
          collaborations.map((collab, idx) => (
            <Card
              key={collab.id}
              className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm relative"
            >
              <div className="space-y-1">
                <p className="font-semibold text-xl">
                  {capitalizeInitials(collab.title)}
                </p>
                <p className="text-muted-foreground">
                  with {capitalizeInitials(collab.with)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {collab.monthsAgo} months ago
                </p>
              </div>

              {isOwnProfile && (
                <div className="absolute top-4 right-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-30 px-1 py-1">
                      <Button
                        className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                        onClick={() => deleteCollaboration(collab.id)}
                      >
                        <Trash2 />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
