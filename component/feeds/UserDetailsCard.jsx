"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useFeedStore } from "@/store/useFeedStore";
import { CheckCircle, MapPin, Sparkles } from "lucide-react";
import React, { useEffect } from "react";

const UserDetailsCard = () => {
  const { getUserDetails, userDetails } = useFeedStore();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  if (!userDetails) {
    return (
      <div className="h-70 flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
        <div className="mt-4 w-3/4 h-6 bg-gray-200 rounded-md"></div>
        <div className="mt-2 w-1/2 h-4 bg-gray-200 rounded-md"></div>
        <div className="mt-2 w-1/3 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex justify-around w-full mt-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
            <div className="mt-1 w-16 h-4 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
            <div className="mt-1 w-16 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur-md rounded-2xl transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 mx-auto border-[3px] border-blue-400 p-[2px] transition-all duration-300">
              <AvatarImage
                className="object-cover rounded-full"
                src={userDetails.image}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-600 text-white font-bold text-3xl">
                {userDetails.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-extrabold text-lg md:text-xl text-gray-900">
              {userDetails.username}
            </h3>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>

          <p className="text-sm text-gray-600 mb-2 font-medium">
            {userDetails?.creatorType?.toLowerCase() || "Creator"}
          </p>

          {userDetails.location && (
            <div className="flex items-center justify-center space-x-1 mb-4">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 font-light">
                {userDetails.location}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6 text-center border-t pt-4 border-gray-200">
            <div>
              <div className="font-bold text-blue-600 text-xl">
                {userDetails.postCount}
              </div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Posts
              </div>
            </div>
            <div>
              <div className="font-bold text-blue-600 text-xl">
                {userDetails.peersCount}
              </div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                Peers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsCard;
