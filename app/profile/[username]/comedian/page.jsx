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
  Users,
  Mic,
  LocateIcon as LocationIcon,
  Ticket,
  Laugh,
  DollarSign,
  Phone,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { formatNumber, getCompletionCateogryStyle } from "@/utils/formatDate";
import UploadImageModal from "@/component/profile/UploadImageModal";
import UploadCoverImageModal from "@/component/profile/ProfileActionMenu";
import { useAuthStore } from "@/store/useAuthStore";
import UpcomingShowsTab from "@/component/comedian profile/UpcomingShowsTab";
import RecentSetsTab from "@/component/comedian profile/RecentSetsTab";
import AchievementTab from "@/component/comedian profile/AchievementTab";
import ShareDialog from "@/component/ShareDialog";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import PrivateAccountUI from "@/component/PrivateAccountUI";
import PostInputSection from "@/component/feeds/PostInputSection";

export default function ComedianProfile() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("my posts");
  const { username } = useParams();
  const { profile, getComedianProfileByUsername } = useComedianStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountVisibility, setAccountVisibility] = useState(
    profile?.userProfile?.visibility
  );

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
    location: (() => {
      if (!personalInfo.state) return "Location not specified";

      const city =
        personalInfo.city === "Other"
          ? personalInfo.customCity
          : personalInfo.city;

      return city ? `${personalInfo.state}, ${city}` : personalInfo.state;
    })(),
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
      instagram: {
        followers: socialStats.instagram || 0,
        link: socialMedia.links?.instagram,
      },
      twitter: {
        followers: socialStats.twitter || 0,
        link: socialMedia.links?.twitter,
      },
      youtube: {
        subscribers: socialStats.youtube || 0,
        link: socialMedia.links?.youtube,
      },
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
      : [],
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
  const style = getCompletionCateogryStyle(profile?.completion?.category);

  const isOwnProfile = profile?.userProfile?.id === user?.id;

  const accountRestricted = profile?.restricted;
  const [hasError, setHasError] = useState(false);

  const imageSrc =
    (isOwnProfile ? user?.coverImage : profile?.userProfile?.coverImage) ||
    profile?.data?.personalInfo?.coverImage;

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);
  useEffect(() => {
    if (!imageSrc) {
      setHasError(true);
    }
  }, [imageSrc]);
  return (
    <div className="min-h-screen bg-gray-100 -mt-16">
      {/* Cover Image - extends behind navbar */}
      <div className="relative h-72 bg-gradient-to-b from-gray-900 to-gray-800">
        {imageSrc && !hasError && (
          <img
            src={imageSrc}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                    alt={profile?.userProfile?.username || "Comedian"}
                    src={
                      (isOwnProfile
                        ? user?.image
                        : profile?.userProfile?.image) ||
                      profile?.data?.personalInfo?.profileImage
                    }
                  />
                  <AvatarFallback className="text-3xl">
                    {profile?.userProfile?.username
                      .split(" ")
                      .map((n) => n[0] || "")
                      .join("")
                      .toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && <UploadImageModal />}
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
                        {profile?.userProfile?.username}
                      </h1>
                      <Badge className={style?.className}>
                        {profile?.completion?.category}
                      </Badge>
                      {comedian.verified && (
                        <Badge className="bg-yellow-500">
                          Verified Comedian
                        </Badge>
                      )}
                    </div>
                    {personalInfo.stageName && (
                      <p className="text-lg text-gray-500 italic mb-2">
                        aka {personalInfo.stageName}
                      </p>
                    )}
                    <p className="text-xl text-gray-600 mb-3">
                      {comedian.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {comedian.location}
                      </div>
                      {comedian.stats.yearsActive &&
                        comedian.stats.yearsActive !== "Not specified" && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {comedian.stats.yearsActive} years performing
                          </div>
                        )}
                      {comedian.stats.showsPerformed > 0 && (
                        <div className="flex items-center">
                          <Mic className="w-4 h-4 mr-1" />
                          {comedian.stats.showsPerformed}+ shows
                        </div>
                      )}
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
                    {comedian.languages.length > 0 && (
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
                    )}

                    {/* Profile Completion Notice */}
                    {isOwnProfile &&
                      profile?.completion?.percentage < 70 &&
                      profile?.completion?.percentage > 99 && (
                        <div className="mt-4 p-3 bg-yellow-50 text-sm rounded-lg">
                          🚀 Your profile is {profile.completion.percentage}%
                          complete. Fill in the missing details to unlock{" "}
                          <b>Elite</b> status.
                        </div>
                      )}
                    {isOwnProfile && profile?.completion?.percentage < 100 && (
                      <div className="mt-4 p-3 bg-yellow-50 text-sm rounded-lg">
                        🚀 Your profile is {profile.completion.percentage}%
                        complete. Fill in the missing details to unlock{" "}
                        <b>Pro</b> status.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <ConnectBtn
                      profileId={profile?.userProfile?.id}
                      isOwnProfile={isOwnProfile}
                      creatorType={profile?.creatorType}
                    />

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

                {/* Comedy Stats */}
                {!accountRestricted &&
                  (isOwnProfile || profileData?.preferences?.publicStats) && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t">
                    {comedian.stats.showsPerformed > 0 && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">
                          {comedian.stats.showsPerformed}+
                        </div>
                        <div className="text-sm text-gray-600">
                          Shows Performed
                        </div>
                      </div>
                    )}
                    {comedian.stats.totalAudience > 0 && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">
                          {(comedian.stats.totalAudience / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Audience
                        </div>
                      </div>
                    )}
                    {comedian.stats.clubsPerformed > 0 && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">
                          {comedian.stats.clubsPerformed}
                        </div>
                        <div className="text-sm text-gray-600">Venues</div>
                      </div>
                    )}
                    {comedian.stats.specialsReleased > 0 && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">
                          {comedian.stats.specialsReleased}
                        </div>
                        <div className="text-sm text-gray-600">Specials</div>
                      </div>
                    )}
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
                    {comedian.bio}
                  </p>
                  <div className="space-y-3">
                    {comedian.website && (
                      <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 mr-2 text-gray-400" />
                        <a
                          href={`https://${comedian.website}`}
                          className="text-blue-600 hover:underline"
                        >
                          {comedian.website}
                        </a>
                      </div>
                    )}
                    {(isOwnProfile ||
                      profileData?.preferences?.showContact) && (
                      <>
                        {comedian.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-gray-600">
                              {comedian.email}
                            </span>
                          </div>
                        )}
                        {comedian.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-gray-600">
                              {comedian.phone}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Details */}
              {(comedyCareer.performanceFrequency ||
                performanceDetails.setLength ||
                performanceDetails.contentRating ||
                performanceDetails.travelWillingness ||
                comedyCareer.avgAudienceSize) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mic className="w-5 h-5 mr-2" />
                      Performance Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      {comedyCareer.performanceFrequency && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Frequency</span>
                          <Badge variant="secondary">
                            {comedyCareer.performanceFrequency}
                          </Badge>
                        </div>
                      )}
                      {performanceDetails.setLength && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Set Length</span>
                          <Badge variant="secondary">
                            {performanceDetails.setLength}
                          </Badge>
                        </div>
                      )}
                      {performanceDetails.contentRating && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Content Rating</span>
                          <Badge variant="secondary">
                            {performanceDetails.contentRating}
                          </Badge>
                        </div>
                      )}
                      {performanceDetails.travelWillingness && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Travel</span>
                          <Badge variant="secondary">
                            {performanceDetails.travelWillingness}
                          </Badge>
                        </div>
                      )}
                      {comedyCareer.avgAudienceSize && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Avg Audience</span>
                          <Badge variant="secondary">
                            {comedyCareer.avgAudienceSize}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Following</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Instagram */}
                    {comedian.socialStats.instagram.followers > 0 && (
                      <a
                        href={comedian.socialStats.instagram.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg cursor-pointer"
                      >
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
                      </a>
                    )}

                    {/* Twitter */}
                    {comedian.socialStats.twitter.followers > 0 && (
                      <a
                        href={comedian.socialStats.twitter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg cursor-pointer"
                      >
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
                      </a>
                    )}

                    {/* YouTube */}
                    {comedian.socialStats.youtube.subscribers > 0 && (
                      <a
                        href={comedian.socialStats.youtube.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg cursor-pointer"
                      >
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
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Regular Venues */}
              {comedian.venues.length > 0 && (
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
              )}

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
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                  <TabsTrigger value="my posts">
                    {isOwnProfile ? "My Posts" : "Posts"}
                  </TabsTrigger>
                  <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
                  <TabsTrigger value="recent">Recent Sets</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="my posts">
                  {isOwnProfile && <PostInputSection />}
                  <MyPostsSection profileId={profile?.userProfile?.id} />
                </TabsContent>
                <TabsContent value="shows">
                  <UpcomingShowsTab isOwnProfile={isOwnProfile} />
                </TabsContent>

                <TabsContent value="recent">
                  <RecentSetsTab isOwnProfile={isOwnProfile} />
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
