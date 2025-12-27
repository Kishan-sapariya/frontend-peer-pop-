import CompanyMarquee from "@/component/landing page/CompanyMarquee";
import CTASection from "@/component/landing page/cta";
import Footer from "@/component/landing page/Footer";
import HeroSection from "@/component/landing page/HeroSection";
import SeeAction from "@/component/landing page/SeeAction";
import Stats from "@/component/landing page/Stats";
import Faq from "@/component/landing page/waitlist page/faq/Faq";
import ContentSlide from "@/component/landing page/ContentSlide"
import PeerPopWaitlist from "@/component/landing page/waitlist page/WaitlistPage";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <PeerPopWaitlist/> */}
      <HeroSection />
        <Stats />
        <SeeAction />
        <CompanyMarquee />
        <ContentSlide />
        <Faq />
        <CTASection />
        <Footer />
    </div>
  );
};

export default page;
