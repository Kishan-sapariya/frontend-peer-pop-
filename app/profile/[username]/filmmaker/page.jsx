"use client";

import { useEffect, useState } from "react";
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
  Briefcase,
  GraduationCap,
  Bookmark,
  Eye,
  Phone,
  Linkedin,
  Instagram,
  Play,
  Film,
  Camera,
  Mic,
  Edit,
  Clock,
  Trophy,
  Clapperboard,
  Video,
  Music,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import { useFilmMakerStore } from "@/store/useFilmMakerStore";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

export default function FilmmakerProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("filmography");
  const { getFilmMakerProfileByUsername, profile } = useFilmMakerStore();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (username) {
        setIsLoading(true);
        setError(null);
        try {
          await getFilmMakerProfileByUsername(username);
        } catch (err) {
          setError("Failed to load profile.");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchProfile();
  }, [username]);


  const userDetails = profile?.userProfile || {};
  const profileData = profile?.data || {};
  const Equipment = profileData.equipment || {};
  const genre = profileData.genres || {};
  const portfolioItems = profileData.portfolioItems || {};
  const preferences = profileData.preferences || {};
  const rates = profileData.rates || {};
  const secondaryRoles = profileData.secondaryRoles || {};
  const skill = profileData.skills || {};
  const socialLinks = profileData.socialLinks || {};
  const softwares = profileData.software || {};
  const specializations = profileData.specializations || {};
  const unions = profileData.union || {};
  const availability = profileData.availability || {};
  // Use actual profile data instead of mock data
  // All mock data removed. Use profileData, userDetails, and their nested properties for all sections.

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Creative":
        return <Lightbulb className="w-3 h-3" />;
      case "Technical":
        return <Camera className="w-3 h-3" />;
      case "Post-Production":
        return <Edit className="w-3 h-3" />;
      case "Business":
        return <Briefcase className="w-3 h-3" />;
      default:
        return <Film className="w-3 h-3" />;
    }
  };

  const getProjectTypeIcon = (type) => {
    switch (type) {
      case "Feature Film":
        return <Film className="w-4 h-4" />;
      case "Commercial":
        return <Target className="w-4 h-4" />;
      case "Music Video":
        return <Music className="w-4 h-4" />;
      case "Documentary":
        return <Video className="w-4 h-4" />;
      case "Short Film":
        return <Clapperboard className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 -mt-16">
      {/* Cover Image - extends behind navbar */}
      <div className="relative h-72 bg-gradient-to-r from-gray-900 via-purple-900 to-black">
        <img
          src={profileData?.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl">
                  <AvatarImage
                    src={profileData?.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback className="text-3xl">AR</AvatarFallback>
                </Avatar>
                {profileData?.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {userDetails.username}
                      </h1>
                      {profileData?.verified && (
                        <Badge className="bg-blue-500">Verified</Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-3">
                      {profileData.primaryRole}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {formatDate(profile?.createdAt)}
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData?.specializations?.map((spec, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Roles */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData.secondaryRoles?.map((role, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Languages:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.languages?.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {lang.name} ({lang.level})
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Union Memberships */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Union Memberships:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.unions?.map((union, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {union}
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
                      className="w-full sm:w-auto"
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
                    <div className="flex space-x-2">
                      <Button variant="outline" size="lg">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {profileData.stats?.peers?.toLocaleString?.() || 0}
                    </div>
                    <div className="text-sm text-gray-600">Peers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {profileData.stats?.followers?.toLocaleString?.() || 0}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {profileData.stats?.projects || 0}
                    </div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {profileData.stats?.collaborators || 0}
                    </div>
                    <div className="text-sm text-gray-600">Collaborators</div>
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
                  {profileData.bio}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <a
                      href={
                        profileData.website
                          ? profileData.website.startsWith("http")
                            ? profileData.website
                            : `https://${profileData.website}`
                          : "#"
                      }
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profileData.website}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">{profileData.phone}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Social Links */}
                <div>
                  <h4 className="font-medium text-sm mb-3">
                    Professional Network
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">LinkedIn</span>
                        {profileData.socialLinks?.linkedin ? (
                          <a
                            href={
                              profileData.socialLinks.linkedin.startsWith(
                                "http"
                              )
                                ? profileData.socialLinks.linkedin
                                : `https://${profileData.socialLinks.linkedin}`
                            }
                            className="ml-2 text-blue-600 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Profile
                          </a>
                        ) : (
                          <span className="ml-2 text-gray-400">N/A</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-pink-50">
                      <div className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-medium">Instagram</span>
                        {profileData.socialLinks?.instagram && (
                          <Star className="w-3 h-3 text-pink-500 fill-pink-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-pink-600">
                          {profileData.socialLinks?.instagram?.followers?.toLocaleString?.() ||
                            0}
                        </div>
                        <div className="text-xs text-gray-500">followers</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                          <Play className="w-2 h-2 text-white fill-white" />
                        </div>
                        <span className="text-sm font-medium">YouTube</span>
                        {profileData.socialLinks?.youtube?.verified && (
                          <Star className="w-3 h-3 text-red-500 fill-red-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-red-600">
                          {profileData.socialLinks?.youtube?.subscribers?.toLocaleString?.() ||
                            0}
                        </div>
                        <div className="text-xs text-gray-500">subscribers</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-50">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-cyan-500 rounded flex items-center justify-center">
                          <Play className="w-2 h-2 text-white fill-white" />
                        </div>
                        <span className="text-sm font-medium">Vimeo</span>
                        {profileData.socialLinks?.vimeo?.verified && (
                          <Star className="w-3 h-3 text-cyan-500 fill-cyan-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-cyan-600">
                          {profileData.socialLinks?.vimeo?.followers?.toLocaleString?.() ||
                            0}
                        </div>
                        <div className="text-xs text-gray-500">followers</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {profileData.stats?.reelViews?.toLocaleString?.() || 0}
                      </div>
                      <div className="text-xs text-gray-600">
                        Total Reel Views
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Film className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-sm">Directing</span>
                    </div>
                    {profileData.availability?.directing && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm">Cinematography</span>
                    </div>
                    {profileData.availability?.cinematography && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-sm">Consulting</span>
                    </div>
                    {profileData.availability?.consulting && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-sm">Workshops</span>
                    </div>
                    {profileData.availability?.workshops && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700"
                      >
                        Available
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Next Available:</strong>{" "}
                    {profileData.availability?.nextAvailable || "N/A"}
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-sm mb-3">Rates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Directing:</span>
                      <span className="font-medium">
                        ${profileData.rates?.directingMin || 0} - $
                        {profileData.rates?.directingMax || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cinematography:</span>
                      <span className="font-medium">
                        ${profileData.rates?.cinematographyMin || 0} - $
                        {profileData.rates?.cinematographyMax || 0}/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consulting:</span>
                      <span className="font-medium">
                        ${profileData.rates?.consulting || 0}/hr
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Workshops:</span>
                      <span className="font-medium">
                        ${profileData.rates?.workshops || 0}/hr
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(profileData.skills || [])
                    .slice(0, 6)
                    .map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                            {skill.trending && (
                              <TrendingUp className="w-3 h-3 text-orange-500" />
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs flex items-center"
                          >
                            {getCategoryIcon(skill.category)}
                            <span className="ml-1">{skill.category}</span>
                          </Badge>
                        </div>
                        <Progress value={skill.proficiency} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {skill.proficiency}% proficiency
                        </div>
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    View All Skills
                  </Button>
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
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="filmography">Filmography</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="awards">Awards</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
              </TabsList>

              <TabsContent value="filmography">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Filmography</h2>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {profileData.portfolioItems?.length || 0} projects
                    </Badge>
                    <Badge variant="outline">
                      {profileData.stats?.reelViews?.toLocaleString?.() || 0}{" "}
                      total views
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(profileData.portfolioItems || []).map((project, idx) => (
                    <Card
                      key={project.id || idx}
                      className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img
                          src={
                            project.poster ||
                            project.coverImage ||
                            "/placeholder.svg"
                          }
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                        <div className="absolute top-3 left-3 flex space-x-2">
                          <Badge className="bg-white text-gray-900 flex items-center">
                            {getProjectTypeIcon(project.type)}
                            <span className="ml-1">{project.type}</span>
                          </Badge>
                          {project.featured && (
                            <Badge className="bg-yellow-500">Featured</Badge>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black bg-opacity-70 rounded-lg p-2 text-white text-sm">
                            <div className="font-medium">{project.role}</div>
                            <div className="text-xs opacity-90">
                              {project.duration} • {project.year}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {project.genre}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>

                        {project.awards && project.awards.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center text-xs text-yellow-600 mb-1">
                              <Trophy className="w-3 h-3 mr-1" />
                              Awards
                            </div>
                            <div className="text-xs text-gray-600">
                              {project.awards.slice(0, 2).join(", ")}
                              {project.awards.length > 2 &&
                                ` +${project.awards.length - 2} more`}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div>
                            <div className="font-medium">
                              {project.client ||
                                project.artist ||
                                project.distribution ||
                                "Independent"}
                            </div>
                            <div>Budget: {project.budget}</div>
                          </div>
                          <div className="text-right">
                            {project.views && (
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {project.views}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="equipment">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Equipment & Gear</h2>
                  <p className="text-gray-600">
                    Professional equipment owned and frequently used
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["cameras", "lenses", "lighting", "audio"].map(
                    (cat, index) =>
                      profileData.equipment?.[cat]?.length > 0 && (
                        <Card key={cat}>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              {cat === "cameras" && (
                                <Camera className="w-5 h-5 mr-2" />
                              )}
                              {cat === "lenses" && (
                                <Eye className="w-5 h-5 mr-2" />
                              )}
                              {cat === "lighting" && (
                                <Lightbulb className="w-5 h-5 mr-2" />
                              )}
                              {cat === "audio" && (
                                <Mic className="w-5 h-5 mr-2" />
                              )}
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {profileData.equipment[cat].map(
                                (item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                  >
                                    <span className="text-sm font-medium">
                                      {item.name}
                                    </span>
                                    <Badge
                                      variant={
                                        item.owned ? "default" : "outline"
                                      }
                                    >
                                      {item.owned ? "Owned" : "Available"}
                                    </Badge>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="awards">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Awards & Recognition
                  </h2>
                  <p className="text-gray-600">
                    Industry awards and notable achievements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(profileData.awards || []).length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      No awards yet.
                    </div>
                  ) : (
                    (profileData.awards || []).map((award, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                              {/* Optionally render an icon if your data supports it */}
                              <Trophy className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">
                                {award.title}
                              </h3>
                              {award.project && (
                                <p className="text-purple-600 font-medium mb-2">
                                  {award.project}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                {award.category && (
                                  <Badge variant="secondary">
                                    {award.category}
                                  </Badge>
                                )}
                                {award.year && (
                                  <span className="text-sm text-gray-500">
                                    {award.year}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="software">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Software & Tools</h2>
                  <p className="text-gray-600">
                    Post-production and creative software proficiency
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(profileData.software || []).map((tool, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Edit className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {tool.name || tool}
                              </h3>
                              {tool.category && (
                                <Badge variant="outline" className="text-xs">
                                  {tool.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {tool.proficiency && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-purple-600">
                                {tool.proficiency}%
                              </div>
                              <div className="text-xs text-gray-500">
                                proficiency
                              </div>
                            </div>
                          )}
                        </div>
                        {tool.proficiency && (
                          <Progress value={tool.proficiency} className="h-2" />
                        )}
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
