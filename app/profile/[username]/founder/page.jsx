"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Crown,
} from "lucide-react";
import { useFounderStore } from "@/store/useFounderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { capitalizeInitials } from "@/utils/formatDate";
import UploadImageModal from "@/component/profile/UploadImageModal";
import ProfileActionsMenu from "@/component/profile/ProfileActionMenu";
import ConnectBtn from "@/component/Connection/ConnectBtn";
import PostInputSection from "@/component/feeds/PostInputSection";
import MyPostsSection from "@/component/feeds/MyPostsSection";
import FounderEditDialog from "@/component/founder/FounderEditDialog";
import FounderMediaPanel from "@/component/founder/FounderMediaPanel";
import MilestonesSection from "@/component/founder/MilestonesSection";

export default function FounderProfilePage() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const { founder, loading, fetchFounderProfile } = useFounderStore();
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (username) fetchFounderProfile(username);
  }, [username, fetchFounderProfile]);

  if (loading || !founder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700">
            Loading founder profile...
          </h2>
        </div>
      </div>
    );
  }

  const profile = founder.founderProfile || {};
  const media = profile.media || [];
  const isOwnProfile = founder.id === user?.id;
  const image = isOwnProfile ? user?.image : founder.image;
  const coverImage = isOwnProfile ? user?.coverImage : founder.coverImage;

  const socials = [
    { url: profile.linkedinUrl, icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", color: "text-blue-600 bg-blue-50" },
    { url: profile.twitterUrl, icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "text-sky-500 bg-sky-50" },
    { url: profile.instagramUrl, icon: <Instagram className="w-5 h-5" />, label: "Instagram", color: "text-pink-600 bg-pink-50" },
    { url: profile.youtubeUrl, icon: <Youtube className="w-5 h-5" />, label: "YouTube", color: "text-red-600 bg-red-50" },
  ].filter((s) => s.url);

  return (
    <div className="min-h-screen bg-gray-100 relative -mt-16">
      {/* Cover */}
      <div className="relative h-72 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300">
        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Header card */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
              <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl ring-4 ring-amber-200">
                  <AvatarImage className="object-cover" src={image} alt={founder.username || "Founder"} />
                  <AvatarFallback className="text-3xl bg-amber-100 text-amber-700">
                    {founder.username?.charAt(0)?.toUpperCase() || "F"}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && <UploadImageModal />}
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {capitalizeInitials(founder.username || "Founder")}
                      </h1>
                      <Badge className="bg-amber-500 text-white border-0 gap-1">
                        <Crown className="w-3.5 h-3.5" /> Founder
                      </Badge>
                    </div>
                    {profile.headline && (
                      <p className="text-xl text-gray-600 mb-2">{profile.headline}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {profile.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {profile.location}
                        </div>
                      )}
                      {profile.website && (
                        <a
                          href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-amber-600 hover:underline"
                        >
                          <Globe className="w-4 h-4 mr-1" />
                          {profile.website}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isOwnProfile ? (
                      <>
                        <FounderEditDialog profile={profile} />
                        <ProfileActionsMenu />
                      </>
                    ) : (
                      <ConnectBtn isOwnProfile={isOwnProfile} profileId={founder.id} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-amber-500" />
                  Founding Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {profile.bio || "The founding story will appear here."}
                </p>
              </CardContent>
            </Card>

            {socials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg ${s.color} hover:opacity-90 transition`}
                      >
                        {s.icon}
                        <span className="font-medium text-sm">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 h-auto gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1 shadow-sm [&_[data-slot=tabs-trigger]]:rounded-lg [&_[data-slot=tabs-trigger]]:py-2 [&_[data-slot=tabs-trigger]]:border-0 [&_[data-slot=tabs-trigger]]:focus-visible:ring-0 [&_[data-slot=tabs-trigger]]:focus-visible:outline-none [&_[data-slot=tabs-trigger]]:focus-visible:ring-offset-0">
                <TabsTrigger value="posts">{isOwnProfile ? "My Posts" : "Posts"}</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                {isOwnProfile && <PostInputSection />}
                <MyPostsSection profileId={founder.id} />
              </TabsContent>

              <TabsContent value="gallery">
                <FounderMediaPanel type="IMAGE" media={media} isOwnProfile={isOwnProfile} />
              </TabsContent>

              <TabsContent value="videos">
                <FounderMediaPanel type="VIDEO" media={media} isOwnProfile={isOwnProfile} />
              </TabsContent>

              <TabsContent value="milestones">
                <MilestonesSection milestones={profile.milestones || []} isOwnProfile={isOwnProfile} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
