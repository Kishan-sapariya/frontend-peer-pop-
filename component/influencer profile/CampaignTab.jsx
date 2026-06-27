"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  Trash2,
  HeartPulse,
  Eye,
  Heart,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useInfluencerStore } from "@/store/useInfluencerStore";

export default function CampaignTab({ isOwnProfile }) {
  const { profile, deleteCampaign } = useInfluencerStore();
  const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) {
      return "0";
    }
    if (num >= 1000000) {
      return num / 1000000 + "M";
    }
    if (num >= 1000) {
      return num / 1000 + "K";
    }
    return num.toString();
  };

  const campaigns = profile?.data?.campaigns || [];
  console.log(campaigns)

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="p-1 space-y-4">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="shadow-sm hover:shadow-md transition-shadow rounded-lg py-3"
              >
                <CardContent className="px-4 py-1 flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {campaign.name}
                    </h2>
                    <p className="text-sm text-gray-600">{campaign.type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      <span className="flex items-center text-sm">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {campaign.engagement} engagement
                      </span>
                      <span className="flex items-center text-sm">
                        <Eye className="h-4 w-4 mr-1 text-blue-500" />
                        {formatNumber(campaign.reach)} reach
                      </span>
                    </div>
                  </div>
                  {isOwnProfile && (
                    <div className="flex items-center space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Campaign options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-35 p-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => deleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="sm:col-span-2 w-full text-center text-gray-500 p-10 border border-dashed border-gray-300 rounded-md">
              <p className="text-lg font-medium mb-2">No Campaigns yet</p>
              <p className="text-sm">
                Add your Campaigns to showcase your creative work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
