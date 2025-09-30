"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useFeedStore } from "@/store/useFeedStore";
import {
  capitalizeInitials,
  getCompletionCateogryStyle,
} from "@/utils/formatDate";
import { Briefcase, MapPin, FileText, Users, Youtube, Instagram, User } from "lucide-react";
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
      <div className="space-y-5">
        <div className="h-[320px] flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 animate-pulse">
          <div className="w-28 h-28 bg-gray-200 rounded-full mb-6"></div>
          <div className="w-3/4 h-7 bg-gray-200 rounded-md mb-3"></div>
          <div className="w-1/2 h-5 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-1/3 h-5 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-[120px] bg-white rounded-2xl shadow-lg border border-gray-100 animate-pulse"></div>
      </div>
    );
  }

  const style = getCompletionCateogryStyle(userDetail?.completion?.category);

  const getCreatorTypeIcon = (type) => {
    switch (type) {
      case "YOUTUBER":
        return <Youtube className="w-3.5 h-3.5" />;
      case "INFLUENCER":
        return <Instagram className="w-3.5 h-3.5" />;
      default:
        return <User className="w-3.5 h-3.5" />;
    }
  };

  const getCreatorTypeColor = (type) => {
    switch (type) {
      case "YOUTUBER":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case "INFLUENCER":
        return "bg-pink-100 text-pink-700 hover:bg-pink-200";
      case "COMEDIAN":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-4">
          {/* Avatar */}
          <div className="relative mb-6">
            <Avatar className="w-28 h-28 mx-auto border-4 border-white shadow-xl">
              <AvatarImage
                className="object-cover rounded-full"
                src={userDetails.image}
              />
              <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-700 text-white font-bold text-4xl">
                {userDetails.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {userDetails?.role === "CREATOR" && userDetail?.completion?.category && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className={`${style?.className} font-semibold px-3 py-1 shadow-sm`}>
                  {userDetail?.completion?.category}
                </Badge>
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-bold text-2xl text-gray-900 text-center mb-2">
            {capitalizeInitials(userDetails.username)}
          </h3>

          {/* Handle Name */}
          {userDetails?.handleName && (
            <div className="text-center mb-4">
              {userDetails?.creatorType === "YOUTUBER" ? (
                <a
                  href={`https://youtube.com/@${userDetails.handleName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  @{userDetails.handleName}
                </a>
              ) : userDetails?.creatorType === "INFLUENCER" ? (
                <a
                  href={`https://instagram.com/${userDetails.handleName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  @{userDetails.handleName}
                </a>
              ) : (
                <p className="text-gray-700 font-medium">
                  @{userDetails.handleName}
                </p>
              )}
            </div>
          )}

          {/* Badges Row */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {userDetails?.creatorType && (
              <Badge className={`${getCreatorTypeColor(userDetails.creatorType)} border-0 font-medium px-3 py-1.5 flex items-center gap-1.5`}>
                {getCreatorTypeIcon(userDetails.creatorType)}
                {capitalizeInitials(userDetails?.creatorType?.toLowerCase())}
              </Badge>
            )}
            {userDetails?.role === "BUSINESS" && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 font-medium px-3 py-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Business Account
              </Badge>
            )}
          </div>

          {/* Location Info */}
          <div className="space-y-3">
            {userDetails?.state && (
              <div className="flex justify-center items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span className="text-sm">
                  {userDetails.state},{" "}
                  {userDetails.city === "Other"
                    ? capitalizeInitials(userDetails.customCity)
                    : capitalizeInitials(userDetails.city)}
                </span>
              </div>
            )}

            {/* Business Info */}
            {businessDetails && (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                {businessDetails?.location && (
                  <div className="flex justify-center items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-violet-500 flex-shrink-0" />
                    <span className="text-sm">{businessDetails.location}</span>
                  </div>
                )}
                {businessDetails?.industry && (
                  <div className="flex justify-center items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-semibold">Industry:</span>{" "}
                      {businessDetails.industry}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="group hover:bg-gray-50 transition-colors p-6 text-center">
              <div className="font-bold text-4xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {userDetails.postCount}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider mt-1">
                Posts
              </div>
            </div>
            <div className="group hover:bg-gray-50 transition-colors p-6 text-center">
              <div className="font-bold text-4xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                {userDetails.peersCount}
              </div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wider mt-1">
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