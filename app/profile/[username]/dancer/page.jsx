"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useDancerStore } from "@/store/useDancerStore"
import { useAuthStore } from "@/store/useAuthStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Share2,
  MessageCircle,
  UserPlus,
  Music,
  Award,
  Users,
  Star,
  Play,
  Clock,
  Trophy,
  Eye,
} from "lucide-react"

export default function DancerProfile() {
  const { getDancerProfileByUsername, profile } = useDancerStore();
  const { user } = useAuthStore();
  const params = useParams();
  const isOwnProfile = profile?.userProfile?.id === user?.id;
  const preferences = profile?.data?.preferences || {};
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("performances")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        await getDancerProfileByUsername(params.username);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    if (params.username) fetchProfile();
  }, [params.username]);


  // Map backend data to UI structure (flat structure)
  const dancer = profile?.data
    ? {
        name: profile.data.stageName || (profile.data.firstName && profile.data.lastName ? profile.data.firstName + ' ' + profile.data.lastName : ""),
        title: profile.data.performanceType || "",
        specialties: profile.data.danceStyles?.join(", ") || "",
        location: profile.data.location || "",
        joinDate: profile.data.joinDate || "",
        website: profile.data.website || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        bio: profile.data.bio || "",
        avatar: profile.data.profileImage || "/placeholder.svg",
        coverImage: profile.data.coverImage || "/placeholder.svg",
        verified: false, // not in data
        stats: {
          yearsExperience: profile.data.yearsActive || profile.data.experience || 0,
          performancesCompleted: parseInt(profile.data.performancesCompleted) || 0,
          studentsTeaching: parseInt(profile.data.studentsTeaching) || 0,
          choreographyPieces: parseInt(profile.data.choreographyPieces) || 0,
          competitionsWon: parseInt(profile.data.competitionsEntered) || 0,
          musicVideos: parseInt(profile.data.musicVideos) || 0,
          awardsWon: parseInt(profile.data.awardsWon) || 0,
        },
        socialStats: {
          instagram: { followers: parseInt(profile.data.socialStats?.instagram) || 0 },
          tiktok: { followers: parseInt(profile.data.socialStats?.tiktok) || 0 },
          youtube: { subscribers: parseInt(profile.data.socialStats?.youtube) || 0 },
        },
        danceStyles: (profile.data.danceStyles || []).map(style => ({ name: style, level: "", years: "" })),
        training: profile.data.training || [],
        recentPerformances: profile.data.recentPerformances || [],
        choreographyWork: profile.data.choreographyWork || [],
        achievements: profile.data.achievements || [],
        availability: profile.data.availability || {},
        rates: profile.data.rates || {},
        languages: profile.data.languages || [],
        specialSkills: profile.data.specialSkills || [],
        techniques: profile.data.techniques || [],
      }
    : null;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }
  if (!dancer) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">No profile found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 -mt-16">
      {/* Cover Image - extends behind navbar */}
      <div className="relative h-72 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
        <img
          src={dancer.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
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
                  <AvatarImage src={dancer.avatar || "/placeholder.svg"} alt={dancer.name || "Dancer"} />
                  <AvatarFallback className="text-2xl">IM</AvatarFallback>
                </Avatar>
                {dancer.verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl text-gray-600 mt-1">{dancer.title}</p>
                    <p className="text-purple-600 font-medium mt-1">{dancer.specialties}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {dancer.location}
                      </div>
                      {dancer.stats.yearsExperience ? (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {dancer.stats.yearsExperience} years experience
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button onClick={() => setIsFollowing(!isFollowing)} variant={isFollowing ? "outline" : "default"}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share profile">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Dance Stats */}
                {(isOwnProfile || preferences?.publicStats) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {dancer.stats.performancesCompleted > 0 && (
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{dancer.stats.performancesCompleted}</div>
                        <div className="text-sm text-gray-600">Performances</div>
                      </div>
                    )}
                    {dancer.stats.choreographyPieces > 0 && (
                      <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">{dancer.stats.choreographyPieces}</div>
                        <div className="text-sm text-gray-600">Choreographies</div>
                      </div>
                    )}
                    {dancer.stats.studentsTeaching > 0 && (
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{dancer.stats.studentsTeaching}</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                    )}
                    {dancer.stats.competitionsWon > 0 && (
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dancer.stats.competitionsWon}</div>
                        <div className="text-sm text-gray-600">Competitions</div>
                      </div>
                    )}
                  </div>
                )}
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
                <p className="text-gray-700 text-sm leading-relaxed">{dancer.bio}</p>
                <div className="mt-4 space-y-2">
                  {dancer.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      <a
                        href={dancer.website.startsWith("http") ? dancer.website : `https://${dancer.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {dancer.website}
                      </a>
                    </div>
                  )}
                  {(isOwnProfile || preferences?.showContact) && dancer.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{dancer.email}</span>
                    </div>
                  )}
                  {(isOwnProfile || preferences?.showContact) && dancer.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{dancer.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dance Styles */}
            <Card>
              <CardHeader>
                <CardTitle>Dance Styles & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dancer.danceStyles.map((style, index) => {
                    const levelPercent =
                      style.level === "Expert"
                        ? 95
                        : style.level === "Advanced"
                          ? 80
                          : style.level === "Intermediate"
                            ? 65
                            : null
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{style.name}</span>
                          {style.level && (
                            <Badge variant="outline" className="text-xs">
                              {style.level}
                            </Badge>
                          )}
                        </div>
                        {style.years && (
                          <div className="text-xs text-gray-500 mb-2">{style.years} years experience</div>
                        )}
                        {levelPercent !== null && <Progress value={levelPercent} className="h-2" />}
                      </div>
                    )
                  })}
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
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-pink-600">
                        {formatNumber(dancer.socialStats.instagram.followers)}
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-white">TikTok</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">
                        {formatNumber(dancer.socialStats.tiktok.followers)}
                      </div>
                      <div className="text-xs text-gray-300">followers</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">YouTube</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-red-600">
                        {formatNumber(dancer.socialStats.youtube.subscribers)}
                      </div>
                      <div className="text-xs text-gray-500">subscribers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability & Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Services & Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(dancer.availability).map(([service, available]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{service.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                      {available ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Available</Badge>
                      )}
                    </div>
                  ))}
                </div>

                {(isOwnProfile || preferences?.showRates) && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm mb-3">Starting Rates</h4>
                    <div className="space-y-2 text-sm">
                      {dancer.rates.performance && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Performance:</span>
                          <span className="font-medium">{dancer.rates.performance}</span>
                        </div>
                      )}
                      {dancer.rates.choreography && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Choreography:</span>
                          <span className="font-medium">{dancer.rates.choreography}</span>
                        </div>
                      )}
                      {dancer.rates.privateLesson && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Private Lesson:</span>
                          <span className="font-medium">{dancer.rates.privateLesson}</span>
                        </div>
                      )}
                      {dancer.rates.workshop && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Workshop:</span>
                          <span className="font-medium">{dancer.rates.workshop}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="performances">Performances</TabsTrigger>
                <TabsTrigger value="choreography">Choreography</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="performances" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Performances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dancer.recentPerformances.length === 0 && (
                        <p className="text-sm text-gray-500">Nothing here yet</p>
                      )}
                      {dancer.recentPerformances.map((performance, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{performance.title}</h3>
                              <p className="text-sm text-gray-600">{performance.type}</p>
                              <p className="text-sm text-purple-600">{performance.role}</p>
                            </div>
                            <Badge variant="outline">{performance.date}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {performance.venue}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {performance.views} views
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="choreography" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Choreography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dancer.choreographyWork.length === 0 && (
                        <p className="text-sm text-gray-500">Nothing here yet</p>
                      )}
                      {dancer.choreographyWork.map((piece, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{piece.title}</h3>
                              <p className="text-sm text-purple-600">{piece.style}</p>
                            </div>
                            <Badge variant="outline">{piece.year}</Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{piece.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {piece.dancers} dancers
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {piece.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Education & Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {dancer.training.length === 0 && (
                        <p className="text-sm text-gray-500">Nothing here yet</p>
                      )}
                      {dancer.training
                        .filter((item) => item && item.trim())
                        .map((item, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{item}</h3>
                            </div>
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
                      {dancer.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {lang.language} - {lang.level}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dancer.achievements.length === 0 && (
                        <p className="text-sm text-gray-500">Nothing here yet</p>
                      )}
                      {dancer.achievements.map((achievement, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <div>
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-gray-600">{achievement.category}</p>
                              <p className="text-xs text-gray-500">{achievement.year}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
