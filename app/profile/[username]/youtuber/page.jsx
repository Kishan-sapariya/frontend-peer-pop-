"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  MessageCircle,
  UserPlus,
  Play,
  Video,
  DollarSign,
  Users,
  Target,
  Loader2,
  Instagram,
  Youtube,
  Twitter,
  Boxes,
  Upload,
  MoreVertical,
  Trash2,
  Phone,
  Lock,
} from "lucide-react";
import { useYoutubeStore } from "@/store/useYoutubeStore";
import { useParams } from "next/navigation";
import { capitalizeInitials, formatNumber } from "@/utils/formatDate";
import RecentContent from "@/component/youtube profile/RecentContent";
import UploadImageModal from "../../../../component/profile/UploadImageModal";
import { useAuthStore } from "@/store/useAuthStore";
import CollaborationTab from "@/component/youtube profile/CollaborationTab";
import AchievementTab from "@/component/youtube profile/AchievementTab";
import ShareDialog from "@/component/ShareDialog";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import PrivateAccountUI from "@/component/PrivateAccountUI";
import PostInputSection from "@/component/feeds/PostInputSection";

export default function YouTuberProfile() {
  const {
    profile,
    isLoading,
    error,
    getYoutubeProfileByUsername,
    getRecentContent,
    recentContent,
    stats,
    getYoutubeStats,
  } = useYoutubeStore();
  const [accountVisibility, setAccountVisibility] = useState(
    profile?.userProfile?.visibility
  );
  const [activeTab, setActiveTab] = useState("my posts");
  const { username } = useParams();
  const { user } = useAuthStore();
  useEffect(() => {
    if (username) {
      getYoutubeProfileByUsername(username);
    }
    getRecentContent();
  }, [username]);

  useEffect(() => {
    if (profile?.userProfile?.id) {
      getYoutubeStats(profile.userProfile.id);
    }
  }, [getYoutubeStats, profile?.userProfile?.id]);

  const avgViews = stats.totalViews / stats.videoCount;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">
            Loading profile...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error ? "Error Loading Profile" : "Profile Not Found"}
            </h2>
            <p className="text-gray-600 mb-6">
              {error ||
                "No YouTube profile found. Please complete your onboarding."}
            </p>
            <Button asChild>
              <a href="/onboarding/youtuber">Create Your Profile</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profileData = profile?.data || {};
  const personalInfo = profileData.personalInfo || {};
  const channelInfo = profileData.channelInfo || {};
  const statistics = profileData.statistics || {};
  const contentInfo = profileData.contentInfo || {};
  const socialMedia = profileData.socialMedia || {};
  const socialStats = socialMedia.stats || {};
  const business = profileData.business || {};
  const availability = business.availability || {};
  const rates = business.rates || {};
  const additional = profileData.additional || {};

  // Create creator object with safe property access
  const creator = {
    name:
      `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() ||
      "Creator",
    title: personalInfo.title || "YouTube Creator",
    channel: channelInfo.channelHandle ? `@${channelInfo.channelHandle}` : "",
    location: personalInfo.location || "Location not specified",
    joinDate: channelInfo.channelAge || "Not specified",
    website: personalInfo.website || "",
    email: personalInfo.email || "",
    bio: personalInfo.bio || "No bio available",
    avatar: personalInfo.profileImage || "",
    coverImage: personalInfo.coverImage || "",
    verified: channelInfo.verified || false,

    stats: {
      subscribers: statistics.subscriberCount || 0,
      totalViews: statistics.totalViews || 0,
      videos: statistics.videoCount || 0,
      avgViews: statistics.avgViews || 0,
      monthlyViews: statistics.monthlyViews || 0,
      watchTime: statistics.watchTimeHours || 0,
    },

    socialStats: {
      youtube: {
        subscribers: statistics.subscriberCount || 0,
        verified: channelInfo.verified || false,
      },
      instagram: {
        followers: socialStats.instagram || 0,
        verified: false,
      },
      twitter: {
        followers: socialStats.twitter || 0,
        verified: false,
      },
      tiktok: {
        followers: socialStats.tiktok || 0,
        verified: false,
      },
      twitch: {
        followers: socialStats.twitch || 0,
        verified: false,
      },
      linkedin: {
        followers: socialStats.linkedin || 0,
        verified: false,
      },
    },

    // Safely map content categories
    contentCategories: Array.isArray(contentInfo.contentCategories)
      ? contentInfo.contentCategories.map((category, index) => ({
          name: category,
          percentage: Math.round(100 / contentInfo.contentCategories.length),
          videos: Math.round(
            (statistics.videoCount || 100) /
              contentInfo.contentCategories.length
          ),
        }))
      : [],

    availability: {
      sponsorships: availability.sponsorships || false,
      collaborations: availability.collaborations || false,
      consulting: availability.consulting || false,
      speaking: availability.speaking || false,
    },

    rates: {
      sponsorship: rates.sponsorship || "Not specified",
      collaboration: rates.collaboration || "Not specified",
      consulting: rates.consulting || "Not specified",
      speaking: rates.speaking || "Not specified",
    },

    // Safely map languages array
    languages: Array.isArray(additional.languages)
      ? additional.languages.map((lang) => ({
          language:
            typeof lang === "object" && lang?.language
              ? lang.language
              : typeof lang === "string"
              ? lang
              : "Unknown",
          level:
            typeof lang === "object" && lang?.level ? lang.level : "Fluent",
        }))
      : [{ name: "English", level: "Native" }],
  };

  const getStatValue = (primary, fallback) => {
    return primary !== undefined && primary !== null && primary !== ""
      ? primary
      : fallback;
  };
  const accountRestricted = profile?.restricted;

  const isOwnProfile = profile?.userProfile?.id === user?.id;
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Cover Image */}
      <div className="relative h-64 bg-black">
        <img
          src={
            isOwnProfile ? user?.coverImage : profile?.userProfile?.coverImage
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="relative w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage
                    className="object-cover"
                    src={
                      isOwnProfile ? user?.image : profile?.userProfile?.image
                    }
                  />
                  <AvatarFallback className="text-3xl">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0] || "")
                      .join("")
                      .toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && <UploadImageModal />}
                {creator.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {capitalizeInitials(profile?.userProfile?.username)}
                      </h1>
                      {stats && Object.keys(stats).length > 0 && (
                        <Badge className="bg-red-500">YouTube Verified</Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-1">
                      {creator.title}
                    </p>
                    {creator.channel && (
                      <p className="text-lg text-red-600 font-medium mb-3">
                        {creator.channel}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {capitalizeInitials(creator.location)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Creating since {creator.joinDate}
                      </div>
                      <div className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        {creator.stats.videos} videos
                      </div>
                    </div>

                    {/* Languages */}
                    {creator.languages.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Content Languages:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {creator.languages.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              {capitalizeInitials(lang.language)} ({lang.level})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    {!isOwnProfile && (
                      <ConnectBtn
                        profileId={profile?.userProfile?.id}
                        isOwnProfile={isOwnProfile}
                        creatorType={profile?.creatorType}
                      />
                    )}
                    {isOwnProfile && (
                      <>
                        <ShareDialog
                          username={profile?.userProfile?.username}
                          creatorType={profile?.creatorType}
                        />

                        <ProfileActionsMenu
                          accountVisibility={accountVisibility}
                          setAccountVisibility={setAccountVisibility}
                        />
                      </>
                    )}
                  </div>
                </div>
                {/* YouTube Stats */}
                {!accountRestricted && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t">
                    {/* Public Stats Section */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {formatNumber(
                          getStatValue(
                            stats.subscriberCount,
                            profileData?.statistics?.subscriberCount
                          )
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {formatNumber(
                          getStatValue(
                            stats.totalViews,
                            profileData?.statistics?.totalViews
                          )
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Total Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {formatNumber(
                          getStatValue(avgViews, creator?.stats?.avgViews)
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Avg Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        {formatNumber(creator.stats.watchTime)}
                      </div>
                      <div className="text-sm text-gray-600">Watch Hours</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {!accountRestricted ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {creator.bio}
                  </p>
                  {creator.website && (
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 mr-2 text-gray-400" />
                        <a
                          href={
                            creator.website.startsWith("http")
                              ? creator.website
                              : `https://${creator.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {creator.website}
                        </a>
                      </div>
                    </div>
                  )}
                  {(isOwnProfile || profileData?.preferences?.showContact) && (
                    <>
                      {creator.email && (
                        <div className="flex items-center text-sm mt-3">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{creator.email}</span>
                        </div>
                      )}
                      {profileData?.personalInfo?.phone && (
                        <div className="flex items-center text-sm mt-3">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            {profileData?.personalInfo?.phone}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Social Media Reach */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Instagram */}
                    {creator.socialStats.instagram.followers > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Instagram className="w-6 h-6 text-pink-600" />
                          <div>
                            <div className="font-medium">Instagram</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(
                                creator.socialStats.instagram.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TikTok */}
                    {creator.socialStats.tiktok.followers > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              T
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">TikTok</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(
                                creator.socialStats.tiktok.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* YouTube */}
                    {creator.socialStats.youtube.subscribers > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Youtube className="w-6 h-6 text-red-600" />
                          <div>
                            <div className="font-medium">YouTube</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(
                                creator.socialStats.youtube.subscribers
                              )}{" "}
                              subscribers
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Twitter */}
                    {creator.socialStats.twitter.followers > 0 && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Twitter className="w-6 h-6 text-blue-600" />
                          <div>
                            <div className="font-medium">Twitter</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(
                                creator.socialStats.twitter.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {creator.contentCategories.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex gap-2 items-center">
                      <Boxes className="text-gray-700" />
                      <CardTitle>Content Category</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {creator.contentCategories.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Availability & Rates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Business Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creator.availability.sponsorships && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sponsorships</span>
                        <Badge className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                      </div>
                    )}
                    {creator.availability.collaborations && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Collaborations</span>
                        <Badge className="bg-green-100 text-green-700">
                          Open
                        </Badge>
                      </div>
                    )}
                    {creator.availability.consulting && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consulting</span>
                        <Badge className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                      </div>
                    )}
                    {creator.availability.speaking && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Speaking</span>
                        <Badge className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                      </div>
                    )}
                  </div>

                  {profileData?.preferences?.showRates && (
                    <div>
                      <Separator className="my-4" />
                      <h4 className="font-medium text-sm mb-3">Rates</h4>
                      <div className="space-y-2 text-sm">
                        {creator.rates.sponsorship !== "Not specified" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sponsorship:</span>
                            <span className="font-medium">
                              {creator.rates.sponsorship}
                            </span>
                          </div>
                        )}
                        {creator.rates.consulting !== "Not specified" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Consulting:</span>
                            <span className="font-medium">
                              {creator.rates.consulting}
                            </span>
                          </div>
                        )}
                        {creator.rates.speaking !== "Not specified" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speaking:</span>
                            <span className="font-medium">
                              {creator.rates.speaking}
                            </span>
                          </div>
                        )}
                        {creator.rates.collaboration !== "Not specified" && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Collaboration:
                            </span>
                            <span className="font-medium">
                              {creator.rates.collaboration}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <Button className="w-full mt-4" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Send Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Keep the same as before */}
            <div className="lg:col-span-3">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="my posts">
                    {isOwnProfile ? "My Posts" : "Posts"}
                  </TabsTrigger>
                  <TabsTrigger value="content">Recent Content</TabsTrigger>
                  <TabsTrigger value="collaborations">
                    Collaborations
                  </TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="my posts">
                  {isOwnProfile && <PostInputSection />}
                  <MyPostsSection profileId={profile?.userProfile?.id} />
                </TabsContent>
                <TabsContent value="content">
                  <RecentContent
                    contents={recentContent}
                    isOwnProfile={isOwnProfile}
                  />
                </TabsContent>
                <TabsContent value="collaborations">
                  <CollaborationTab isOwnProfile={isOwnProfile} />
                </TabsContent>
                <TabsContent value="achievements">
                  <AchievementTab isOwnProfile={isOwnProfile} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <PrivateAccountUI />
        )}
      </div>
    </div>
  );
}
