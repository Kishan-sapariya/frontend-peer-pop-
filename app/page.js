"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import Footer from "@/component/landing page/Footer";
import CTASection from "@/component/landing page/cta";
import TestimonialsSection from "@/component/landing page/TestimonailsSection";
import FeaturesSection from "@/component/landing page/featuresSection";
import HeroSection from "@/component/landing page/HeroSection";
import { useAuthStore } from "@/store/useAuthStore";

const LandingPage = () => {
  const { isAuthenticated, getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  return (
    <>
      <Head>
        <title>CreatorConnect - Where Creators Connect & Collaborate</title>
        <meta
          name="description"
          content="Join the premier network for creative professionals. Find collaborators, discover opportunities, and grow your creative career."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
