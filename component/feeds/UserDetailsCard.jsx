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
      </div>
    );
  }

  const style = getCompletionCateogryStyle(userDetail?.completion?.category);

  return (
    <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 pt-9 pb-5">
      <CardContent className="text-center">
        {/* Avatar */}
        <Avatar className="w-24 h-24 mx-auto border-[3px] border-blue-400 p-[2px] mb-3">
          <AvatarImage
            className="object-cover rounded-full"
            src={userDetails.image}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-600 text-white font-bold text-3xl">
            {userDetails.username?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        {/* Name & Badge */}
        <div className="flex justify-center items-center gap-2 mb-2">
          <h3 className="font-bold text-2xl text-gray-900">
            {userDetails.username}
          </h3>
          {userDetails?.role === "CREATOR" && (
            <Badge className={`${style?.className} font-semibold`}>
              {userDetail?.completion?.category}
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 max-w-md mx-auto">
          {userDetails?.state && (
            <div className="flex justify-center items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-violet-600" />
              <span>
                {userDetails.state},{" "}
                {userDetails.city || userDetails.customCity}
              </span>
            </div>
          )}
          {userDetails?.creatorType && (
            <p className="text-gray-700 font-medium">
              {capitalizeInitials(userDetails?.creatorType?.toLowerCase())}
            </p>
          )}
          {userDetails?.role === "BUSINESS" && (
            <p className="text-gray-600">Business account</p>
          )}
        </div>

        {/* Business Info */}
        {businessDetails && (
          <div className="mt-4 space-y-2">
            {businessDetails?.location && (
              <div className="flex justify-center items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-violet-600" />
                <span>{businessDetails.location}</span>
              </div>
            )}
            {businessDetails?.industry && (
              <div className="flex justify-center items-center gap-2 text-gray-700">
                <Briefcase className="w-4 h-4 text-orange-500" />
                <span>
                  <span className="font-semibold">Industry:</span>{" "}
                  {businessDetails.industry}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t mt-4 border-gray-200">
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
  );
};

export default UserDetailsCard;
