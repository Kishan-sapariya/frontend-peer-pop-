import CompanyMarquee from "@/component/landing page/CompanyMarquee";
import CTASection from "@/component/landing page/cta";
import Footer from "@/component/landing page/Footer";
import SeeAction from "@/component/landing page/SeeAction";
import Faq from "@/component/landing page/faq/Faq";
import ContentSlide from "@/component/landing page/ContentSlide";
import LandingHero from "@/component/landing/LandingHero";
import CreatorTypes from "@/component/landing/CreatorTypes";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <LandingHero />
      <SeeAction />
      <CreatorTypes />
      <CompanyMarquee />
      <ContentSlide />
      <Faq />
      <CTASection />
      <Footer />
    </div>
  );
};

export default page;
