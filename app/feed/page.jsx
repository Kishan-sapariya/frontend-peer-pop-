"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  Bell,
  Search,
  Video,
  MapPin,
  UserPlus,
  Send,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Zap,
  Sparkles,
  Eye,
  Home,
  Briefcase,
  Mail,
  TrendingUp,
  Target,
  Flame,
  SlidersHorizontal,
  X,
  DollarSign,
  Calendar,
  GraduationCap,
  Settings,
  FileText,
  Megaphone,
  ImageIcon,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
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
  const [newPost, setNewPost] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [postType, setPostType] = useState("");
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

  const tiers = ["Rising", "Pro", "Elite"];

  const availabilityOptions = [
    "Available Now",
    "Available This Week",
    "Available This Month",
    "Booking for Next Month",
    "Fully Booked",
  ];

  const postTypes = [
    "Collaboration",
    "Opportunity",
    "Showcase",
    "Casting Call",
  ];

  const skills = [
    "Adobe Creative Suite",
    "Figma",
    "Sketch",
    "After Effects",
    "Premiere Pro",
    "Final Cut Pro",
    "Cinema 4D",
    "Blender",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "React",
    "JavaScript",
    "HTML/CSS",
    "UI Design",
    "UX Research",
    "Prototyping",
    "Wireframing",
    "Brand Strategy",
    "Logo Design",
    "Typography",
    "Color Theory",
    "Photography",
    "Videography",
    "Lighting",
    "Audio Editing",
    "Music Production",
    "Songwriting",
    "Voice Acting",
    "Acting",
    "Dancing",
    "Choreography",
    "Writing",
    "Copywriting",
    "Content Strategy",
    "Social Media Marketing",
    "SEO",
    "Project Management",
  ];

  const socialPlatforms = [
    "YouTube",
    "Instagram",
    "TikTok",
    "Twitter/X",
    "Facebook",
    "LinkedIn",
    "Twitch",
    "Snapchat",
    "Pinterest",
    "Behance",
    "Dribbble",
    "Vimeo",
  ];

  const contentCategories = [
    "Tech Reviews",
    "Beauty & Fashion",
    "Lifestyle",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Gaming",
    "Education",
    "Comedy",
    "Music",
    "DIY/Crafts",
    "Business",
    "Parenting",
    "Home & Decor",
    "Entertainment",
    "Art & Design",
    "Photography",
    "Film & Video",
  ];

  // Current user data with creative professional features
  const currentUser = {
    name: "Alex Johnson",
    title: "Creative Director & UI/UX Designer",
    location: "San Francisco, CA",
    avatar: "/?height=80&width=80&text=AJ",
    coverImage: "/?height=120&width=300&text=Creative+Cover",
    bio: "Passionate about creating meaningful digital experiences. I help brands tell their stories through innovative design and user-centered solutions. Available for collaborations and freelance projects.",
    stats: {
      peers: 847,
      followers: 1234,
      following: 456,
      projects: 23,
      collaborations: 15,
    },
    tier: "Pro",
    verified: true,
    skills: [
      "UI/UX Design",
      "Brand Strategy",
      "Creative Direction",
      "Figma",
      "Adobe Creative Suite",
    ],
    availability: "Available for Projects",
    hourlyRate: "$85-120",
    portfolio: "alexjohnson.design",
    socialMedia: {
      instagram: "@alexdesigns",
      behance: "alexjohnson",
      dribbble: "alexj",
    },
  };

  const feedPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        profession: "UI/UX Designer",
        avatar: "/?height=50&width=50&text=SC",
        verified: true,
        location: "San Francisco, CA",
        tier: "Pro",
        availability: "Available Now",
        specialties: ["Mobile Design", "User Research"],
      },
      content:
        "Just finished designing a new mobile app for a sustainable fashion startup! 🌱 Looking for a React Native developer to bring this vision to life. The app focuses on connecting eco-conscious consumers with ethical brands. Budget: $8,000-12,000. Timeline: 6-8 weeks. Who's interested in collaborating?",
      images: ["/?height=300&width=500&text=Sustainable+Fashion+App+Design"],
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      bookmarks: 12,
      views: 156,
      tags: [
        "UI/UX",
        "Mobile Design",
        "Sustainability",
        "React Native",
        "Collaboration",
      ],
      type: "collaboration",
      budget: "$8,000-12,000",
      timeline: "6-8 weeks",
      skillsNeeded: ["React Native", "Mobile Development", "API Integration"],
      featured: true,
    },
    {
      id: 2,
      author: {
        name: "Marcus Rodriguez",
        profession: "Filmmaker & Director",
        avatar: "/?height=50&width=50&text=MR",
        verified: true,
        location: "Los Angeles, CA",
        tier: "Elite",
        availability: "Booking for Next Month",
        specialties: ["Short Films", "Commercials", "Music Videos"],
        awards: ["Sundance Selection 2023", "Cannes Short Film Nominee"],
      },
      content:
        "🎬 Wrapped up shooting my latest short film 'Midnight Stories'! Huge thanks to the amazing cast and crew who made this possible. This project explores themes of urban isolation and human connection. Excited to share it at film festivals this year. Special shoutout to @cinematographer_jane for the stunning visuals! 🙌",
      images: [
        "/?height=250&width=400&text=Film+Set+Behind+Scenes",
        "/?height=250&width=400&text=Cinematic+Shot",
      ],
      timestamp: "4 hours ago",
      likes: 67,
      comments: 15,
      shares: 12,
      bookmarks: 28,
      views: 342,
      tags: [
        "Filmmaking",
        "Short Film",
        "Independent Cinema",
        "Sundance",
        "Behind the Scenes",
      ],
      type: "showcase",
      trending: true,
      filmFestivals: ["Sundance 2024", "SXSW 2024", "Tribeca 2024"],
      crew: [
        { role: "Cinematographer", name: "Jane Smith" },
        { role: "Sound Designer", name: "Mike Johnson" },
        { role: "Editor", name: "Lisa Park" },
      ],
    },
    {
      id: 3,
      author: {
        name: "Emma Wilson",
        profession: "YouTuber & Content Creator",
        avatar: "/?height=50&width=50&text=EW",
        verified: true,
        location: "Los Angeles, CA",
        tier: "Pro",
        availability: "Available This Week",
        specialties: ["Tech Reviews", "Lifestyle Content"],
        stats: {
          subscribers: 850000,
          avgViews: 125000,
          engagement: 4.2,
          monthlyViews: 2800000,
        },
        platforms: ["YouTube", "Instagram", "TikTok"],
      },
      content:
        "📱 Looking for a talented video editor to help with my upcoming tech review series! Need someone experienced with:\n\n• Fast-paced editing & motion graphics\n• Color grading & audio mixing\n• YouTube optimization\n• 10-15 videos per month\n\nThis is a long-term paid opportunity. Budget: $500-800 per video. Must have experience with tech content and quick turnaround times. Portfolio required!",
      timestamp: "6 hours ago",
      likes: 89,
      comments: 23,
      shares: 15,
      bookmarks: 45,
      views: 234,
      tags: [
        "YouTube",
        "Video Editing",
        "Tech Reviews",
        "Paid Opportunity",
        "Long-term",
      ],
      type: "opportunity",
      budget: "$500-800 per video",
      timeline: "Ongoing",
      skillsNeeded: [
        "Video Editing",
        "Motion Graphics",
        "Color Grading",
        "Audio Mixing",
      ],
      urgent: true,
      requirements: [
        "3+ years video editing experience",
        "Proficiency in Premiere Pro/Final Cut",
        "Tech content experience preferred",
        "Quick turnaround capability",
      ],
    },
    {
      id: 4,
      author: {
        name: "Luna Park",
        profession: "Musician & Producer",
        avatar: "/?height=50&width=50&text=LP",
        verified: false,
        location: "Nashville, TN",
        tier: "Rising",
        availability: "Available Now",
        specialties: [
          "Electronic Music",
          "Music Production",
          "Live Performance",
        ],
        platforms: ["Spotify", "SoundCloud", "Instagram"],
        stats: {
          monthlyListeners: 45000,
          releases: 12,
          collaborations: 8,
        },
      },
      content:
        "⚡ Looking for a videographer to create a music video for my new single 'Electric Dreams'! \n\nConcept: Neon-lit urban landscapes, creative lighting, and lots of energy. Think cyberpunk meets street art. I have locations scouted and a full creative brief ready.\n\n💰 Budget: $2,000-$3,500\n📅 Shoot dates: Next weekend\n📍 Nashville, TN\n\nDM me your reel if interested! Let's create something amazing together! 🎵✨",
      timestamp: "8 hours ago",
      likes: 31,
      comments: 12,
      shares: 7,
      bookmarks: 18,
      views: 89,
      tags: [
        "Music Video",
        "Collaboration",
        "Videography",
        "Nashville",
        "Electronic Music",
      ],
      type: "opportunity",
      budget: "$2,000-$3,500",
      timeline: "Next Weekend",
      skillsNeeded: ["Videography", "Creative Direction", "Lighting"],
      urgent: true,
      musicGenre: "Electronic/Synthwave",
      concept: "Cyberpunk aesthetic with neon lighting and urban landscapes",
    },
  ];

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

  const activeProjects = [
    {
      title: "Mobile App Design",
      collaborator: "Sarah Chen",
      type: "UI/UX Design",
      progress: 75,
      status: "In Progress",
      deadline: "Next Friday",
      budget: "$8,500",
    },
    {
      title: "YouTube Video Series",
      collaborator: "Emma Wilson",
      type: "Video Editing",
      progress: 15,
      status: "Just Started",
      deadline: "End of Month",
      budget: "$6,000",
    },
    {
      title: "Brand Campaign",
      collaborator: "Zoe Martinez",
      type: "Photography",
      progress: 25,
      status: "Planning",
      deadline: "3 Weeks",
      budget: "$18,000",
    },
  ];

  const handleTierToggle = (tier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const handleAvailabilityToggle = (availability) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability)
        ? prev.filter((a) => a !== availability)
        : [...prev, availability]
    );
  };

  const handlePostTypeToggle = (postType) => {
    setSelectedPostTypes((prev) =>
      prev.includes(postType)
        ? prev.filter((pt) => pt !== postType)
        : [...prev, postType]
    );
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleContentCategoryToggle = (category) => {
    setSelectedContentCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedProfessions([]);
    setSelectedLocations([]);
    setSelectedTiers([]);
    setSelectedAvailability([]);
    setSelectedPostTypes([]);
    setSelectedSkills([]);
    setBudgetRange([0, 50000]);
    setExperienceRange([0, 15]);
    setIsVerifiedOnly(false);
    setIsRemoteWork(false);
    setIsUrgentOnly(false);
    setSubscriberRange([0, 10000000]);
    setEngagementRange([0, 20]);
    setSelectedPlatforms([]);
    setSelectedContentCategories([]);
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

  const activeFilterCount = getActiveFilterCount();

  // Check if social media filters should be shown
  const showSocialMediaFilters = selectedProfessions.some((prof) =>
    [
      "YouTuber",
      "Content Creator",
      "Social Media Influencer",
      "Podcaster",
    ].includes(prof)
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <UserDetailsCard />

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
                    className={`text-sm ${
                      activeNav === "home"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
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
                    className={`text-sm ${
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
                        className="text-sm hover:bg-blue-50 text-gray-700"
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
                          Project Posts
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
