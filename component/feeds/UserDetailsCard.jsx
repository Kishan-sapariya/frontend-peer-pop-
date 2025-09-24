"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useFeedStore } from "@/store/useFeedStore";
import {
  capitalizeInitials,
  getCompletionCateogryStyle,
} from "@/utils/formatDate";
import { Briefcase, MapPin } from "lucide-react";
import React, { useEffect } from "react";

const UserDetailsCard = () => {
  const { getUserDetails, userDetail } = useFeedStore();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const userDetails = userDetail?.userDetails;
  const businessDetails = userDetail?.businessDetails;

  if (!userDetail) {
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

  const style = getCompletionCateogryStyle(userDetail?.completion?.category);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-white transition-all duration-300 rounded-2xl pt-4 pb-0 hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 mx-auto border-[3px] border-blue-400 p-[2px] transition-all duration-300 mb-2">
              <AvatarImage
                className="object-cover rounded-full"
                src={userDetails.image}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-600 text-white font-bold text-3xl">
                {userDetails.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center justify-center gap-2">
              <h3 className="font-medium text-2xl text-gray-900">
                {userDetails.username}
              </h3>
              {userDetails?.role === "CREATOR" && (
                <Badge className={style?.className}>
                  {userDetail?.completion?.category}
                </Badge>
              )}
            </div>

            {userDetails?.location && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-violet-500" />
                <p className="text-sm text-gray-800 font-medium">
                  {userDetails.location}
                </p>
              </div>
            )}

            {userDetails?.creatorType && (
              <p className="text-base text-gray-600 font-medium mt-1">
                {capitalizeInitials(userDetails?.creatorType?.toLowerCase())}
              </p>
            )}
            {userDetails?.role === "BUSINESS" && (
              <p className="text-sm text-gray-500 font-medium mt-1">
                Business account
              </p>
            )}
          </div>

          {/* Business Info Section */}
          <div className="space-y-2 mb-6">
            {businessDetails?.location && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-violet-500" />
                <p className="text-sm text-gray-600 font-medium">
                  {businessDetails.location}
                </p>
              </div>
            )}
            {businessDetails?.industry && (
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <p className="text-sm text-gray-600 font-medium">
                  <span className="font-bold text-gray-800">Industry:</span>{" "}
                  {businessDetails.industry}
                </p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6 py-3 border-t border-gray-200">
            <div>
              <div className="font-medium text-blue-600 text-2xl">
                {userDetails.postCount}
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide mt-1">
                Posts
              </div>
            </div>
            <div>
              <div className="font-medium text-blue-600 text-2xl">
                {userDetails.peersCount}
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide mt-1">
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
