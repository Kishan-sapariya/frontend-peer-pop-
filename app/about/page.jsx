import React from "react";
import {
  Target,
  Heart,
  Users,
  Handshake,
  Aperture,
  Zap,
  CheckCircle,
} from "lucide-react";
import CTASection from "@/component/landing page/cta";
import Footer from "@/component/landing page/Footer";

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We're constantly evolving to meet the changing needs of the creative community.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description:
      "We operate with transparency and always put our community first.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "We welcome creators from all backgrounds and celebrate diverse perspectives.",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description:
      "We strive for the highest quality in everything we build and every interaction we have.",
  },
];

const ValueCard = ({ value }) => {
  const Icon = value.icon;
  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl flex flex-col items-center text-center h-full transition-all duration-300 hover:border-yellow-500 hover:shadow-lg">
      <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500 mb-4">
        <Icon className="w-6 h-6 text-yellow-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
      <p className="text-gray-400 text-sm">{value.description}</p>
    </div>
  );
};

const AboutUs = () => {
  return (
    <>
      <div className="bg-black text-white font-sans p-4 sm:p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* === Header and Main Mission === */}
          <header className="text-center mb-16 mt-8">
            <p className="text-yellow-500 font-semibold text-sm uppercase tracking-widest mb-2">
              About PeerPop
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Building the future of{" "}
              <span className="text-yellow-500">creative collaboration</span>
            </h1>
            <p className="mt-4 text-xl text-gray-400 max-w-4xl mx-auto">
              PeerPop was founded on the belief that authentic connections drive
              the best creative work. We're here to make those connections
              happen.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Our Mission */}
            <div className="p-8 bg-gray-900 rounded-xl shadow-lg border border-yellow-500/50 lg:col-span-1 transition-all duration-300 hover:shadow-yellow-500/20">
              <Target className="w-8 h-8 text-yellow-500 mb-3" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Our Mission
              </h2>
              <p className="text-gray-300">
                To empower creators, mentors, and brands to build meaningful
                relationships that drive authentic collaboration and sustainable
                creative careers.
              </p>
            </div>

            {/* Core Beliefs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500/50">
                <h3 className="flex items-center text-xl font-bold text-yellow-500 mb-2">
                  <Heart className="w-5 h-5 mr-2" /> Authenticity First
                </h3>
                <p className="text-gray-300">
                  We believe the best partnerships are built on genuine
                  connections, not just transactions. Every feature we build
                  prioritizes real relationships.
                </p>
              </div>
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500/50">
                <h3 className="flex items-center text-xl font-bold text-yellow-500 mb-2">
                  <Aperture className="w-5 h-5 mr-2" /> Community Driven
                </h3>
                <p className="text-gray-300">
                  Our platform is shaped by feedback from creators, mentors, and
                  brands. We're building this together with the people who use
                  it every day.
                </p>
              </div>
            </div>
          </div>

          {/* === Our Story Section === */}
          <section className="my-20 p-8 md:p-12 bg-gray-900 rounded-xl border border-gray-700 transition-all duration-300 hover:border-yellow-500/50">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-500 mb-4">
              Our Story
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <p className="mb-4">
                  PeerPop started in 2023 when our founders, both former
                  creators themselves, recognized a gap in the market. While
                  there were plenty of platforms for finding brand deals or
                  networking, none truly focused on building the authentic
                  relationships that lead to the best creative work.
                </p>
                <p>
                  They experienced firsthand how transformative the right mentor
                  or peer collaboration could be. They also saw how brands
                  struggled to find creators who genuinely aligned with their
                  values, not just their follower counts.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  So they built PeerPop—a platform designed from the ground up
                  to prioritize quality connections over quantity. A place
                  where creators could find mentors who've walked their path,
                  collaborate with peers who share their vision, and partner
                  with brands that truly get them.
                </p>
                <p className="font-semibold text-white">
                  Today, PeerPop serves thousands of creators, mentors, and
                  brands across every creative niche. We're proud to have
                  facilitated millions in brand deals and countless mentorship
                  relationships that have changed careers.
                </p>
              </div>
            </div>
          </section>

          {/* === Our Values Section === */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Our <span className="text-yellow-500">Values</span>
              </h2>
              <p className="mt-2 text-lg text-gray-400">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <ValueCard key={value.title} value={value} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <CTASection />
      <Footer />
    </>
  );
};

export default AboutUs;
