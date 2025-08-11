"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  MessageCircle,
  UserPlus,
  Play,
  Eye,
  ThumbsUp,
  Clock,
  TrendingUp,
  Video,
  Mic,
  Camera,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";

export default function YouTuberProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const creator = {
    name: "Alex Rivera",
    title: "Tech YouTuber & Content Creator",
    channel: "@TechWithAlex",
    location: "Los Angeles, CA",
    joinDate: "January 2019",
    website: "techwithAlex.com",
    email: "collab@techwithAlex.com",
    bio: "Making technology accessible to everyone through engaging tutorials, reviews, and behind-the-scenes content. Passionate about helping creators grow their channels and build sustainable businesses.",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=1200",
    verified: true,

    stats: {
      subscribers: 2400000,
      totalViews: 180000000,
      videos: 450,
      avgViews: 400000,
      monthlyViews: 12000000,
      watchTime: 8500000, // hours
    },

    socialStats: {
      youtube: { subscribers: 2400000, verified: true },
      instagram: { followers: 850000, verified: true },
      twitter: { followers: 420000, verified: true },
      tiktok: { followers: 1200000, verified: false },
      twitch: { followers: 180000, verified: false },
      linkedin: { followers: 95000, verified: false },
    },

    contentCategories: [
      { name: "Tech Reviews", percentage: 35, videos: 158 },
      { name: "Tutorials", percentage: 25, videos: 113 },
      { name: "Unboxing", percentage: 20, videos: 90 },
      { name: "Behind the Scenes", percentage: 12, videos: 54 },
      { name: "Collaborations", percentage: 8, videos: 35 },
    ],

    equipment: [
      "Sony FX3 Camera",
      "Canon RF 24-70mm f/2.8",
      "Rode PodMic",
      "Shure SM7B",
      "Aputure 300D II",
      "DaVinci Resolve",
      "Final Cut Pro",
      "Adobe After Effects",
    ],

    availability: {
      sponsorships: true,
      collaborations: true,
      consulting: true,
      speaking: true,
    },

    rates: {
      sponsorship: "$15,000-25,000",
      collaboration: "Revenue Share",
      consulting: "$200/hour",
      speaking: "$5,000-10,000",
    },

    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
      { name: "Portuguese", level: "Conversational" },
    ],
  };

  const recentVideos = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Review: Is It Worth the Upgrade?",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: 1200000,
      likes: 45000,
      duration: "12:34",
      uploadDate: "3 days ago",
      category: "Tech Reviews",
    },
    {
      id: 2,
      title: "How I Built My Dream Studio Setup for Under $5000",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: 850000,
      likes: 38000,
      duration: "18:45",
      uploadDate: "1 week ago",
      category: "Behind the Scenes",
    },
    {
      id: 3,
      title: "Complete YouTube Automation Guide 2024",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: 2100000,
      likes: 89000,
      duration: "25:12",
      uploadDate: "2 weeks ago",
      category: "Tutorials",
    },
    {
      id: 4,
      title: "Unboxing the Most Expensive Gaming Setup Ever",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: 950000,
      likes: 42000,
      duration: "15:23",
      uploadDate: "3 weeks ago",
      category: "Unboxing",
    },
  ];

  const collaborations = [
    {
      creator: "TechGuru Mike",
      project: "Ultimate Gaming Setup Battle",
      views: 3200000,
      date: "2 months ago",
    },
    {
      creator: "Sarah's Tech Corner",
      project: "Best Budget Laptops 2024",
      views: 1800000,
      date: "4 months ago",
    },
    {
      creator: "Digital Nomad Dave",
      project: "Creator Economy Deep Dive",
      views: 950000,
      date: "6 months ago",
    },
  ];

  const achievements = [
    {
      title: "YouTube Silver Play Button",
      year: "2020",
      milestone: "100K Subscribers",
    },
    {
      title: "YouTube Gold Play Button",
      year: "2021",
      milestone: "1M Subscribers",
    },
    {
      title: "Creator Economy Award",
      year: "2023",
      milestone: "Best Tech Channel",
    },
    {
      title: "Streamy Awards Nomination",
      year: "2023",
      milestone: "Tech Category",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
        <img
          src={creator.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-3xl">AR</AvatarFallback>
                </Avatar>
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
                        {creator.name}
                      </h1>
                      {creator.verified && (
                        <Badge className="bg-red-500">YouTube Verified</Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-1">
                      {creator.title}
                    </p>
                    <p className="text-lg text-red-600 font-medium mb-3">
                      {creator.channel}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {creator.location}
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
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
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
                    <Button variant="outline" size="lg">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* YouTube Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {(creator.stats.subscribers / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {(creator.stats.totalViews / 1000000).toFixed(0)}M
                    </div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {(creator.stats.avgViews / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Avg Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {(creator.stats.watchTime / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">Watch Hours</div>
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
                  {creator.bio}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <a
                      href={`https://${creator.website}`}
                      className="text-blue-600 hover:underline"
                    >
                      {creator.website}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{creator.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Reach */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">YouTube</span>
                      {creator.socialStats.youtube.verified && (
                        <Star className="w-3 h-3 text-red-500 fill-red-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-red-600">
                        {(
                          creator.socialStats.youtube.subscribers / 1000000
                        ).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs text-gray-500">subscribers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-pink-50">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-pink-600" />
                      <span className="text-sm font-medium">Instagram</span>
                      {creator.socialStats.instagram.verified && (
                        <Star className="w-3 h-3 text-pink-500 fill-pink-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-pink-600">
                        {(
                          creator.socialStats.instagram.followers / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-white">
                        TikTok
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">
                        {(
                          creator.socialStats.tiktok.followers / 1000000
                        ).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs text-gray-300">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50">
                    <div className="flex items-center space-x-2">
                      <Mic className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Twitch</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-purple-600">
                        {(creator.socialStats.twitch.followers / 1000).toFixed(
                          0
                        )}
                        K
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-purple-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {(
                        creator.socialStats.youtube.subscribers +
                        creator.socialStats.instagram.followers +
                        creator.socialStats.twitter.followers +
                        creator.socialStats.tiktok.followers +
                        creator.socialStats.twitch.followers / 1000000
                      ).toFixed(1)}
                      M
                    </div>
                    <div className="text-xs text-gray-600">Total Reach</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="font-medium">Content Breakdown</CardTitle>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sponsorships</span>
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

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-sm mb-3">Rates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sponsorship:</span>
                      <span className="font-medium">
                        {creator.rates.sponsorship}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consulting:</span>
                      <span className="font-medium">
                        {creator.rates.consulting}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speaking:</span>
                      <span className="font-medium">
                        {creator.rates.speaking}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Send Proposal
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
                <TabsTrigger value="content">Recent Content</TabsTrigger>
                <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Recent Videos</h2>
                  <Badge variant="outline">
                    {creator.stats.videos} total videos
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentVideos.map((video) => (
                    <Card
                      key={video.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary">{video.category}</Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="lg"
                            className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700"
                          >
                            <Play className="w-6 h-6 fill-white" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {(video.views / 1000000).toFixed(1)}M
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {(video.likes / 1000).toFixed(0)}K
                            </div>
                          </div>
                          <span>{video.uploadDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="collaborations">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Recent Collaborations
                  </h2>
                  <p className="text-gray-600">
                    Successful partnerships with other creators
                  </p>
                </div>

                <div className="space-y-4">
                  {collaborations.map((collab, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {collab.project}
                            </h3>
                            <p className="text-gray-600">
                              with {collab.creator}
                            </p>
                            <p className="text-sm text-gray-500">
                              {collab.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">
                              {(collab.views / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-gray-600">views</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Achievements & Milestones
                  </h2>
                  <p className="text-gray-600">
                    Recognition and platform milestones
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {achievement.milestone}
                            </p>
                            <p className="text-xs text-gray-500">
                              {achievement.year}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
