"use client";

import React, { useEffect, useState } from "react";
// Since we are creating a self-contained environment, we will use simple divs instead of Link/Next.js specific components.
// We keep the icon imports from the original request.
import {
  Sparkles,
  ArrowRight,
  Building2,
  Telescope,
  Check,
} from "lucide-react";

// Mock data for the profile card
const mockProfileData = {
  name: "Sarah Johnson",
  handle: "@sarahjohnson",
  bio: "Tech & Lifestyle Creator | Sharing my journey in content creation",
  profilePic:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxhZnJpY2FuJTIwZmVtYWxlJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTY5OTk2Nzg0NHww&ixlib=rb-4.0.3&q=80&w=1080", // Using a placeholder image for a professional female
  stats: [
    { label: "Subscribers", value: "2.4M" },
    { label: "Videos", value: "156" },
    { label: "Total Views", value: "48.2M" },
    { label: "Avg. Engagement", value: "4.8%" },
  ],
  recentVideos: [
    {
      title: "My Morning Routine as a Content Creator",
      views: "1.2M views",
      days: "3 days ago",
      likes: "45K",
      comments: "2.1K",
    },
    {
      title: "Top 5 Tech Gadgets You Need in 2025",
      views: "856K views",
      days: "1 week ago",
      likes: "38K",
      comments: "1.8K",
    },
  ],
  growth: {
    subscribers: "+8K",
    views: "+2.8M",
  },
  locations: [
    { country: "United States", percentage: "42%" },
    { country: "United Kingdom", percentage: "18%" },
    { country: "Canada", percentage: "12%" },
    { country: "Australia", percentage: "8%" },
  ],
};

const RightPanelUI = () => (
  <div
    className="relative w-full lg:w-[600px] h-[550px] md:h-[600px] flex items-center justify-center p-4 lg:p-0 transition-all duration-700 ease-out"
    style={{ perspective: "1000px" }}
  >
    {/* Profile Card Container */}
    <div className="w-full h-full max-w-sm md:max-w-md bg-[#181A20] rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 transform transition-transform duration-500 hover:scale-[1.02] hover:rotate-1">
      {/* Header Banner */}
      <div className="h-24 bg-gradient-to-r from-yellow-500 to-orange-500"></div>

      <div className="px-5 -mt-10">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#181A20] shadow-xl">
          <img
            src={mockProfileData.profilePic}
            alt={mockProfileData.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Handle */}
        <h2 className="text-xl font-bold text-white mt-3 flex items-center">
          {mockProfileData.name}{" "}
          <Check className="w-4 h-4 ml-2 text-green-400" />
        </h2>
        <p className="text-sm text-gray-400">{mockProfileData.handle}</p>
        <p className="text-sm text-gray-300 mt-1 mb-4">{mockProfileData.bio}</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-2 bg-[#20232A] py-3 px-5 border-t border-b border-gray-700/50">
        {mockProfileData.stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area - hide scrollbar */}
      <div className="p-5 overflow-y-auto h-[calc(100%-250px)] custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Recent Videos - takes 2/3 of space on medium screens */}
          <div className="md:col-span-2">
            <h3 className="text-base font-semibold text-white mb-3">
              Recent Videos
            </h3>
            <div className="space-y-3">
              {mockProfileData.recentVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-start p-2 bg-[#20232A] rounded-xl cursor-pointer hover:bg-[#282B32] transition"
                >
                  {/* Placeholder for Video Thumbnail/Play Icon */}
                  <div className="w-16 h-12 bg-yellow-500 flex items-center justify-center rounded-lg flex-shrink-0 shadow-md">
                    <Telescope className="w-5 h-5 text-black" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {video.views} • {video.days}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ❤️ {video.likes} | 💬 {video.comments}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Stats - takes 1/3 of space on medium screens */}
          <div className="md:col-span-0 w-33 space-y-5">
            {/* 30-Day Growth */}
            <div className="bg-[#20232A] p-4 rounded-xl shadow-inner">
              <h4 className="text-base font-semibold text-white mb-3 border-b border-gray-700/50 pb-2">
                30-Day Growth
              </h4>
              <div className="text-sm space-y-3">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">Subscribers</span>
                    <span className="text-green-400 font-bold">
                      {mockProfileData.growth.subscribers}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="w-[80%] h-full bg-green-400 transition-width duration-500"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">Views</span>
                    <span className="text-green-400 font-bold">
                      {mockProfileData.growth.views}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="w-[90%] h-full bg-green-400 transition-width duration-500"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Locations */}
            <div className="bg-[#20232A] p-4 rounded-xl shadow-inner">
              <h4 className="text-base font-semibold text-white mb-3 border-b border-gray-700/50 pb-2">
                Top Locations
              </h4>
              <div className="text-sm space-y-1">
                {mockProfileData.locations.map((loc, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-gray-300">{loc.country}</span>
                    <span className="text-yellow-400 font-medium">
                      {loc.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set a slight delay to allow CSS transitions to work for a fade-in effect
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Using Tailwind's transition classes for motion effects
  const contentClassName = `relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto w-full gap-12 py-16 transition-all duration-1000 ease-out ${
    hasMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

  const textContentClassName = `lg:w-1/2 text-center lg:text-left px-4 pt-10 lg:pt-10 transition-all duration-1000 ease-out ${
    hasMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
  }`;

  const imagePanelClassName = `lg:w-1/2 flex justify-center lg:justify-end px-4 mt-12 lg:mt-0 transition-all duration-1000 ease-out ${
    hasMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
  }`;

  return (
    <section className="relative flex items-center justify-center min-h-[92vh] px-4 py-16 md:py-0 overflow-hidden bg-black font-['Inter']">
      {/* Load Inter font via Google Fonts (for a modern look) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />

      {/* Tailwind CSS custom scrollbar utility */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
          scrollbar-width: none; /* For Firefox */
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>

      <div className={contentClassName}>
        <div className={textContentClassName}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Where Creators, Mentors
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              & Brand Connect
            </span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-white/90 mb-10 max-w-2xl lg:max-w-none mx-auto leading-relaxed">
            Build real connections. Find authentic collaborations. Grow your
            creative career with the platform designed for meaningful
            partnerships.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap lg:justify-start justify-center gap-4 mb-12">
            {/* CTA Button 1 */}
            <div>
              <a
                href="#signup"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black transition-all duration-200 min-w-[200px] hover:shadow-lg hover:shadow-[#F9D423]/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get started for free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* CTA Button 2 */}
            <div>
              <a
                href="#business-login"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-[#F0AF1B] bg-transparent text-[#F0AF1B] transition-all duration-200 min-w-[200px] hover:bg-[#F0AF1B] hover:text-black"
              >
                <Building2 className="w-5 h-5 mr-2" />
                I'm a Business
              </a>
            </div>
          </div>

          <div className="flex flex-wrap lg:justify-start justify-center items-center gap-4 text-black font-semibold text-sm mt-8">
            {[
              { color: "bg-green-400", text: "Free to join" },
              { color: "bg-blue-400", text: "Verified creators" },
              { color: "bg-purple-400", text: "Global community" },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-2 h-2 ${item.color} rounded-full mr-2`} />
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black border border-white/40 shadow-sm">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image/UI Panel */}
        <div className={imagePanelClassName}>
          <RightPanelUI />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
