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
  Music4,
  Drum,
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
    },
    {
      id: "influencer",
      title: "Social Media Influencer",
      description: "Instagram, TikTok, and multi-platform content creators",
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
    },
  ];

  const handleCardClick = (route) => {
    router.push(route);
  };

  const handleDemoProfileClick = (e, demoProfileRoute) => {
    e.stopPropagation();
    router.push(demoProfileRoute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Peerpop!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Choose your creative profession to get started
          </p>
          <p className="text-gray-500">
            We'll customize your experience based on your creative field
          </p>
        </div>

        {/* User Type Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
                onClick={() => handleCardClick(type.route)}
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
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {type.description}
                  </p>
                  <div className="space-y-2">
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
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={(e) =>
                      handleDemoProfileClick(e, type.demoProfileRoute)
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Demo Profile
                  </Button>
                </CardContent>
              </Card>
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
