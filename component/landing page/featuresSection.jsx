import React from "react";
import {
  Play,
  Laugh,
  Instagram,
  Music,
  Camera,
  Mic,
  Theater,
  Users,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const creativeFields = [
  {
    title: "YouTubers",
    description:
      "Video creators, streamers, and content creators building audiences and brands online.",
    icon: Play,
    iconColor: "from-red-500 via-rose-500 to-pink-500",
    cardBgColor: "bg-gradient-to-br from-red-100 via-pink-50 to-white",
    comingSoon: false,
  },
  {
    title: "Comedians",
    description:
      "Professional comedians, content creators, and entertainment performers.",
    icon: Laugh,
    iconColor: "from-yellow-400 via-amber-500 to-orange-500",
    cardBgColor: "bg-gradient-to-br from-yellow-100 via-orange-50 to-white",
    comingSoon: false,
  },
  {
    title: "Influencers",
    description: "Instagram and multi-platform content creators.",
    icon: Instagram,
    iconColor: "from-pink-500 via-fuchsia-500 to-purple-500",
    cardBgColor: "bg-gradient-to-br from-pink-100 via-fuchsia-50 to-white",
    comingSoon: false,
  },
  {
    title: "Musicians",
    description:
      "Artists, songwriters, and producers creating and sharing music with the world.",
    icon: Music,
    iconColor: "from-teal-400 via-emerald-500 to-green-500",
    cardBgColor: "bg-gradient-to-br from-teal-100 via-green-50 to-white",
    comingSoon: true,
  },
  {
    title: "Dancers",
    description:
      "Professional dancers, choreographers, and performance artists.",
    icon: Theater,
    iconColor: "from-indigo-400 via-violet-500 to-purple-500",
    cardBgColor: "bg-gradient-to-br from-indigo-100 via-violet-50 to-white",
    comingSoon: true,
  },
  {
    title: "Photographers",
    description: "Visual storytellers capturing moments through photography.",
    icon: Camera,
    iconColor: "from-sky-400 via-blue-500 to-indigo-500",
    cardBgColor: "bg-gradient-to-br from-sky-100 via-blue-50 to-white",
    comingSoon: true,
  },
  {
    title: "Podcasters",
    description:
      "Audio creators and hosts building communities through engaging conversations.",
    icon: Mic,
    iconColor: "from-cyan-400 via-sky-500 to-blue-500",
    cardBgColor: "bg-gradient-to-br from-cyan-100 via-sky-50 to-white",
    comingSoon: true,
  },
  {
    title: "Actors",
    description: "Actors, performers, and dramatists for stage and screen.",
    icon: Users,
    iconColor: "from-purple-400 via-violet-500 to-pink-500",
    cardBgColor: "bg-gradient-to-br from-purple-100 via-violet-50 to-white",
    comingSoon: true,
  },
];

const CreativeFieldsSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Every Creative Field Represented
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From YouTubers to filmmakers, find your creative community and
            collaborate across disciplines.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-6xl mx-auto">
          {creativeFields.map((field, index) => (
            <Card
              key={index}
              className={`relative group ${
                field.cardBgColor
              } text-center p-6 h-full flex flex-col justify-between items-center rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-md`}
            >
              {/* Icon */}
              <div
                className={`relative z-10 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white bg-gradient-to-br ${field.iconColor} shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
              >
                <field.icon size={32} />
              </div>

              {/* Title */}
              <CardTitle className="relative z-10 text-xl mb-2 font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                {field.title}
              </CardTitle>

              {/* Description */}
              <CardDescription className="relative z-10 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                {field.description}
              </CardDescription>

              {/* Coming Soon Badge */}
              {field.comingSoon && (
                <div className="absolute top-5 right-5 z-20">
                  <Badge className="bg-white/60 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-md border border-gray-200">
                    Coming Soon
                  </Badge>
                </div>
              )}

              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeFieldsSection;
