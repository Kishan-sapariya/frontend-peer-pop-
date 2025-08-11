import React from "react";
import {
  Play,
  Instagram,
  Film,
  Camera,
  Music,
  Palette,
  Mic,
  Video,
} from "lucide-react";

const CreativeFieldsSection = () => {
  const creativeFields = [
    {
      icon: Play,
      iconBg: "bg-red-500",
      title: "YouTubers & Content Creators",
      description: "Video creators, streamers, and digital content producers",
      creatorCount: "2.5K+ creators",
    },
    {
      icon: Instagram,
      iconBg: "bg-pink-500",
      title: "Social Media Influencers",
      description: "Instagram, TikTok, and multi-platform content creators",
      creatorCount: "1.8K+ creators",
    },
    {
      icon: Film,
      iconBg: "bg-cyan-500",
      title: "Filmmakers & Directors",
      description:
        "Directors, cinematographers, producers, and film professionals",
      creatorCount: "1.2K+ creators",
    },
    {
      icon: Camera,
      iconBg: "bg-purple-500",
      title: "Photographers",
      description: "Professional photographers and visual artists",
      creatorCount: "3.1K+ creators",
    },
    {
      icon: Music,
      iconBg: "bg-indigo-500",
      title: "Musicians & Artists",
      description: "Musicians, singers, producers, and music creators",
      creatorCount: "2.8K+ creators",
    },
    {
      icon: Palette,
      iconBg: "bg-emerald-500",
      title: "Designers & Artists",
      description: "Graphic designers, illustrators, and digital artists",
      creatorCount: "4.2K+ creators",
    },
    {
      icon: Mic,
      iconBg: "bg-orange-500",
      title: "Podcasters & Voice Talent",
      description: "Podcast hosts, audio producers, and voice actors",
      creatorCount: "950+ creators",
    },
    {
      icon: Video,
      iconBg: "bg-orange-600",
      title: "Video Editors & Animators",
      description: "Video editors, motion graphics artists, and animators",
      creatorCount: "1.6K+ creators",
    },
  ];

  return (
    <section className="py-20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Every Creative Field Represented
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            From YouTubers to filmmakers, find your creative community and
            collaborate across disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeFields.map((field, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 group"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`${field.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <field.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {field.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {field.description}
                </p>

                <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                  {field.creatorCount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeFieldsSection;
