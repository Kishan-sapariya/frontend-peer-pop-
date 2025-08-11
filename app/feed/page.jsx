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
} from "lucide-react";

export default function HomeFeed() {
  const [newPost, setNewPost] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [postType, setPostType] = useState("");

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

  const professions = [
    "UI/UX Designer",
    "Graphic Designer",
    "Filmmaker",
    "Director",
    "Photographer",
    "Musician",
    "Producer",
    "Dancer",
    "Choreographer",
    "Actor",
    "Voice Actor",
    "YouTuber",
    "Content Creator",
    "Social Media Influencer",
    "Video Editor",
    "Motion Graphics Designer",
    "Writer",
    "Copywriter",
    "Animator",
    "Illustrator",
    "Brand Designer",
    "Web Designer",
    "Sound Engineer",
    "Podcaster",
  ];

  const locations = [
    "Los Angeles, CA",
    "New York, NY",
    "San Francisco, CA",
    "Chicago, IL",
    "Austin, TX",
    "Seattle, WA",
    "Miami, FL",
    "Nashville, TN",
    "Atlanta, GA",
    "Denver, CO",
    "Portland, OR",
    "Boston, MA",
    "London, UK",
    "Toronto, CA",
    "Berlin, DE",
    "Remote",
  ];

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
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
    coverImage: "/placeholder.svg?height=120&width=300&text=Creative+Cover",
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
        avatar: "/placeholder.svg?height=50&width=50&text=SC",
        verified: true,
        location: "San Francisco, CA",
        tier: "Pro",
        availability: "Available Now",
        specialties: ["Mobile Design", "User Research"],
      },
      content:
        "Just finished designing a new mobile app for a sustainable fashion startup! 🌱 Looking for a React Native developer to bring this vision to life. The app focuses on connecting eco-conscious consumers with ethical brands. Budget: $8,000-12,000. Timeline: 6-8 weeks. Who's interested in collaborating?",
      images: [
        "/placeholder.svg?height=300&width=500&text=Sustainable+Fashion+App+Design",
      ],
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
        avatar: "/placeholder.svg?height=50&width=50&text=MR",
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
        "/placeholder.svg?height=250&width=400&text=Film+Set+Behind+Scenes",
        "/placeholder.svg?height=250&width=400&text=Cinematic+Shot",
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
        avatar: "/placeholder.svg?height=50&width=50&text=EW",
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
        avatar: "/placeholder.svg?height=50&width=50&text=LP",
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
      avatar: "/placeholder.svg?height=50&width=50&text=DK",
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
      avatar: "/placeholder.svg?height=50&width=50&text=SM",
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
      name: "Jordan Lee",
      profession: "Fashion Photographer",
      avatar: "/placeholder.svg?height=50&width=50&text=JL",
      mutualConnections: 12,
      location: "New York, NY",
      tier: "Pro",
      specialty: "Fashion & Editorial Photography",
      availability: "Booking for Next Month",
      skills: ["Fashion Photography", "Studio Lighting", "Retouching"],
      publications: ["Vogue", "Harper's Bazaar", "Elle"],
      recentWork: "NYFW Backstage Coverage",
    },
    {
      name: "Taylor Swift",
      profession: "Content Creator & Strategist",
      avatar: "/placeholder.svg?height=50&width=50&text=TS",
      mutualConnections: 20,
      location: "Nashville, TN",
      tier: "Elite",
      specialty: "Social Media Strategy & Content",
      availability: "Available Now",
      skills: ["Content Strategy", "Social Media", "Brand Development"],
      clients: ["Major Record Labels", "Fashion Brands"],
      recentWork: "Grammy Awards Social Campaign",
    },
    {
      name: "Chris Johnson",
      profession: "Music Producer & Sound Engineer",
      avatar: "/placeholder.svg?height=50&width=50&text=CJ",
      mutualConnections: 6,
      location: "Los Angeles, CA",
      tier: "Pro",
      specialty: "Music Production & Mixing",
      availability: "Available This Week",
      skills: ["Music Production", "Mixing", "Mastering"],
      genres: ["Pop", "Hip-Hop", "Electronic"],
      recentWork: "Billboard Top 40 Single",
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

  // Filter handlers
  const handleProfessionToggle = (profession) => {
    setSelectedProfessions((prev) =>
      prev.includes(profession)
        ? prev.filter((p) => p !== profession)
        : [...prev, profession]
    );
  };

  const handleLocationToggle = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

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

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Handle post submission
      console.log("Submitting post:", { content: newPost, type: postType });
      setNewPost("");
      setPostType("");
      setShowPostOptions(false);
    }
  };

  const PostTypeButton = ({ type, icon: Icon, label, description }) => (
    <Button
      variant={postType === type ? "default" : "outline"}
      className={`h-auto p-4 flex flex-col items-center space-y-2 ${
        postType === type
          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
          : "hover:bg-purple-50 border-purple-200"
      }`}
      onClick={() => setPostType(type)}
    >
      <Icon className="w-6 h-6" />
      <div className="text-center">
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs opacity-75">{description}</div>
      </div>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - User Profile & Navigation */}
          <div className="lg:col-span-1 space-y-4">
            {/* User Profile Card */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="relative mb-3">
                    <Avatar className="w-16 h-16 mx-auto border-3 border-purple-200">
                      <AvatarImage
                        src={currentUser.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {currentUser.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-gray-800">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {currentUser.title}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {currentUser.location}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      currentUser.tier === "Elite"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : currentUser.tier === "Pro"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                        : "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                    }`}
                  >
                    {currentUser.tier}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-purple-600">
                      {currentUser.stats.peers}
                    </div>
                    <div className="text-xs text-gray-500">Peers</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-pink-600">
                      {currentUser.stats.projects}
                    </div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-orange-600">
                      {currentUser.stats.collaborations}
                    </div>
                    <div className="text-xs text-gray-500">Collabs</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Availability:</span>
                    <Badge
                      variant="outline"
                      className="text-xs border-emerald-300 text-emerald-600"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {currentUser.availability}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Rate:</span>
                    <span className="text-xs font-medium text-gray-800">
                      {currentUser.hourlyRate}/hr
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-3">
                <nav className="space-y-1">
                  {[
                    { key: "home", label: "Home", icon: Home },
                    { key: "peers", label: "My Peers", icon: Users },
                    { key: "projects", label: "Projects", icon: Briefcase },
                    {
                      key: "opportunities",
                      label: "Opportunities",
                      icon: Target,
                    },
                    { key: "messages", label: "Messages", icon: Mail },
                    { key: "bookmarks", label: "Bookmarks", icon: Bookmark },
                    { key: "profile", label: "Profile", icon: Settings },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Button
                        key={item.key}
                        variant={activeNav === item.key ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-9 ${
                          activeNav === item.key
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                            : "hover:bg-purple-50 text-gray-700"
                        }`}
                        onClick={() => setActiveNav(item.key)}
                      >
                        <IconComponent className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-bold text-sm text-gray-800">
                  Active Projects
                </h3>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-3">
                  {activeProjects.map((project, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-xs text-gray-800">
                          {project.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        with {project.collaborator}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {project.progress}% complete
                        </span>
                        <span className="font-medium text-purple-600">
                          {project.budget}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-purple-200">
              <div className="flex items-center space-x-4">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`${
                    showFilters
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                      : "border-purple-300 hover:bg-purple-50 text-purple-600"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-white text-purple-600 text-xs"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    variant={activeNav === "home" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveNav("home")}
                    className={`text-sm ${
                      activeNav === "home"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                  <Button
                    variant={activeNav === "peers" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveNav("peers")}
                    className={`text-sm ${
                      activeNav === "peers"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    My Peers
                  </Button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {feedPosts.length} posts • Updated 2 min ago
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">
                      Advanced Filters
                    </h3>
                    <div className="flex items-center space-x-2">
                      {activeFilterCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-xs bg-transparent"
                        >
                          Clear All
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Professions */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Professions
                      </h4>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {professions.map((profession) => (
                          <div
                            key={profession}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={profession}
                              checked={selectedProfessions.includes(profession)}
                              onCheckedChange={() =>
                                handleProfessionToggle(profession)
                              }
                            />
                            <label
                              htmlFor={profession}
                              className="text-xs text-gray-700 cursor-pointer"
                            >
                              {profession}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Locations */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-3">
                        Locations
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {locations.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={location}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={() =>
                                handleLocationToggle(location)
                              }
                            />
                            <label
                              htmlFor={location}
                              className="text-xs text-gray-700 cursor-pointer"
                            >
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Filters Button */}
                  <div className="flex justify-end pt-4 border-t">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                      Apply Filters ({activeFilterCount} active)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Post Creation */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-purple-200">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your creative work, find collaborators, or post opportunities..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-300 resize-none text-sm"
                      rows={3}
                      onFocus={() => setShowPostOptions(true)}
                    />

                    {showPostOptions && (
                      <div className="mt-4 space-y-4">
                        {/* Post Type Selection */}
                        <div>
                          <h4 className="font-medium text-sm text-gray-800 mb-3">
                            What type of post is this?
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <PostTypeButton
                              type="collaboration"
                              icon={Users}
                              label="Collaboration"
                              description="Find partners"
                            />
                            <PostTypeButton
                              type="opportunity"
                              icon={Briefcase}
                              label="Opportunity"
                              description="Job posting"
                            />
                            <PostTypeButton
                              type="showcase"
                              icon={Eye}
                              label="Showcase"
                              description="Share work"
                            />
                            <PostTypeButton
                              type="general"
                              icon={MessageCircle}
                              label="General"
                              description="Discussion"
                            />
                          </div>
                        </div>

                        {/* Media Options */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-purple-50 text-purple-600"
                            >
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Photo
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-purple-50 text-purple-600"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-purple-50 text-purple-600"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Document
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-purple-50 text-purple-600"
                            >
                              <Megaphone className="w-4 h-4 mr-2" />
                              Poll
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowPostOptions(false);
                                setNewPost("");
                                setPostType("");
                              }}
                              className="border-gray-300 hover:bg-gray-50 text-gray-600"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handlePostSubmit}
                              disabled={!newPost.trim()}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Posts */}
            <div className="space-y-4">
              {feedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 border-2 border-purple-200">
                            <AvatarImage
                              src={post.author.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm">
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {post.author.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-sm text-gray-800">
                              {post.author.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                post.author.tier === "Elite"
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                  : post.author.tier === "Pro"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                                  : "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                              }`}
                            >
                              {post.author.tier}
                            </Badge>
                            {post.featured && (
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs"
                              >
                                <Flame className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {post.trending && (
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-pink-400 to-red-500 text-white text-xs"
                              >
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {post.urgent && (
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs"
                              >
                                <Zap className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {post.author.profession}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{post.author.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.timestamp}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-purple-50"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mb-4">
                        {post.images.length === 1 ? (
                          <img
                            src={post.images[0] || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Post content ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Metadata */}
                    {(post.budget || post.timeline || post.skillsNeeded) && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          {post.budget && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-gray-700">
                                Budget:
                              </span>
                              <span className="text-green-600 font-bold">
                                {post.budget}
                              </span>
                            </div>
                          )}
                          {post.timeline && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-700">
                                Timeline:
                              </span>
                              <span className="text-blue-600 font-bold">
                                {post.timeline}
                              </span>
                            </div>
                          )}
                          {post.skillsNeeded && (
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-4 h-4 text-purple-600" />
                              <span className="font-medium text-gray-700">
                                Skills:
                              </span>
                              <span className="text-purple-600 font-bold">
                                {post.skillsNeeded.slice(0, 2).join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-purple-300 text-purple-600"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-50 text-gray-600 hover:text-red-600"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-green-50 text-gray-600 hover:text-green-600"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          <span className="text-xs">{post.shares}</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xs"
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Trending Topics */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
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
                      className="flex items-center justify-between hover:bg-purple-50 p-2 rounded-lg cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-xs text-purple-600">
                          {topic.tag}
                        </div>
                        <div className="text-xs text-gray-500">
                          {topic.posts} posts
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {topic.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
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

            {/* Suggested Connections */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-bold text-sm text-gray-800">
                  Suggested Peers
                </h3>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10 border-2 border-purple-200">
                        <AvatarImage
                          src={suggestion.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs">
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
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
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
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xs h-7"
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

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-bold text-sm text-gray-800">
                  Your Activity
                </h3>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Profile Views</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-purple-600">
                        127
                      </span>
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      Post Engagement
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-pink-600">
                        89%
                      </span>
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      New Connections
                    </span>
                    <span className="text-xs font-bold text-orange-600">
                      12
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Messages</span>
                    <span className="text-xs font-bold text-blue-600">
                      5 unread
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
