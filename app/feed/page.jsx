"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Home, TrendingUp, ChevronDown } from "lucide-react";
import UserDetailsCard from "@/component/feeds/UserDetailsCard";
import PostInputSection from "@/component/feeds/PostInputSection";
import FeedsPostSections from "@/component/feeds/FeedsPostSections";
import MyPeerFeedSection from "@/component/feeds/MyPeerFeedSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function HomeFeed() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter states
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPostTypes, setSelectedPostTypes] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0, 50000]);
  const [experienceRange, setExperienceRange] = useState([0, 15]);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [isRemoteWork, setIsRemoteWork] = useState(false);
  const [isUrgentOnly, setIsUrgentOnly] = useState(false);

  // Social Media specific filters
  const [subscriberRange, setSubscriberRange] = useState([0, 10000000]);
  const [engagementRange, setEngagementRange] = useState([0, 20]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedContentCategories, setSelectedContentCategories] = useState(
    []
  );

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "COLLABORATION":
        return "Collab Posts";
      case "OPPORTUNITY":
        return "Job Posts";
      case "SHOWCASE":
        return "Project Posts";
      case "GENERAL":
        return "General Posts";
      default:
        return "All Posts";
    }
  };
  const getActiveFilterCount = () => {
    return (
      selectedProfessions.length +
      selectedLocations.length +
      selectedTiers.length +
      selectedAvailability.length +
      selectedPostTypes.length +
      selectedSkills.length +
      selectedPlatforms.length +
      selectedContentCategories.length +
      (isVerifiedOnly ? 1 : 0) +
      (isRemoteWork ? 1 : 0) +
      (isUrgentOnly ? 1 : 0) +
      (budgetRange[0] !== 0 || budgetRange[1] !== 50000 ? 1 : 0) +
      (experienceRange[0] !== 0 || experienceRange[1] !== 15 ? 1 : 0) +
      (subscriberRange[0] !== 0 || subscriberRange[1] !== 10000000 ? 1 : 0) +
      (engagementRange[0] !== 0 || engagementRange[1] !== 20 ? 1 : 0)
    );
  };
  const suggestions = [
    {
      name: "David Kim",
      profession: "Motion Graphics Designer",
      avatar: "/?height=50&width=50&text=DK",
      mutualConnections: 8,
      location: "Austin, TX",
      tier: "Elite",
      specialty: "Motion Graphics & Animation",
      availability: "Available Now",
      skills: ["After Effects", "Cinema 4D", "Motion Design"],
      portfolio: "davidkim.motion",
      recentWork: "Nike Commercial Animation",
    },
    {
      name: "Sofia Martinez",
      profession: "Voice Actor & Audio Producer",
      avatar: "/?height=50&width=50&text=SM",
      mutualConnections: 15,
      location: "Miami, FL",
      tier: "Rising",
      specialty: "Commercial VO & Podcast Production",
      availability: "Available This Week",
      skills: ["Voice Acting", "Audio Editing", "Podcast Production"],
      languages: ["English", "Spanish", "Portuguese"],
      recentWork: "Spotify Podcast Series",
    },
    {
      name: "Taylor Swift",
      profession: "Content Creator & Strategist",
      avatar: "/?height=50&width=50&text=TS",
      mutualConnections: 20,
      location: "Nashville, TN",
      tier: "Elite",
      specialty: "Social Media Strategy & Content",
      availability: "Available Now",
      skills: ["Content Strategy", "Social Media", "Brand Development"],
      clients: ["Major Record Labels", "Fashion Brands"],
      recentWork: "Grammy Awards Social Campaign",
    },
  ];

  const trendingTopics = [
    {
      tag: "#CreativeCollabs",
      posts: "2.1k",
      trend: "up",
      category: "Collaboration",
    },
    {
      tag: "#InfluencerMarketing",
      posts: "1.8k",
      trend: "up",
      category: "Marketing",
    },
    { tag: "#FilmFestival2024", posts: "1.2k", trend: "up", category: "Film" },
    {
      tag: "#SustainableDesign",
      posts: "956",
      trend: "up",
      category: "Design",
    },
    { tag: "#MusicCollabs", posts: "642", trend: "stable", category: "Music" },
    {
      tag: "#CreativeJobs",
      posts: "534",
      trend: "up",
      category: "Opportunities",
    },
    { tag: "#DigitalArt", posts: "423", trend: "stable", category: "Art" },
    { tag: "#PodcastProduction", posts: "312", trend: "up", category: "Audio" },
  ];

  const activeFilterCount = getActiveFilterCount();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:sticky lg:top-25 lg:self-start">
            <UserDetailsCard />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-blue-200">
              <div className="flex items-center space-x-1 md:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-4 ">
                  {/* Home Button */}
                  <Button
                    variant={activeNav === "home" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveNav("home")}
                    className={`text-[15px] ${
                      activeNav === "home"
                        ? " bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "hover:bg-cyan-100 text-gray-700"
                    }`}
                  >
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </Button>

                  {/* My Peers Button */}
                  <Button
                    variant={activeNav === "peers" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveNav("peers")}
                    className={`text-[15px] ${
                      activeNav === "peers"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "hover:bg-cyan-100 text-gray-700"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    My Peers
                  </Button>

                  {/* Filter Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[15px] hover:bg-blue-50 text-gray-700"
                      >
                        {getFilterLabel()}
                        <ChevronDown className="w-4 h-4 ml-1 sm:ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-1">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            activeFilter === "all"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveFilter("all");
                          }}
                        >
                          All Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            activeFilter === "COLLABORATION"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveFilter("COLLABORATION");
                          }}
                        >
                          Collab Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            activeFilter === "OPPORTUNITY"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveFilter("OPPORTUNITY");
                          }}
                        >
                          Job Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            activeFilter === "SHOWCASE"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveFilter("SHOWCASE");
                          }}
                        >
                          Showcase work Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            activeFilter === "GENERAL"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveFilter("GENERAL");
                          }}
                        >
                          General Posts
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Post Creation */}
            <PostInputSection />

            {/* Feed Posts */}
            {activeNav === "home" ? (
              <FeedsPostSections activeFilter={activeFilter} />
            ) : (
              <MyPeerFeedSection activeFilter={activeFilter} />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="hidden lg:block border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-bold text-sm text-gray-800">
                  Suggested Peers
                </h3>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10 border-2 border-blue-200">
                        <AvatarImage src={suggestion.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-600 text-white text-xs">
                          {suggestion.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          <h4 className="font-medium text-xs text-gray-800 truncate">
                            {suggestion.name}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              suggestion.tier === "Elite"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                : suggestion.tier === "Pro"
                                ? "bg-gradient-to-r from-blue-500 to-sky-600 text-white"
                                : "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                            }`}
                          >
                            {suggestion.tier}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {suggestion.profession}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {suggestion.mutualConnections} mutual connections
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white text-xs h-7"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Trending Topics */}
            <Card className="hidden lg:block border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-bold text-sm text-gray-800">
                  Trending Topics
                </h3>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-xs text-blue-600">
                          {topic.tag}
                        </div>
                        <div className="text-xs text-gray-500">
                          {topic.posts} posts
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {topic.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-blue-500" />
                        ) : (
                          <div className="w-3 h-3" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {topic.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
