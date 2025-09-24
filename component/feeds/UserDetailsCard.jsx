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
      <div className="h-[320px] flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
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
      <Card className="border-0 shadow-lg bg-white transition-all duration-300 rounded-2xl pt-4 pb-0 hover:shadow-xl">
        <CardContent className="p-6 text-center">
          {/* Avatar and Name Section */}
          <div className="relative mb-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mx-auto border-[3px] border-blue-400 p-[2px] transition-all duration-300 mb-3">
                <AvatarImage
                  className="object-cover rounded-full"
                  src={userDetails.image}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-600 text-white font-bold text-3xl">
                  {userDetails.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-bold text-2xl text-gray-900 tracking-tight">
                  {userDetails.username}
                </h3>
                {userDetails?.role === "CREATOR" && (
                  <Badge className={`${style?.className} font-semibold`}>
                    {userDetail?.completion?.category}
                  </Badge>
                )}
              </div>

              <div className="space-y-2 max-w-md mx-auto text-left">
                {userDetails?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-500 flex-shrink-0" />
                    <p className="text-base text-gray-700 font-medium">
                      {userDetails.location}
                    </p>
                  </div>
                )}

                {userDetails?.creatorType && (
                  <p className="text-base text-gray-700 font-medium">
                    {capitalizeInitials(
                      userDetails?.creatorType?.toLowerCase()
                    )}
                  </p>
                )}
                {userDetails?.role === "BUSINESS" && (
                  <p className="text-base text-gray-600 font-medium">
                    Business account
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Info Section */}
          {businessDetails && (
            <div className="space-y-3 mb-6 max-w-md mx-auto">
              <div className="space-y-2">
                {businessDetails?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-500" />
                    <p className="text-base text-gray-700 font-medium">
                      {businessDetails.location}
                    </p>
                  </div>
                )}
                {businessDetails?.industry && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-orange-500" />
                    <p className="text-base text-gray-700 font-medium">
                      <span className="font-bold text-gray-900">Industry:</span>{" "}
                      {businessDetails.industry}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8 py-4 border-t border-gray-200">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-3xl">
                {userDetails.postCount}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide mt-1">
                Posts
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600 text-3xl">
                {userDetails.peersCount}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide mt-1">
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
