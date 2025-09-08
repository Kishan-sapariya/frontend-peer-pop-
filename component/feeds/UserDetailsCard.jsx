"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useFeedStore } from "@/store/useFeedStore";
import { CheckCircle, MapPin } from "lucide-react";
import React, { useEffect } from "react";

const UserDetailsCard = () => {
  const { getUserDetails, userDetails } = useFeedStore();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  if (!userDetails) {
    return (
      <div className="h-70 flex flex-col items-center p-5 bg-white rounded-lg shadow-md max-w-sm mx-auto">
        {/* Profile Picture */}
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Name and Profession */}
        <div className="mt-4 w-3/4 h-6 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="mt-2 w-1/2 h-4 bg-gray-200 rounded-md animate-pulse"></div>

        {/* Location */}
        <div className="mt-2 w-1/3 h-4 bg-gray-200 rounded-md animate-pulse"></div>

        {/* Stats */}
        <div className="flex justify-around w-full mt-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="mt-1 w-16 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="mt-1 w-16 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 space-y-4">
      {/* User Profile Card */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative mb-3">
              <Avatar className="w-20 h-20 mx-auto border-3 border-blue-200">
                <AvatarImage
                  className="object-cover"
                  src={userDetails.image || "/placeholder.svg"}
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-600 text-white">
                  {userDetails.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Username and Verification Badge */}
            <div className="flex items-center justify-center gap-1">
              <h3 className="font-bold text-gray-800">
                {userDetails.username}
              </h3>
              <CheckCircle className="w-4 h-4 text-blue-500" />
            </div>

            {/* Creator Type */}
            <p className="text-sm text-gray-600 mb-2">
              {userDetails?.creatorType?.toLowerCase() || "Creator"}
            </p>

            {/* Location */}
            {userDetails.location && (
              <div className="flex items-center justify-center space-x-1 mb-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {userDetails.location}
                </span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-center">
            <div>
              <div className="font-bold text-blue-600">
                {userDetails.peersCount}
              </div>
              <div className="text-gray-500 text-sm">Peers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsCard;
