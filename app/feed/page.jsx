"use client";

import { use, useEffect, useState } from "react";
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
import { useFeedStore } from "@/store/useFeedStore";
import SuggestedUsers from "@/component/feeds/SuggestedUser";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <UserDetailsCard />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-[#041049]/10">
              <div className="flex items-center space-x-1 md:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-4 ">
                  {/* Home Button */}
                  <Button
                    variant={activeNav === "home" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveNav("home")}
                    className={`text-[15px] transition-colors ${
                      activeNav === "home"
                        ? " bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "hover:bg-[#041049]/10 text-gray-700"
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
                    className={`text-[15px] transition-colors ${
                      activeNav === "peers"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "hover:bg-[#041049]/10 text-gray-700"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Peers Posts
                  </Button>

                  {/* Filter Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[15px] hover:bg-[#041049]/10 text-gray-700 transition-colors"
                      >
                        {getFilterLabel()}
                        <ChevronDown className="w-4 h-4 ml-1 sm:ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-1">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            activeFilter === "all"
                              ? " bg-yellow-500 hover:bg-yellow-500 text-white hover:text-white"
                              : "hover:bg-[#041049]/10 text-gray-700"
                          }`}
                          onClick={() => {
                            setActiveFilter("all");
                          }}
                        >
                          All Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            activeFilter === "COLLABORATION"
                              ? "bg-yellow-500 hover:bg-yellow-500 text-white hover:text-white"
                              : "text-gray-700 hover:bg-[#041049]/10"
                          }`}
                          onClick={() => {
                            setActiveFilter("COLLABORATION");
                          }}
                        >
                          Collab Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            activeFilter === "OPPORTUNITY"
                              ? "bg-yellow-500 hover:bg-yellow-500 text-white hover:text-white"
                              : "text-gray-700 hover:bg-[#041049]/10"
                          }`}
                          onClick={() => {
                            setActiveFilter("OPPORTUNITY");
                          }}
                        >
                          Job Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            activeFilter === "SHOWCASE"
                              ? "bg-yellow-500 hover:bg-yellow-500 text-white hover:text-white"
                              : "text-gray-700 hover:bg-[#041049]/10"
                          }`}
                          onClick={() => {
                            setActiveFilter("SHOWCASE");
                          }}
                        >
                          Showcase work Posts
                        </Button>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm transition-colors ${
                            activeFilter === "GENERAL"
                              ? "bg-yellow-500 hover:bg-yellow-500 text-white hover:text-white"
                              : "text-gray-700 hover:bg-[#041049]/10"
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
            <div className="hidden md:block">
              <SuggestedUsers />
            </div>
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
                      className="flex items-center justify-between hover:bg-[#041049]/10 p-2 rounded-lg cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="font-medium text-xs text-[#041049]">
                          {topic.tag}
                        </div>
                        <div className="text-xs text-gray-500">
                          {topic.posts} posts
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {topic.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-[#041049]" />
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
