import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-10 px-4 bg-gradient-to-br from-sky-400 to-blue-500 text-white relative overflow-hidden">
      {/* Overlay gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/90 to-blue-700/90"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Beta</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Get exclusive early access and help shape the future of creative
            collaboration
          </p>

          {/* Benefits Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-10 border border-white/20 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl font-bold">β</span>
            </div>
            <h3 className="text-2xl font-semibold mb-6">
              Early Access Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-100">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Beta platform access
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Lifetime premium features
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Shape new features
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/signup" passHref>
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 px-12 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Join Beta Now <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
