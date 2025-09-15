"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Building2,
  Users,
  Telescope,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 leading-tight text-foreground">
          Where Creators
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Connect & Collaborate
          </span>
        </h1>

        <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto leading-relaxed">
          Join the premier network for creative professionals. Find
          collaborators, discover opportunities, and grow your creative career
          with YouTubers, influencers, filmmakers, photographers, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {/* Join as Creator Button */}
          <Link href="/signup" passHref>
            <Button
              size="lg"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl group bg-gradient-to-r from-blue-600 to-blue-800"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Together
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          {/* I'm a Business Button */}
          <Link href="/login/business" passHref>
            <Button
              size="lg"
              variant="outline"
              className="text-orange-600 border-orange-600 hover:bg-orange-50 px-8 bg-transparent shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Building2 className="w-5 h-5 mr-2" />
              I'm a Business
            </Button>
          </Link>
          {/* Explore Community Button */}
          <Link href="/feed" passHref>
            <Button
              size="lg"
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 px-8 transition-all duration-300 hover:shadow-md"
            >
              <Telescope className="w-5 h-5 mr-2" />
              Explore Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
