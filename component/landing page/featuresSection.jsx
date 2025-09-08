import React from "react";
import {
  Play,
  Laugh,
  Instagram,
  Music,
  Disc,
  Camera,
  Mic,
  Theater,
} from "lucide-react";

const CreativeFieldsSection = () => {
  const creativeFields = [
    {
      icon: Play,
      iconBg: "bg-red-400",
      title: "YouTuber",
      description: "Video creators, streamers, and digital storytellers",
      creatorCount: "2.5K+ creators",
    },
    {
      icon: Laugh,
      iconBg: "bg-yellow-400",
      title: "Comedian",
      description: "Stand-up comedians, sketch artists, and humorists",
      creatorCount: "1.1K+ creators",
    },
    {
      icon: Instagram,
      iconBg: "bg-pink-400",
      title: "Influencer",
      description: "Social media personalities and brand collaborators",
      creatorCount: "3.4K+ creators",
    },
    {
      icon: Music,
      iconBg: "bg-indigo-400",
      title: "Musician",
      description: "Singers, instrumentalists, and music producers",
      creatorCount: "2.8K+ creators",
      comingSoon: true,
    },
    {
      icon: Disc,
      iconBg: "bg-emerald-400",
      title: "Dancer",
      description: "Performers, choreographers, and stage artists",
      creatorCount: "1.9K+ creators",
      comingSoon: true,
    },
    {
      icon: Camera,
      iconBg: "bg-purple-400",
      title: "Photographer",
      description: "Professional and hobbyist photographers",
      creatorCount: "3.1K+ creators",
      comingSoon: true,
    },
    {
      icon: Mic,
      iconBg: "bg-orange-400",
      title: "Podcaster",
      description: "Podcast hosts, storytellers, and voice talent",
      creatorCount: "950+ creators",
      comingSoon: true,
    },
    {
      icon: Theater,
      iconBg: "bg-cyan-400",
      title: "Actor",
      description: "Stage, film, and television performers",
      creatorCount: "1.6K+ creators",
      comingSoon: true,
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
            From YouTubers to actors, find your creative community and
            collaborate across disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeFields.map((field, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 group overflow-hidden"
            >
              {/* Coming Soon Badge */}
              {field.comingSoon && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full border border-gray-200">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="flex flex-col items-center text-center relative z-0">
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