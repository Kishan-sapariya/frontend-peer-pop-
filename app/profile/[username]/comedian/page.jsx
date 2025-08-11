"use client";

import { useEffect, useState } from "react";
import { useComedianStore } from "@/store/useComedianStore";
import { useParams } from "next/navigation";
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
  Award,
  Users,
  Star,
  Share2,
  UserPlus,
  Mic,
  Clock,
  LocateIcon as LocationIcon,
  Ticket,
  Laugh,
  DollarSign,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Upload,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { formatNumber } from "@/utils/formatDate";
import UploadImageModal from "@/component/profile/UploadImageModal";
import UploadCoverImageModal from "@/component/profile/UploadCoverImageModal";
import { useAuthStore } from "@/store/useAuthStore";
import UpcomingShowsTab from "@/component/comedian profile/UpcomingShowsTab";
import RecentSetsTab from "@/component/comedian profile/RecentSetsTab";
import AchievementTab from "@/component/comedian profile/AchievementTab";
import ShareDialog from "@/component/ShareDialog";

export default function ComedianProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("shows");
  const { username } = useParams();
  const { profile, getComedianProfileByUsername } = useComedianStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { deleteImage } = useAuthStore();

  useEffect(() => {
    async function fetchProfile() {
      if (username) {
        setIsLoading(true);
        setError(null);
        try {
          await getComedianProfileByUsername(username);
        } catch (err) {
          setError("Failed to load profile.");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchProfile();
  }, [username]);

  // Safely extract data from profile with fallbacks
  const profileData = profile?.data || {};
  const personalInfo = profileData.personalInfo || {};
  const business = profileData.business || {};
  const comedyCareer = profileData.comedyCareer || {};
  const performanceDetails = profileData.performanceDetails || {};
  const performanceStats = profileData.performanceStats || {};
  const socialMedia = profileData.socialMedia || {};
  const socialStats = socialMedia.stats || {};
  const availability = business.availability || {};
  const rates = business.rates || {};
  const preferences = profileData.preferences || {};

  // Map to UI model
  const comedian = {
    name:
      `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() ||
      "Comedian",
    title: personalInfo.title || "Stand-Up Comedian",
    location: personalInfo.location || "Location not specified",
    joinDate: personalInfo.joinDate || "Not specified",
    website: personalInfo.website || "",
    email: personalInfo.email || "",
    phone: personalInfo.phone || "",
    bio: personalInfo.bio || "No bio available",
    avatar:
      personalInfo.profileImage || "/placeholder.svg?height=120&width=120",
    coverImage:
      personalInfo.coverImage || "/placeholder.svg?height=300&width=1200",
    verified: personalInfo.verified || false,
    stats: {
      showsPerformed: comedyCareer.showsPerformed || 0,
      yearsActive: comedyCareer.yearsPerforming || "Not specified",
      avgAudienceSize: comedyCareer.avgAudienceSize || 0,
      totalAudience: performanceStats.totalAudience || 0,
      specialsReleased: performanceStats.specialsReleased || 0,
      clubsPerformed: Array.isArray(comedyCareer.primaryVenues)
        ? comedyCareer.primaryVenues.length
        : 0,
    },
    socialStats: {
      instagram: { followers: socialStats.instagram || 0, verified: false },
      twitter: { followers: socialStats.twitter || 0, verified: false },
      youtube: { subscribers: socialStats.youtube || 0, verified: false },
      tiktok: { followers: socialStats.tiktok || 0, verified: false },
    },
    comedyStyle: Array.isArray(comedyCareer.comedyStyle)
      ? comedyCareer.comedyStyle
      : [],
    languages: Array.isArray(performanceDetails.languages)
      ? performanceDetails.languages.map((lang) => ({
          name:
            typeof lang === "object" && lang?.language
              ? lang.language
              : typeof lang === "string"
              ? lang
              : "Unknown",
          level:
            typeof lang === "object" && lang?.level ? lang.level : "Fluent",
        }))
      : [{ name: "English", level: "Native" }],
    availability: {
      standup: availability.standup || false,
      corporate: availability.corporate || false,
      writing: availability.writing || false,
      podcasts: availability.podcasts || false,
      private: availability.private || false,
    },
    rates: {
      standup: rates.standup || "Not specified",
      corporate: rates.corporate || "Not specified",
      writing: rates.writing || "Not specified",
      podcast: rates.podcast || "Not specified",
      private: rates.private || "Not specified",
    },
    venues: Array.isArray(comedyCareer.primaryVenues)
      ? comedyCareer.primaryVenues
      : [],
  };

  // These arrays should be fetched from profileData if available, else fallback to []
  const upcomingShows = Array.isArray(comedyCareer.upcomingShows)
    ? comedyCareer.upcomingShows
    : [];
  const recentSets = Array.isArray(comedyCareer.recentSets)
    ? comedyCareer.recentSets
    : [];
  const achievements = Array.isArray(performanceStats.awardsWon)
    ? performanceStats.awardsWon
    : [];
  const mediaAppearances = Array.isArray(performanceStats.mediaAppearances)
    ? performanceStats.mediaAppearances
    : [];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64">
        <img
          src={profile?.userProfile?.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover "
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
                    src={profile?.userProfile?.image}
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                  <AvatarFallback className="text-3xl">
                    {comedian.name
                      .split(" ")
                      .map((n) => n[0] || "")
                      .join("")
                      .toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <UploadImageModal />
                {comedian.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Laugh className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {comedian.name}
                      </h1>
                      {comedian.verified && (
                        <Badge className="bg-yellow-500">
                          Verified Comedian
                        </Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-3">
                      {comedian.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {comedian.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {comedian.stats.yearsActive} years performing
                      </div>
                      <div className="flex items-center">
                        <Mic className="w-4 h-4 mr-1" />
                        {comedian.stats.showsPerformed}+ shows
                      </div>
                    </div>

                    {/* Comedy Style */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {comedian.comedyStyle.map((style, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-700"
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Performs in:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {comedian.languages.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-orange-50 text-orange-700 border-orange-200"
                          >
                            {lang.name} ({lang.level})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      variant={isFollowing ? "outline" : "default"}
                      size="lg"
                      className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Connected" : "Connect"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Collaborate
                    </Button>
                    <ShareDialog
                      username={profile?.userProfile?.username}
                      creatorType={profile?.creatorType}
                    />
                    <UploadCoverImageModal />
                  </div>
                </div>

                {/* Comedy Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {comedian.stats.showsPerformed}+
                    </div>
                    <div className="text-sm text-gray-600">Shows Performed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {(comedian.stats.totalAudience / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Total Audience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {comedian.stats.clubsPerformed}
                    </div>
                    <div className="text-sm text-gray-600">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {comedian.stats.specialsReleased}
                    </div>
                    <div className="text-sm text-gray-600">Specials</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  {comedian.bio}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <a
                      href={`https://${comedian.website}`}
                      className="text-blue-600 hover:underline"
                    >
                      {comedian.website}
                    </a>
                  </div>
                  {profileData?.preferences?.showContact && (
                    <>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">{comedian.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-600">{comedian.phone}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Following</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Instagram */}
                  {comedian.socialStats.instagram.followers > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Instagram className="w-6 h-6 text-pink-600" />
                        <div>
                          <div className="font-medium">Instagram</div>
                          <div className="text-sm text-gray-600">
                            {formatNumber(
                              comedian.socialStats.instagram.followers
                            )}{" "}
                            followers
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* TikTok */}
                  {comedian.socialStats.tiktok.followers > 0 && (
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
                              comedian.socialStats.tiktok.followers
                            )}{" "}
                            followers
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Twitter */}
                  {comedian.socialStats.twitter.followers > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Twitter className="w-6 h-6 text-blue-600" />
                        <div>
                          <div className="font-medium">Twitter</div>
                          <div className="text-sm text-gray-600">
                            {formatNumber(
                              comedian.socialStats.twitter.followers
                            )}{" "}
                            followers
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* YouTube */}
                  {comedian.socialStats.youtube.subscribers > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Youtube className="w-6 h-6 text-red-600" />
                        <div>
                          <div className="font-medium">YouTube</div>
                          <div className="text-sm text-gray-600">
                            {formatNumber(
                              comedian.socialStats.youtube.subscribers
                            )}{" "}
                            subscribers
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Regular Venues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LocationIcon className="w-5 h-5 mr-2" />
                  Regular Venues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {comedian.venues.map((venue, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-700 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                      {venue}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking & Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Booking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(availability)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <div
                        className="flex items-center justify-between"
                        key={key}
                      >
                        <span className="text-sm">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          {key === "standup"
                            ? " Shows"
                            : key === "corporate"
                            ? " Events"
                            : key === "private"
                            ? " Shows"
                            : key === "writing"
                            ? " Writing"
                            : key === "podcasts"
                            ? " Appearances"
                            : ""}
                        </span>
                        <Badge className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                      </div>
                    ))}
                </div>

                <Separator className="my-4" />

                {profileData?.preferences?.showRates && (
                  <div>
                    <h4 className="font-medium text-sm mb-3">Rates</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(comedian.rates)
                        .filter(
                          ([_, value]) =>
                            value && value !== "Not specified" && value !== ""
                        )
                        .map(([key, value]) => (
                          <div className="flex justify-between" key={key}>
                            <span className="text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Button className="w-full mt-4" size="sm">
                  <Ticket className="w-4 h-4 mr-2" />
                  Request Booking
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
                <TabsTrigger value="recent">Recent Sets</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="shows">
                <UpcomingShowsTab />
              </TabsContent>

              <TabsContent value="recent">
                <RecentSetsTab />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
