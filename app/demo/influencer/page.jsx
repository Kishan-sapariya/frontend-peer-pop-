"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Share2,
  MessageCircle,
  UserPlus,
  Instagram,
  Youtube,
  Twitter,
  Eye,
  Heart,
  BarChart3,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function InfluencerProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const influencer = {
    name: "Emma Rodriguez",
    title: "Lifestyle & Fashion Influencer",
    niche: "Fashion, Beauty, Travel, Wellness",
    location: "Miami, FL",
    joinDate: "June 2020",
    website: "emmarodriguez.co",
    email: "partnerships@emmarodriguez.co",
    phone: "+1 (555) 234-5678",
    bio: "Lifestyle content creator passionate about sustainable fashion, wellness, and authentic living. Partnering with brands that align with my values to create meaningful content that inspires my community to live their best lives.",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=1200",
    verified: true,

    stats: {
      totalFollowers: 2850000,
      avgEngagement: 4.2,
      monthlyReach: 8500000,
      contentPieces: 1250,
      brandPartnerships: 85,
      campaignsCompleted: 120,
    },

    socialStats: {
      instagram: {
        followers: 1800000,
        verified: true,
        engagement: 4.5,
        avgLikes: 75000,
        avgComments: 2500,
      },
      tiktok: {
        followers: 850000,
        verified: true,
        engagement: 6.8,
        avgViews: 450000,
      },
      youtube: {
        subscribers: 200000,
        verified: false,
        avgViews: 125000,
      },
      twitter: {
        followers: 95000,
        verified: false,
        engagement: 2.1,
      },
    },

    contentCategories: [
      { name: "Fashion & Style", percentage: 35, posts: 438 },
      { name: "Beauty & Skincare", percentage: 25, posts: 313 },
      { name: "Travel & Lifestyle", percentage: 20, posts: 250 },
      { name: "Wellness & Fitness", percentage: 15, posts: 188 },
      { name: "Brand Collaborations", percentage: 5, posts: 61 },
    ],

    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 35 },
        { range: "25-34", percentage: 45 },
        { range: "35-44", percentage: 15 },
        { range: "45+", percentage: 5 },
      ],
      genderSplit: { female: 78, male: 20, other: 2 },
      topLocations: [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Brazil",
      ],
    },

    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Native" },
      { name: "French", level: "Conversational" },
    ],

    availability: {
      sponsoredPosts: true,
      stories: true,
      reels: true,
      youtube: true,
      events: true,
      ambassadorships: true,
    },

    rates: {
      instagramPost: "$800-2,000",
      instagramStory: "$300-600",
      tiktokVideo: "$500-1,200",
      youtubeIntegration: "$1,500-4,000",
      eventAppearance: "$3,000-8,000",
    },

    recentCampaigns: [
      {
        brand: "Sustainable Style Co.",
        type: "Instagram Post + Stories",
        date: "2024-01-15",
        engagement: "4.8%",
        reach: "125K",
      },
      {
        brand: "Wellness Brand",
        type: "TikTok Series",
        date: "2024-01-08",
        engagement: "7.2%",
        reach: "380K",
      },
      {
        brand: "Travel Company",
        type: "YouTube Integration",
        date: "2023-12-20",
        engagement: "5.1%",
        reach: "95K",
      },
    ],

    equipment: [
      "Canon EOS R5",
      "Sony A7 III",
      "Ring Light Setup",
      "Wireless Microphone",
      "Professional Tripod",
      "Backdrop Collection",
    ],

    editingSoftware: [
      "Adobe Lightroom",
      "VSCO",
      "CapCut",
      "Canva Pro",
      "Adobe Premiere Pro",
    ],
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <img
          src={influencer.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">ER</AvatarFallback>
                </Avatar>
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
                        Joined {influencer.joinDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      variant={isFollowing ? "outline" : "default"}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(influencer.stats.totalFollowers)}
                    </div>
                    <div className="text-sm text-gray-600">Total Followers</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {influencer.stats.avgEngagement}%
                    </div>
                    <div className="text-sm text-gray-600">Avg Engagement</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(influencer.stats.monthlyReach)}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Reach</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {influencer.stats.brandPartnerships}
                    </div>
                    <div className="text-sm text-gray-600">Brand Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
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
                      <div className="text-xs text-gray-500">engagement</div>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <div>
                        <div className="font-medium">TikTok</div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(
                            influencer.socialStats.tiktok.followers
                          )}{" "}
                          followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {influencer.socialStats.tiktok.engagement}%
                      </div>
                      <div className="text-xs text-gray-500">engagement</div>
                    </div>
                  </div>

                  {/* YouTube */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
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
                        {formatNumber(influencer.socialStats.youtube.avgViews)}
                      </div>
                      <div className="text-xs text-gray-500">avg views</div>
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
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
                      <div className="text-xs text-gray-500">engagement</div>
                    </div>
                  </div>
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instagram Post:</span>
                      <span className="font-medium">
                        {influencer.rates.instagramPost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instagram Story:</span>
                      <span className="font-medium">
                        {influencer.rates.instagramStory}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TikTok Video:</span>
                      <span className="font-medium">
                        {influencer.rates.tiktokVideo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        YouTube Integration:
                      </span>
                      <span className="font-medium">
                        {influencer.rates.youtubeIntegration}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {influencer.contentCategories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <div className="text-sm text-gray-600">
                              {category.posts} posts ({category.percentage}%)
                            </div>
                          </div>
                          <Progress
                            value={category.percentage}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {influencer.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {lang.name} - {lang.level}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="campaigns" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {influencer.recentCampaigns.map((campaign, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">
                                {campaign.brand}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {campaign.type}
                              </p>
                            </div>
                            <Badge variant="outline">{campaign.date}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm">
                                {campaign.engagement} engagement
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">
                                {campaign.reach} reach
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {influencer.stats.campaignsCompleted}
                        </div>
                        <div className="text-sm text-gray-600">
                          Campaigns Completed
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {influencer.stats.avgEngagement}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Avg Campaign Engagement
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          98%
                        </div>
                        <div className="text-sm text-gray-600">
                          Client Satisfaction
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                                <span>{group.percentage}%</span>
                              </div>
                              <Progress
                                value={group.percentage}
                                className="h-2"
                              />
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

              <TabsContent value="equipment" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Camera className="w-5 h-5" />
                        <span>Equipment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {influencer.equipment.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Editing Software</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {influencer.editingSoftware.map((software, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                          >
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{software}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
