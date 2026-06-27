"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Play,
  Trophy,
  Headphones,
  Volume2,
  DollarSign,
} from "lucide-react";
import { useMusicianStore } from "@/store/useMusicianStore";
import { useParams } from "next/navigation";
import { getInitialLetter } from "@/utils/formatDate";

export default function profileDataProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("music");
  const { username } = useParams();
  const { getMusicianProfileByUsername, profile } = useMusicianStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (username) {
        setIsLoading(true);
        setError(null);
        try {
          await getMusicianProfileByUsername(username);
        } catch (err) {
          setError("Failed to load profile.");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchProfile();
  }, [username]);

  const profileData = profile?.data || {};

  const formatNumber = (num) => {
    if (num === undefined) return;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-100 -mt-16">
      {/* Cover Image - extends behind navbar */}
      <div className="relative h-72 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500">
        <img
          src={profileData.coverImage || "/placeholder.svg"}
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
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profile?.userProfile?.username || "Musician"} />
                  <AvatarFallback className="text-2xl">
                    {getInitialLetter(profile?.userProfile.username)}
                  </AvatarFallback>
                </Avatar>
                {profileData.verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {profile?.userProfile.username}
                      </h1>
                      {profileData.verified && (
                        <Badge className="bg-blue-500">Verified Artist</Badge>
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mt-1">
                      {profileData.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profileData?.genres &&
                      Array.isArray(profileData.genres) &&
                      profileData.genres.length > 0 ? (
                        profileData.genres.map((genre, index) => (
                          <Badge key={index} variant="secondary">
                            {" "}
                            {genre}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No genres specified.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {profileData.yearsActive} years active
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      variant={isFollowing ? "outline" : "default"}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Connected" : "Connect"}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Collaborate
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share profile">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Music Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(profileData.streamingStats?.spotify)}
                    </div>
                    <div className="text-sm text-gray-600">Spotify Streams</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {profileData.songsReleased}
                    </div>
                    <div className="text-sm text-gray-600">Songs Released</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {profileData.concertsPerformed}
                    </div>
                    <div className="text-sm text-gray-600">Live Shows</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {profileData.albumsReleased}
                    </div>
                    <div className="text-sm text-gray-600">Albums Released</div>
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
                  {profileData.bio}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <a href="#" className="text-blue-600 hover:underline">
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
              </CardContent>
            </Card>

            {/* Instruments & Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Instruments & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(profileData.instruments) &&
                    profileData.instruments.map((instrument, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            {instrument}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Streaming Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Streaming & Social</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Spotify */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-2">
                      <Headphones className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Spotify</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.spotify && (
                        <a
                          href={profileData.socialLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-green-600">
                        {formatNumber(profileData.streamingStats?.spotify)}
                      </div>
                      <div className="text-xs text-gray-500">
                        monthly listeners
                      </div>
                    </div>
                  </div>
                  {/* Apple Music */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium">Apple Music</span>
                    </div>
                    <div className="text-right">
                      {profileData.streamingStats?.appleMusic && (
                        <span className="text-sm font-semibold text-gray-700">
                          {formatNumber(profileData.streamingStats.appleMusic)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* YouTube */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">YouTube</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.youtube && (
                        <a
                          href={profileData.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Channel
                        </a>
                      )}
                      <div className="text-sm font-semibold text-red-600">
                        {formatNumber(profileData.streamingStats?.youtube)}
                      </div>
                      <div className="text-xs text-gray-500">subscribers</div>
                    </div>
                  </div>
                  {/* SoundCloud */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">SoundCloud</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.soundcloud && (
                        <a
                          href={profileData.socialLinks.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-orange-600">
                        {formatNumber(profileData.streamingStats?.soundcloud)}
                      </div>
                      <div className="text-xs text-gray-500">users</div>
                    </div>
                  </div>
                  {/* Instagram */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-pink-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.instagram && (
                        <a
                          href={profileData.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-pink-600">
                        {formatNumber(
                          profileData.socialLinks?.instagramFollowers
                        )}
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>
                  {/* TikTok */}
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
                      {profileData.socialLinks?.tiktok && (
                        <a
                          href={profileData.socialLinks.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-white">
                        {formatNumber(profileData.socialLinks?.tiktokFollowers)}
                      </div>
                      <div className="text-xs text-gray-300">followers</div>
                    </div>
                  </div>
                  {/* Facebook */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">Facebook</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.facebook && (
                        <a
                          href={profileData.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-blue-600">
                        {formatNumber(
                          profileData.socialLinks?.facebookFollowers
                        )}
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>
                  {/* Twitter */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <div className="text-right">
                      {profileData.socialLinks?.twitter && (
                        <a
                          href={profileData.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block"
                        >
                          Profile
                        </a>
                      )}
                      <div className="text-sm font-semibold text-blue-400">
                        {formatNumber(
                          profileData.socialLinks?.twitterFollowers
                        )}
                      </div>
                      <div className="text-xs text-gray-500">followers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Services & Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.services &&
                  Object.keys(profileData.services).length > 0 ? (
                    Object.entries(profileData.services).map(
                      ([service, available]) => (
                        <div
                          key={service}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm capitalize">
                            {service.replace(/([A-Z])/g, " $1").toLowerCase()}
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
                    )
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No services listed.
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3">Starting Rates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Live Performance:</span>
                      <span className="font-medium">
                        {profileData.rates?.livePerformance || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Studio Session:</span>
                      <span className="font-medium">
                        {profileData.rates?.studioSession || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Songwriting:</span>
                      <span className="font-medium">
                        {profileData.rates?.songwritingSession ||
                          profileData.rates?.songwriting ||
                          "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Music Lesson:</span>
                      <span className="font-medium">
                        {profileData.rates?.musicLesson || "-"}
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
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="shows">Live Shows</TabsTrigger>
                <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="music" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Releases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.isArray(profileData?.recentReleases) &&
                        profileData?.recentReleases.map((release, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {release.title}
                                </h3>
                                <p className="text-blue-600 font-medium">
                                  {release.type}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {release.genre}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {release.releaseDate}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Volume2 className="w-4 h-4 mr-1" />
                                {release.streams} streams
                              </div>
                              <div className="flex items-center">
                                <Play className="w-4 h-4 mr-1" />
                                {Array.isArray(release.platforms)
                                  ? release.platforms.join(", ")
                                  : release.platforms}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Array.isArray(profileData?.equipment) &&
                        profileData.equipment.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                          >
                            <Music className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shows" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Shows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.isArray(profileData?.upcomingShows) &&
                        profileData.upcomingShows.map((show, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {show.venue}
                                </h3>
                                <p className="text-blue-600 font-medium">
                                  {show.type}
                                </p>
                              </div>
                              <Badge variant="outline">{show.date}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {show.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {show.ticketPrice}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="collaborations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Collaborations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.isArray(profileData?.collaborations) &&
                        profileData.collaborations.map((collab, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">
                                  {collab.project}
                                </h3>
                                <p className="text-blue-600 font-medium">
                                  with {collab.artist}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {collab.role}
                                </p>
                              </div>
                              <Badge variant="outline">{collab.year}</Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Education & Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Array.isArray(profileData?.training) &&
                        profileData.training.map((education, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">
                                {education.institution}
                              </h3>
                              <p className="text-blue-600 font-medium">
                                {education.program}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                <span>{education.period}</span>
                                <span>•</span>
                                <span>{education.degree}</span>
                              </div>
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
                      {Array.isArray(profileData?.languages) &&
                        profileData.languages.map((lang, index) => (
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

              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.isArray(profileData?.achievements) &&
                        profileData.achievements.map((achievement, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Trophy className="w-8 h-8 text-yellow-500" />
                              <div>
                                <h3 className="font-semibold">
                                  {achievement.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {achievement.category}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {achievement.year}
                                </p>
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
  );
}
