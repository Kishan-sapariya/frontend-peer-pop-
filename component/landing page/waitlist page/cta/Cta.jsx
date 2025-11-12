import React from "react";
import MotionSection from "../MotionSection/MotionSection";
import { Button } from "@/components/ui/button";

const Cta = ({ openForm }) => {
  return (
    <MotionSection className="relative py-20 md:py-32 text-center bg-yellow-500/10">
      <div className="relative z-10 px-4">
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white">
          <span className="text-yellow-500">Limited Spots</span> for Early
          Access — Don’t Miss Out!
        </h3>
        <p className="text-xl text-zinc-300 mb-8 max-w-3xl mx-auto">
          Be part of the first 1,000 verified creators and brands shaping the
          future of authentic collaborations.
        </p>
        <Button
          onClick={openForm}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-2xl px-12 py-7 transition-transform hover:scale-[1.03] shadow-md"
        >
          Join the Waitlist Now →
        </Button>
        <p className="mt-4 text-zinc-500 text-sm">
          🔥 7,842 members already on the list
        </p>
      </div>
      {/* Background Subtle Gradient/Animation */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,224C672,224,768,160,864,128C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            className="text-yellow-500"
          ></path>
        </svg>
      </div>
    </MotionSection>
  );
};

export default Cta;
