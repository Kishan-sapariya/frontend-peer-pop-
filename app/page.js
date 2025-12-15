"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import Footer from "@/component/landing page/Footer";
import CTASection from "@/component/landing page/cta";
import HeroSection from "@/component/landing page/HeroSection";
import { useAuthStore } from "@/store/useAuthStore";
import CompanyMarquee from "@/component/landing page/CompanyMarquee";
import Stats from "@/component/landing page/Stats";
import SeeAction from "@/component/landing page/SeeAction";
import ContentSlide from "@/component/landing page/ContentSlide";
import PeerPopWaitlist from "@/component/landing page/waitlist page/WaitlistPage";
import Faq from "@/component/landing page/waitlist page/faq/Faq";

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
      </Head>
      <div className="min-h-screen bg-white">
        {/* <PeerPopWaitlist /> */}
        <HeroSection />
        <Stats />
        <SeeAction />
        <CompanyMarquee />
        <ContentSlide />
        <Faq />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
