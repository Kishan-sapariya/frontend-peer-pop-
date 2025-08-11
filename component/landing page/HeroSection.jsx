import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Building2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white mb-4 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            The Creative Professional Network
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
            Where Creators
            <br />
            Connect & Collaborate
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the premier network for creative professionals. Find
            collaborators, discover opportunities, and grow your creative career
            with YouTubers, influencers, filmmakers, photographers, and more.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Link href="/onboarding">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-xl"
            >
              Start Creating Together
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/login/business">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-orange-300 hover:bg-orange-50 text-orange-600 bg-transparent shadow-md"
            >
              <Building2 className="w-5 h-5 mr-2" />
              I'm a Business
            </Button>
          </Link>
          <Link href="/feed">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-cyan-300 hover:bg-cyan-50 bg-transparent shadow-md"
            >
              Explore Community
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">18K+</div>
            <div className="text-gray-600">Active Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-600 mb-2">5.2K+</div>
            <div className="text-gray-600">Collaborations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">12K+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
