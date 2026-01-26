"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  capitalizeInitials,
  formatDate,
  getCompletionCateogryStyle,
} from "@/utils/formatDate";
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
} from "lucide-react";
import UploadImageModal from "@/component/profile/UploadImageModal";
import { useAuthStore } from "@/store/useAuthStore";
import ShareDialog from "@/component/ShareDialog";
import UploadCoverImageModal from "@/component/profile/ProfileActionMenu";
import UploadRecentContent from "@/component/influencer profile/UploadContentForm";
import RecentContent from "@/component/influencer profile/RecentContentTab";
import { UploadCampaignForm } from "@/component/influencer profile/UploadCampaignForm";
import CampaignTab from "@/component/influencer profile/CampaignTab";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import PrivateAccountUI from "@/component/PrivateAccountUI";
import PostInputSection from "@/component/feeds/PostInputSection";

export default function InfluencerProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("my posts");
  const { username } = useParams();
  const { profile, getInfluencerProfileByUsername } = useInfluencerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    async function fetchProfile() {
      if (username) {
        setIsLoading(true);
        setError(null);
        try {
          await getInfluencerProfileByUsername(username);
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
  const contentInfo = profileData.contentInfo || {};
  const socialMedia = profileData.socialMedia || {};
  const platforms = socialMedia.platforms || {};
  const audience = profileData.audience || {};
  const brand = profileData.brand || {};
  const business = profileData.business || {};
  const availability = business.availability || {};
  const rates = business.rates || {};
  const contentCreation = profileData.contentCreation || {};
  const preferences = profileData.preferences || {};

  const genderSplitFromString = (gender) => {
    if (!gender) return { female: 0, male: 0, other: 0 };
    if (gender === "mostly-female") return { female: 80, male: 18, other: 2 };
    if (gender === "mostly-male") return { female: 18, male: 80, other: 2 };
    if (gender === "balanced") return { female: 50, male: 48, other: 2 };
    if (gender === "female-majority") return { female: 65, male: 33, other: 2 };
    if (gender === "male-majority") return { female: 33, male: 65, other: 2 };
    return { female: 0, male: 0, other: 0 };
  };

  const platform = profile?.data?.socialMedia?.platforms;

  const influencer = {
    name:
      `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim() ||
      "Influencer",
    title: personalInfo.displayName || "Influencer",
    niche: contentInfo.primaryNiche || "",

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
      totalFollowers:
        (parseInt(platforms.instagram?.followers) || 0) +
        (parseInt(platforms.youtube?.subscribers) || 0) +
        (parseInt(platforms.twitter?.followers) || 0),
      avgEngagement: parseFloat(platforms.instagram?.engagement) || 0,
      brandPartnerships: parseInt(brand.partnerships) || 0,
      campaignsCompleted: parseInt(brand.campaignsCompleted) || 0,
    },
    socialStats: {
      instagram: platforms.instagram || {},
      youtube: platforms.youtube || {},
      twitter: platforms.twitter || {},
    },
    contentCategories: Array.isArray(contentInfo.contentCategories)
      ? contentInfo.contentCategories.map((cat) =>
          typeof cat === "object" ? cat : { name: cat, percentage: 0, posts: 0 }
        )
      : [],
    demographics: {
      ageGroups: Array.isArray(audience.age)
        ? audience.age.map((range) =>
            typeof range === "object" ? range : { range, percentage: 0 }
          )
        : [],
      genderSplit: audience.genderSplit
        ? audience.genderSplit
        : genderSplitFromString(audience.gender),
      topLocations: Array.isArray(audience.topLocations)
        ? audience.topLocations
        : [],
    },
    languages: Array.isArray(contentCreation.languages)
      ? contentCreation.languages.map((lang) =>
          typeof lang === "object" ? lang : { name: lang, level: "Fluent" }
        )
      : [],
    availability: availability || {},
    rates: rates || {},
    recentCampaigns: Array.isArray(brand.recentCampaigns)
      ? brand.recentCampaigns
      : [],
    equipment: Array.isArray(contentCreation.equipment)
      ? contentCreation.equipment
      : [],
    editingSoftware: Array.isArray(contentCreation.editingSoftware)
      ? contentCreation.editingSoftware
      : [],
  };

  const monthlyReach = Object.values(platforms)
    .filter((platform) => platform.handle)
    .map((platform) => Number(platform.followers) || 0)
    .reduce((sum, count) => sum + count, 0);

  const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) {
      return "0";
    }
    if (num >= 1000000) {
      return num / 1000000 + "M";
    }
    if (num >= 1000) {
      return num / 1000 + "K";
    }
    return num.toString();
  };
  const isOwnProfile = profile?.userProfile?.id === user?.id;
  const accountRestricted = profile?.restricted;
  const style = getCompletionCateogryStyle(profile?.completion?.category);
  const [hasError, setHasError] = useState(false);

  const imageSrc = isOwnProfile
    ? user?.coverImage
    : profile?.userProfile?.coverImage;

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
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="relative w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage
                    className="object-cover"
                    src={
                      isOwnProfile ? user?.image : profile?.userProfile?.image
                    }
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                  <AvatarFallback className="text-3xl">
                    {influencer.name
                      .split(" ")
                      .map((n) => n[0] || "")
                      .join("")
                      .toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>

                {isOwnProfile && <UploadImageModal />}
                {influencer.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 w-8 h-8 text-blue-500 bg-white rounded-full" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {influencer.name}
                      </h1>
                      <Badge className={style?.className}>
                        {profile?.completion?.category}
                      </Badge>
                      {influencer.verified && (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mt-1">
                      {influencer.title}
                    </p>
                    <p className="text-purple-600 font-medium mt-1">
                      {influencer.niche}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {influencer.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {formatDate(profile?.createdAt)}
                      </div>
                    </div>
                    {influencer.languages.length > 0 && (
                      <div className="my-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">
                            Content Languages:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {influencer.languages.map((lang, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {capitalizeInitials(lang.language)} ({lang.level})
                            </Badge>
                          ))}
                        </div>
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
                          influencerType={profile?.influencerType}
                        />
                        <ProfileActionsMenu />
                      </>
                    )}
                  </div>
                </div>
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
                    complete. Fill in the missing details to unlock <b>Pro</b>{" "}
                    status.
                  </div>
                )}

                {/* Key Stats */}
                {!accountRestricted && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatNumber(influencer.stats.totalFollowers)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Followers
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {influencer.stats.avgEngagement}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg Engagement
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatNumber(monthlyReach)}
                      </div>
                      <div className="text-sm text-gray-600">Monthly Reach</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {influencer.stats.brandPartnerships}
                      </div>
                      <div className="text-sm text-gray-600">
                        Brand Partners
                      </div>
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
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {influencer.bio}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      <a href="#" className="text-blue-600 hover:underline">
                        {influencer.website}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{influencer.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{influencer.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Instagram */}
                    {influencer?.socialStats?.instagram?.followers && (
                      <a
                        href={influencer.socialStats.instagram.link}
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
                                influencer.socialStats.instagram.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {influencer.socialStats.instagram.engagement}%
                          </div>
                          <div className="text-xs text-gray-500">
                            engagement
                          </div>
                        </div>
                      </a>
                    )}

                    {/* YouTube */}
                    {influencer?.socialStats?.youtube?.subscribers && (
                      <a
                        href={influencer.socialStats.youtube.link}
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
                                influencer.socialStats.youtube.subscribers
                              )}{" "}
                              subscribers
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {formatNumber(
                              influencer.socialStats.youtube.avgViews
                            )}
                          </div>
                          <div className="text-xs text-gray-500">avg views</div>
                        </div>
                      </a>
                    )}

                    {/* Twitter */}
                    {influencer?.socialStats?.twitter?.followers && (
                      <a
                        href={influencer.socialStats.twitter.link}
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
                                influencer.socialStats.twitter.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {influencer.socialStats.twitter.engagement}%
                          </div>
                          <div className="text-xs text-gray-500">
                            engagement
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(influencer.availability).map(
                      ([key, available]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </span>
                          {available ? (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not Available</Badge>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm mb-3">Starting Rates</h4>
                    <div className="space-y-2 text-sm">
                      {influencer.rates.instagramPost !== "" && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Instagram Post:</span>
                          <span className="font-medium">
                            {influencer.rates.instagramPost}
                          </span>
                        </div>
                      )}
                      {influencer.rates.instagramStory !== "" && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Instagram Story:
                          </span>
                          <span className="font-medium">
                            {influencer.rates.instagramStory}
                          </span>
                        </div>
                      )}

                      {influencer.rates.youtubeIntegration !== "" && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            YouTube Integration:
                          </span>
                          <span className="font-medium">
                            {influencer.rates.youtubeIntegration}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
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
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 relative z-10 mb-4 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger
                    value="my posts"
                    className="data-[state=active]:bg-background"
                  >
                    {isOwnProfile ? "My Posts" : "Posts"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-background"
                  >
                    Recent Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="campaigns"
                    className="data-[state=active]:bg-background"
                  >
                    Campaigns
                  </TabsTrigger>
                  <TabsTrigger
                    value="audience"
                    className="data-[state=active]:bg-background"
                  >
                    Audience
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="my posts">
                  {isOwnProfile && <PostInputSection />}
                  <MyPostsSection profileId={profile?.userProfile?.id} />
                </TabsContent>
                <TabsContent value="content" className="mt-6">
                  <UploadRecentContent isOwnProfile={isOwnProfile} />
                  <RecentContent isOwnProfile={isOwnProfile} />
                </TabsContent>

                <TabsContent value="campaigns" className="mt-6">
                  <UploadCampaignForm isOwnProfile={isOwnProfile} />
                  <CampaignTab isOwnProfile={isOwnProfile} />
                </TabsContent>
                <TabsContent value="audience" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Age Demographics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {influencer.demographics.ageGroups.map(
                            (group, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{group.range} years</span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Gender Split</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Female</span>
                              <span>
                                {influencer.demographics.genderSplit.female}%
                              </span>
                            </div>
                            <Progress
                              value={influencer.demographics.genderSplit.female}
                              className="h-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Male</span>
                              <span>
                                {influencer.demographics.genderSplit.male}%
                              </span>
                            </div>
                            <Progress
                              value={influencer.demographics.genderSplit.male}
                              className="h-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Other</span>
                              <span>
                                {influencer.demographics.genderSplit.other}%
                              </span>
                            </div>
                            <Progress
                              value={influencer.demographics.genderSplit.other}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Top Audience Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {influencer.demographics.topLocations.map(
                          (location, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1"
                            >
                              {location}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
