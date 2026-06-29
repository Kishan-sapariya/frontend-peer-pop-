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
  Linkedin,
} from "lucide-react";
import { useYoutubeStore } from "@/store/useYoutubeStore";
import { useParams } from "next/navigation";
import {
  capitalizeInitials,
  formatNumber,
  getCompletionCateogryStyle,
} from "@/utils/formatDate";
import RecentContent from "@/component/youtube profile/RecentContent";
import UploadImageModal from "../../../../component/profile/UploadImageModal";
import { useAuthStore } from "@/store/useAuthStore";
import CollaborationTab from "@/component/youtube profile/CollaborationTab";
import AchievementTab from "@/component/youtube profile/AchievementTab";
import ShareDialog from "@/component/ShareDialog";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import ProfileCompletionBanner from "@/component/profile/ProfileCompletionBanner";
import PrivateAccountUI from "@/component/PrivateAccountUI";
import PostInputSection from "@/component/feeds/PostInputSection";
import YouTubeConnectToast from "@/component/youtube profile/YoutubeConnectToast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const safeStats = stats || {};
  // YouTube stats only exist once the channel is connected via OAuth (the
  // backend only creates a YouTubeStats row from the connect/cron flow), so an
  // empty object means "not connected yet".
  const hasYoutubeStats = Object.keys(safeStats).length > 0;

  // Kick off the existing YouTube OAuth flow, returning to this profile after.
  const handleConnectYouTube = () => {
    const redirect =
      typeof window !== "undefined" ? window.location.pathname : "";
    window.location.href = `${
      process.env.NEXT_PUBLIC_BASE_API_URL
    }/youtube/auth?redirect=${encodeURIComponent(redirect)}`;
  };

  const avgViews =
    (Number(safeStats.totalViews) || 0) /
    Math.max(1, Number(safeStats.videoCount) || 1);

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
    location: (() => {
      if (!personalInfo.state) return "Location not specified";

      const city =
        personalInfo.city === "Other"
          ? personalInfo.customCity
          : personalInfo.city;

      return city ? `${personalInfo.state}, ${city}` : personalInfo.state;
    })(),
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
        link: socialMedia.links?.youtube,
        subscribers: statistics.subscriberCount || 0,
        verified: channelInfo.verified || false,
      },
      instagram: {
        link: socialMedia.links?.instagram,
        followers: socialStats.instagram || 0,
        verified: false,
      },
      twitter: {
        link: socialMedia.links?.twitter,
        followers: socialStats.twitter || 0,
        verified: false,
      },
      linkedin: {
        link: socialMedia.links?.linkedin,
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
      : [],
  };

  const getStatValue = (primary, fallback) => {
    return primary !== undefined && primary !== null && primary !== ""
      ? primary
      : fallback;
  };

  const accountRestricted = profile?.restricted;
  const style = getCompletionCateogryStyle(profile?.completion?.category);

  const isOwnProfile = profile?.userProfile?.id === user?.id;

  const [hasError, setHasError] = useState(false);

  const imageSrc =
    (isOwnProfile ? user?.coverImage : profile?.userProfile?.coverImage) ||
    personalInfo.coverImage;

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);
  useEffect(() => {
    if (!imageSrc) {
      setHasError(true);
    }
  }, [imageSrc]);

  return (
    <div className="min-h-screen bg-gray-50 relative -mt-16">
      {/* Refetches stats + toasts success after returning from YouTube OAuth */}
      <YouTubeConnectToast />
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="relative w-40 h-40 border-4 border-white shadow-xl cursor-pointer hover:opacity-90 transition-opacity">
                      <AvatarImage
                        className="object-cover"
                        alt={creator.name}
                        src={
                          (isOwnProfile
                            ? user?.image
                            : profile?.userProfile?.image) ||
                          personalInfo.profileImage
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
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-transparent border-none shadow-none flex justify-center items-center">
                    <DialogTitle className="sr-only">
                      Profile Picture
                    </DialogTitle>
                    <Avatar className="w-64 h-64 sm:w-96 sm:h-96 border-4 border-white shadow-2xl">
                      <AvatarImage
                        className="object-cover"
                        alt={creator.name}
                        src={
                          (isOwnProfile
                            ? user?.image
                            : profile?.userProfile?.image) ||
                          personalInfo.profileImage
                        }
                      />
                      <AvatarFallback className="text-6xl">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0] || "")
                          .join("")
                          .toUpperCase() || "C"}
                      </AvatarFallback>
                    </Avatar>
                  </DialogContent>
                </Dialog>
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
                        {capitalizeInitials(profile?.userProfile?.username)}{" "}
                      </h1>
                      <Badge className={style?.className}>
                        {profile?.completion?.category}
                      </Badge>
                      {safeStats && Object.keys(safeStats).length > 0 && (
                        <Badge className="bg-red-500">YouTube Verified</Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-xl text-gray-600 mb-1 flex-wrap">
                      {/* Creator Title */}
                      <p className="mr-2 mb-1 sm:mb-0 whitespace-nowrap">
                        {creator.title}
                        {creator.contentCategories.length > 0 ? " -" : ""}
                      </p>

                      {creator.contentCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {creator.contentCategories.map((category, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="py-1 px-3 text-[14px]"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {creator.channel && (
                      <a
                        href={`https://youtube.com/${
                          creator.channel.startsWith("@") ? "" : "@"
                        }${creator.channel}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-red-600 font-medium mb-3 hover:underline"
                      >
                        {creator.channel}
                      </a>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      {creator.location &&
                        creator.location !== "Location not specified" && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {capitalizeInitials(creator.location)}
                          </div>
                        )}
                      {creator.joinDate &&
                        creator.joinDate !== "Not specified" && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Creating since {creator.joinDate}
                          </div>
                        )}
                      {creator.stats.videos > 0 && (
                        <div className="flex items-center">
                          <Video className="w-4 h-4 mr-1" />
                          {creator.stats.videos} videos
                        </div>
                      )}
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
                    <ProfileCompletionBanner
                      completion={profile?.completion}
                      isOwner={isOwnProfile}
                    />
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
                {!accountRestricted &&
                  (isOwnProfile || profileData?.preferences?.publicStats) && (
                  <div className="mt-8 pt-6 border-t">
                    {/* Slim connect prompt — owner only, until the channel is
                        linked. The stats below stay visible either way so any
                        manually-entered data is never hidden. */}
                    {isOwnProfile && !hasYoutubeStats && (
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2">
                        <span className="flex items-center gap-2 text-xs text-gray-600">
                          <Youtube className="h-4 w-4 shrink-0 text-red-600" />
                          Connect YouTube to auto-import live subscriber &amp;
                          view stats.
                        </span>
                        <Button
                          onClick={handleConnectYouTube}
                          size="sm"
                          className="h-7 shrink-0 rounded-full bg-red-600 px-3 text-xs text-white hover:bg-red-700"
                        >
                          <Youtube className="mr-1.5 h-3.5 w-3.5" />
                          Connect
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Public Stats Section */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">
                          {formatNumber(
                            getStatValue(
                              safeStats.subscriberCount,
                              profileData.statistics?.subscriberCount
                            )
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Subscribers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">
                          {formatNumber(
                            getStatValue(
                              safeStats.totalViews,
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

              {/* Content */}
              {(contentInfo.primaryNiche ||
                (Array.isArray(contentInfo.contentStyle) &&
                  contentInfo.contentStyle.length > 0) ||
                contentInfo.uploadFrequency ||
                contentInfo.videoLength) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Boxes className="w-5 h-5 mr-2" />
                      Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contentInfo.primaryNiche && (
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                          Primary Niche
                        </p>
                        <Badge variant="secondary">
                          {contentInfo.primaryNiche}
                        </Badge>
                      </div>
                    )}
                    {Array.isArray(contentInfo.contentStyle) &&
                      contentInfo.contentStyle.length > 0 && (
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                            Content Style
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {contentInfo.contentStyle.map((style, i) => (
                              <Badge key={i} variant="secondary">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {contentInfo.uploadFrequency && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Upload Frequency</span>
                        <span className="font-medium text-gray-900">
                          {contentInfo.uploadFrequency}
                        </span>
                      </div>
                    )}
                    {contentInfo.videoLength && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Avg Video Length</span>
                        <span className="font-medium text-gray-900">
                          {contentInfo.videoLength}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Social Media Reach */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Instagram */}
                    {creator.socialStats.instagram.followers > 0 && (
                      <a
                        href={creator.socialStats.instagram.link}
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
                                creator.socialStats.instagram.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* YouTube */}
                    {creator.socialStats.youtube.subscribers > 0 && (
                      <a
                        href={creator.socialStats.youtube.link}
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
                                creator.socialStats.youtube.subscribers
                              )}{" "}
                              subscribers
                            </div>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* LinkedIn */}
                    {creator.socialStats.linkedin.followers > 0 && (
                      <a
                        href={creator.socialStats.linkedin.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <Linkedin className="w-6 h-6 text-sky-600" />
                          <div>
                            <div className="font-medium">LinkedIn</div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(
                                creator.socialStats.linkedin.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* Twitter */}
                    {creator.socialStats.twitter.followers > 0 && (
                      <a
                        href={creator.socialStats.twitter.link}
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
                                creator.socialStats.twitter.followers
                              )}{" "}
                              followers
                            </div>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

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
                <TabsList className="grid w-full grid-cols-4 mb-6 h-auto gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1 shadow-sm [&_[data-slot=tabs-trigger]]:rounded-lg [&_[data-slot=tabs-trigger]]:py-2 [&_[data-slot=tabs-trigger]]:border-0 [&_[data-slot=tabs-trigger]]:focus-visible:ring-0 [&_[data-slot=tabs-trigger]]:focus-visible:outline-none [&_[data-slot=tabs-trigger]]:focus-visible:ring-offset-0">
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
