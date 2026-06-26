"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Laugh,
  Heart,
  Camera,
  Mic,
  Users,
  Music,
  Briefcase,
  ExternalLink,
  Video,
  Drum,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingSelection() {
  const router = useRouter();
  const userTypes = [
    {
      id: "youtuber",
      title: "YouTuber / Content Creator",
      description: "Video creators, streamers, and digital content producers",
      icon: Play,
      color: "bg-red-500",
      features: [
        "Channel Analytics",
        "Collaboration Tools",
        "Brand Partnerships",
        "Creator Economy",
      ],
      route: "/onboarding/youtuber",
      demoProfileRoute: "/demo/youtuber",
      comingSoon: false,
    },
    {
      id: "comedian",
      title: "Stand-Up Comedian",
      description: "Professional comedians, comedy writers, and performers",
      icon: Laugh,
      color: "bg-yellow-500",
      features: [
        "Show Booking",
        "Venue Network",
        "Performance History",
        "Comedy Community",
      ],
      route: "/onboarding/comedian",
      demoProfileRoute: "/demo/comedian",
      comingSoon: false,
    },
    {
      id: "influencer",
      title: "Social Media Influencer",
      description: "Instagram, and multi-platform content creators",
      icon: Heart,
      color: "bg-pink-500",
      features: [
        "Brand Campaigns",
        "Audience Analytics",
        "Content Planning",
        "Rate Management",
      ],
      route: "/onboarding/influencer",
      demoProfileRoute: "/demo/influencer",
      comingSoon: false,
    },
    {
      id: "actor",
      title: "Actor / Performer",
      description: "Stage, film, television, and voice actors",
      icon: Video,
      color: "bg-purple-600",
      features: [
        "Audition Tracking",
        "Casting Calls",
        "Headshot Portfolio",
        "Agent Network",
      ],
      route: "/onboarding/actor",
      demoProfileRoute: "/demo/actor",
      comingSoon: true,
    },
    {
      id: "photographer",
      title: "Photographer",
      description: "Professional photographers and visual artists",
      icon: Camera,
      color: "bg-blue-500",
      features: [
        "Portfolio Showcase",
        "Client Booking",
        "Equipment Rental",
        "Photo Community",
      ],
      route: "/onboarding/photographer",
      demoProfileRoute: "/demo/photographer",
      comingSoon: true,
    },
    {
      id: "podcaster",
      title: "Podcaster / Audio Creator",
      description: "Podcast hosts, audio producers, and voice talent",
      icon: Mic,
      color: "bg-green-500",
      features: [
        "Show Analytics",
        "Guest Network",
        "Sponsorship Tools",
        "Audio Community",
      ],
      route: "/onboarding/podcaster",
      demoProfileRoute: "/demo/podcaster",
      comingSoon: true,
    },
    {
      id: "musician",
      title: "Musician / Artist",
      description: "Musicians, singers, producers, and music creators",
      icon: Music,
      color: "bg-indigo-500",
      features: [
        "Music Portfolio",
        "Collaboration Tools",
        "Venue Booking",
        "Fan Engagement",
      ],
      route: "/onboarding/musician",
      demoProfileRoute: "/demo/musician",
      comingSoon: true,
    },
    {
      id: "dancer",
      title: "Dancer / Choreographer",
      description: "Professional dancers, choreographers, and movement artists",
      icon: Drum,
      color: "bg-cyan-400",
      features: [
        "Performance Portfolio",
        "Audition Alerts",
        "Studio & Rehearsal Space",
        "Collaboration Opportunities",
      ],
      route: "/onboarding/dancer",
      demoProfileRoute: "/demo/dancer",
      comingSoon: true,
    },
  ];

  const handleCardClick = (type) => {
    if (!type.comingSoon) {
      router.push(type.route);
    }
  };

  const handleDemoProfileClick = (e, type) => {
    e.stopPropagation();
    if (!type.comingSoon) {
      router.push(type.demoProfileRoute);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-yellow-400" /> Get started
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Welcome to <span className="text-yellow-500">PeerPop!</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Choose your creative profession to get started
          </p>
          <p className="text-gray-500">
            We&apos;ll customize your experience based on your creative field
          </p>
        </div>

        {/* User Type Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <div key={type.id} className="relative h-full">
                <Card
                  className={`h-full flex flex-col cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                    type.comingSoon ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCardClick(type)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4">
                      {type.description}
                    </p>
                    <div className="space-y-2 flex-1">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Key Features:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {type.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-700"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {!type.comingSoon ? (
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="default"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(type.route);
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" /> Create Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => handleDemoProfileClick(e, type)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> View Demo
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-4 text-center text-sm font-semibold text-gray-500 py-2">
                        🚧 Coming Soon
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect with Peers</h3>
            <p className="text-gray-600 text-sm">
              Find and collaborate with other creatives in your field
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Grow Your Career</h3>
            <p className="text-gray-600 text-sm">
              Access opportunities, mentorship, and industry insights
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Build Community</h3>
            <p className="text-gray-600 text-sm">
              Join a supportive network of creative professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
