"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function ComedianProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("shows");

  const comedian = {
    name: "Maria Santos",
    title: "Stand-Up Comedian & Comedy Writer",
    location: "New York, NY",
    joinDate: "March 2018",
    website: "mariasantoscomedy.com",
    email: "booking@mariasantoscomedy.com",
    phone: "+1 (555) 987-6543",
    bio: "Observational comedian with a focus on millennial struggles, family dynamics, and the absurdity of modern life. Regular at Comedy Cellar, Gotham Comedy Club, and featured on Comedy Central. Available for corporate events, private shows, and comedy writing.",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=1200",
    verified: true,

    stats: {
      showsPerformed: 450,
      yearsActive: 6,
      avgAudienceSize: 200,
      totalAudience: 90000,
      specialsReleased: 2,
      clubsPerformed: 35,
    },

    socialStats: {
      instagram: { followers: 125000, verified: true },
      twitter: { followers: 89000, verified: false },
      youtube: { subscribers: 45000, verified: false },
      tiktok: { followers: 230000, verified: false },
    },

    comedyStyle: [
      "Observational",
      "Self-Deprecating",
      "Storytelling",
      "Social Commentary",
      "Family Humor",
    ],

    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Native" },
      { name: "Portuguese", level: "Conversational" },
    ],

    availability: {
      standup: true,
      corporate: true,
      writing: true,
      podcasts: true,
      private: true,
    },

    rates: {
      standup: "$2,500-5,000",
      corporate: "$5,000-10,000",
      writing: "$150/hour",
      podcast: "$500-1,000",
      private: "$1,500-3,000",
    },

    venues: [
      "Comedy Cellar",
      "Gotham Comedy Club",
      "The Stand NYC",
      "Caroline's on Broadway",
      "Helium Comedy Club",
      "Funny or Die",
    ],
  };

  const upcomingShows = [
    {
      venue: "Comedy Cellar",
      date: "Dec 15, 2024",
      time: "9:30 PM",
      location: "New York, NY",
      ticketPrice: "$25",
      status: "Available",
    },
    {
      venue: "Gotham Comedy Club",
      date: "Dec 22, 2024",
      time: "8:00 PM",
      location: "New York, NY",
      ticketPrice: "$30",
      status: "Selling Fast",
    },
    {
      venue: "Helium Comedy Club",
      date: "Jan 5, 2025",
      time: "7:30 PM",
      location: "Philadelphia, PA",
      ticketPrice: "$35",
      status: "Available",
    },
    {
      venue: "Funny or Die Presents",
      date: "Jan 12, 2025",
      time: "10:00 PM",
      location: "Los Angeles, CA",
      ticketPrice: "$40",
      status: "VIP Available",
    },
  ];

  const recentSets = [
    {
      title: "Millennial Problems",
      venue: "Comedy Cellar",
      date: "Nov 28, 2024",
      duration: "15 min",
      audience: 180,
      rating: 4.8,
    },
    {
      title: "Family Dinner Disasters",
      venue: "The Stand NYC",
      date: "Nov 20, 2024",
      duration: "20 min",
      audience: 220,
      rating: 4.9,
    },
    {
      title: "Dating in Your 30s",
      venue: "Gotham Comedy Club",
      date: "Nov 15, 2024",
      duration: "18 min",
      audience: 250,
      rating: 4.7,
    },
  ];

  const achievements = [
    {
      title: "Comedy Central Featured",
      year: "2023",
      description: "Stand-up special featured",
    },
    {
      title: "NYC Comedy Festival",
      year: "2022",
      description: "Best Newcomer Award",
    },
    {
      title: "Gotham Comedy Club Regular",
      year: "2021",
      description: "Weekly performer status",
    },
    {
      title: "Comedy Cellar Approved",
      year: "2020",
      description: "Regular performer",
    },
  ];

  const mediaAppearances = [
    {
      show: "The Tonight Show Starring Jimmy Fallon",
      type: "Stand-up Performance",
      date: "Oct 2024",
      views: "2.1M",
    },
    {
      show: "Comedy Central Presents",
      type: "Half-Hour Special",
      date: "Aug 2024",
      views: "850K",
    },
    {
      show: "Joe Rogan Experience",
      type: "Podcast Guest",
      date: "Jun 2024",
      views: "1.8M",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        <img
          src={comedian.coverImage || "/placeholder.svg"}
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
                  <AvatarImage src={comedian.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-3xl">MS</AvatarFallback>
                </Avatar>
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
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-transparent"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      Book Show
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="w-4 h-4" />
                    </Button>
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
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{comedian.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{comedian.phone}</span>
                  </div>
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
                  <div className="flex items-center justify-between p-2 rounded-lg bg-pink-50">
                    <div className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span className="text-sm font-medium">Instagram</span>
                      {comedian.socialStats.instagram.verified && (
                        <Star className="w-3 h-3 text-pink-500 fill-pink-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-pink-600">
                        {(
                          comedian.socialStats.instagram.followers / 1000
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
                        {(comedian.socialStats.tiktok.followers / 1000).toFixed(
                          0
                        )}
                        K
                      </div>
                      <div className="text-xs text-gray-300">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Twitter className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium">Twitter/X</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-700">
                        {(
                          comedian.socialStats.twitter.followers / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2">
                      <Youtube className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">YouTube</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-red-600">
                        {(
                          comedian.socialStats.youtube.subscribers / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-xs text-gray-500">subscribers</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">
                      {(
                        (comedian.socialStats.instagram.followers +
                          comedian.socialStats.twitter.followers +
                          comedian.socialStats.youtube.subscribers +
                          comedian.socialStats.tiktok.followers) /
                        1000
                      ).toFixed(0)}
                      K
                    </div>
                    <div className="text-xs text-gray-600">Total Following</div>
                  </div>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stand-up Shows</span>
                    <Badge className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Corporate Events</span>
                    <Badge className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Private Shows</span>
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
                      <span className="text-gray-600">Stand-up:</span>
                      <span className="font-medium">
                        {comedian.rates.standup}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Corporate:</span>
                      <span className="font-medium">
                        {comedian.rates.corporate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Private:</span>
                      <span className="font-medium">
                        {comedian.rates.private}
                      </span>
                    </div>
                  </div>
                </div>

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
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
                <TabsTrigger value="recent">Recent Sets</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="shows">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Upcoming Shows</h2>
                  <Badge variant="outline">Next 30 days</Badge>
                </div>

                <div className="space-y-4">
                  {upcomingShows.map((show, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {show.venue}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {show.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {show.time}
                              </div>
                              <div className="flex items-center">
                                <LocationIcon className="w-4 h-4 mr-1" />
                                {show.location}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-yellow-600">
                              {show.ticketPrice}
                            </div>
                            <Badge
                              variant={
                                show.status === "Selling Fast"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="mt-1"
                            >
                              {show.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Recent Performances
                  </h2>
                  <p className="text-gray-600">
                    Latest stand-up sets and audience feedback
                  </p>
                </div>

                <div className="space-y-4">
                  {recentSets.map((set, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {set.title}
                            </h3>
                            <p className="text-gray-600">{set.venue}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{set.date}</span>
                              <span>{set.duration}</span>
                              <span>{set.audience} audience</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-bold">{set.rating}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              audience rating
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Media Appearances</h2>
                  <p className="text-gray-600">
                    TV shows, podcasts, and online content
                  </p>
                </div>

                <div className="space-y-4">
                  {mediaAppearances.map((media, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {media.show}
                            </h3>
                            <p className="text-gray-600">{media.type}</p>
                            <p className="text-sm text-gray-500">
                              {media.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600">
                              {media.views}
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
                    Career Achievements
                  </h2>
                  <p className="text-gray-600">
                    Awards, recognition, and career milestones
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
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
