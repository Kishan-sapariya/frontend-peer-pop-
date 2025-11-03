"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Users,
  Calendar,
  Building,
  Mail,
  FileText,
  Target,
  Loader2,
  DollarSign,
  Briefcase,
  MoreVertical,
  Facebook,
  Trash,
} from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams } from "next/navigation";
import {
  capitalizeInitials,
  formatDate,
  formatNumber,
} from "@/utils/formatDate";
import UploadImageModal from "@/component/profile/UploadImageModal";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateBasicInfo from "@/component/business/UpdateBasicInfo";
import UpdateSocials from "@/component/business/UpdateSocials";
import PostInputSection from "@/component/feeds/PostInputSection";
import AddServiceDialog from "@/component/business/AddServiceDialog";
import AddAchievementDialog from "@/component/business/AddAchievementDialog";

export default function BusinessProfilePage() {
  const {
    businessProfileDetails,
    getBusinessDetails,
    deleteService,
    deleteAchievement,
  } = useBusinessStore();

  const { user } = useAuthStore();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  useEffect(() => {
    getBusinessDetails(username);
  }, [getBusinessDetails, username]);
  const business = businessProfileDetails?.businessProfile || {};
  const getFoundedYear = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.getFullYear();
  };
  const renderSocialLinks = () => {
    const socialPlatforms = [
      {
        name: "Instagram",
        url: business.instagramUrl,
        followers: business.instagramFollowers,
        icon: <Instagram className="w-6 h-6 text-pink-600" />,
        bgColor: "from-pink-50 to-purple-50",
      },
      {
        name: "LinkedIn",
        url: business.linkedinUrl,
        followers: business.linkedinFollowers,
        icon: <Linkedin className="w-6 h-6 text-blue-600" />,
        bgColor: "from-blue-50 to-indigo-50",
      },
      {
        name: "Twitter",
        url: business.twitterUrl,
        followers: business.twitterFollowers,
        icon: <Twitter className="w-6 h-6 text-sky-500" />,
        bgColor: "from-sky-50 to-blue-50",
      },
      {
        name: "Facebook",
        url: business.facebookUrl,
        followers: business.facebookFollowers,
        icon: <Facebook className="w-6 h-6 text-sky-500" />,
        bgColor: "from-blue-100 to-blue-200",
      },
    ];
    return socialPlatforms.map((platform, index) => (
      <div
        key={index}
        className={`flex items-center justify-between p-3 bg-gradient-to-r ${platform.bgColor} rounded-lg`}
      >
        <div className="flex items-center space-x-3">
          {platform.icon}
          <div>
            <div className="font-medium">{platform.name}</div>
            <div className="text-sm text-gray-600">
              {platform.followers
                ? `${formatNumber(platform.followers)} followers`
                : "Not connected"}
            </div>
          </div>
        </div>
        {platform.url && platform.url !== "" && (
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Visit
          </a>
        )}
      </div>
    ));
  };
  const getBusinessTagline = () => {
    if (!business.industry && !business.businessType)
      return "Your business partner";
    return `${business.industry || "Business"} ${
      business.businessType?.toUpperCase() || "Company"
    }`;
  };
  if (!businessProfileDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">
            Loading business profile...
          </h2>
        </div>
      </div>
    );
  }
  const isOwnProfile = business.userProfileId === user?.id;
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="relative h-64 bg-black">
        <img
          src={
            isOwnProfile ? user?.coverImage : businessProfileDetails?.coverImage
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="relative w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage
                    className="object-cover"
                    src={
                      isOwnProfile ? user?.image : businessProfileDetails?.image
                    }
                  />
                  <AvatarFallback className="text-3xl">
                    {business.companyName?.charAt(0)?.toUpperCase() || "B"}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && <UploadImageModal />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {capitalizeInitials(
                          business.companyName || "Business Name"
                        )}
                      </h1>
                      {business.isVerified ? (
                        <Badge className="bg-red-500">Business Verified</Badge>
                      ) : (
                        <Badge className="bg-gray-500">
                          Business Unverified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-1">
                      {getBusinessTagline()}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {business.headquarters || "Location not specified"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Founded {getFoundedYear(business.foundedYear)}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {business.size || "Size not specified"}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Industry & Type:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {business.industry || "Not specified"}
                        </Badge>
                        {business.businessType && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {business.businessType.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    {isOwnProfile ? (
                      <ProfileActionsMenu />
                    ) : (
                      <ConnectBtn
                        isOwnProfile={isOwnProfile}
                        profileId={
                          businessProfileDetails?.businessProfile?.userProfileId
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <Building className="w-5 h-5 mr-2" />
                  About
                </CardTitle>
                {isOwnProfile && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreVertical className="absolute top-5 right-4 h-4 w-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-40 px-2 py-1">
                      <UpdateBasicInfo />
                    </PopoverContent>
                  </Popover>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {business.about ||
                    `${business.companyName} is a ${
                      business.industry?.toLowerCase() || "business"
                    } company focused on delivering excellent services and solutions.`}
                </p>
                {business.website && (
                  <div className="flex items-center text-sm mb-3">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <a
                      href={
                        business.website.startsWith("http")
                          ? business.website
                          : `https://${business.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center text-sm mb-3">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{business.phone}</span>
                  </div>
                )}
                {business.supportEmail && (
                  <div className="flex items-center text-sm mb-3">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      {business.supportEmail}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <CardTitle>Social Media Presence</CardTitle>
                {isOwnProfile && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreVertical className="absolute top-5 right-4 h-4 w-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-40 px-2 py-1">
                      <UpdateSocials />
                    </PopoverContent>
                  </Popover>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">{renderSocialLinks()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Business Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Partnerships</span>
                    <Badge className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collaborations</span>
                    <Badge className="bg-green-100 text-green-700">Open</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consulting</span>
                    <Badge className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="posts">
                  {isOwnProfile ? "My Posts" : "Posts"}
                </TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* POSTS */}
              <TabsContent value="posts">
                {isOwnProfile && <PostInputSection />}
                <MyPostsSection
                  profileId={
                    businessProfileDetails?.businessProfile?.userProfileId
                  }
                />
              </TabsContent>

              {/* SERVICES */}
              <TabsContent value="services">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Our Services
                    </CardTitle>
                    {isOwnProfile && (
                      <AddServiceDialog isOwnProfile={isOwnProfile} />
                    )}
                  </CardHeader>
                  <CardContent>
                    {businessProfileDetails?.businessProfile?.services?.length >
                    0 ? (
                      <div className="grid gap-4">
                        {businessProfileDetails.businessProfile.services.map(
                          (service, i) => (
                            <Card
                              key={i}
                              className="relative border p-4 shadow-sm rounded-lg hover:shadow-md transition"
                            >
                              <h3 className="font-semibold text-lg text-gray-800">
                                {service.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {service.description}
                              </p>
                              {isOwnProfile && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                  onClick={() => deleteService(i)}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              )}
                            </Card>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-8">
                        Services information will be displayed here.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ACHIEVEMENTS */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Business Achievements
                    </CardTitle>
                    {isOwnProfile && (
                      <AddAchievementDialog isOwnProfile={isOwnProfile} />
                    )}
                  </CardHeader>
                  <CardContent>
                    {businessProfileDetails?.businessProfile?.achievements
                      ?.length > 0 ? (
                      <div className="grid gap-2">
                        {businessProfileDetails.businessProfile.achievements.map(
                          (achievement, i) => (
                            <Card
                              key={i}
                              className="relative border p-4 shadow-sm rounded-lg hover:shadow-md transition"
                            >
                              <h3 className="font-semibold text-lg text-gray-800">
                                {achievement.title}
                              </h3>
                              {achievement.date && (
                                <p className="text-sm text-gray-500">
                                  {formatDate(achievement.date)}
                                </p>
                              )}
                              <p className="text-sm text-gray-600 mt-1">
                                {achievement.description}
                              </p>
                              {isOwnProfile && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                  onClick={() => deleteAchievement(i)}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              )}
                            </Card>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-8">
                        Achievements and milestones will be displayed here.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
