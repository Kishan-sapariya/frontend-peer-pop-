import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Creating Together?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of creators who are already collaborating, growing, and
          succeeding together on Peerpop.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/onboarding">
            <Button
              size="lg"
              className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
            >
              Join the Community
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/login/business">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg bg-transparent shadow-lg"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Business Portal
            </Button>
          </Link>
          <Link href="/feed">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg bg-transparent shadow-lg"
            >
              Explore First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
