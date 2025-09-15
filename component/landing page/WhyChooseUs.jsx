import React from "react";
import {
  Briefcase,
  Handshake,
  BarChart3,
  Rocket,
  DollarSign,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Portfolio-First Design",
    description:
      "Showcase your work beautifully with our portfolio-focused platform designed specifically for creatives.",
    icon: Briefcase,
    iconBg: "bg-blue-500",
    cardBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    border: "border-blue-200 hover:border-blue-300",
  },
  {
    title: "Quality Connections",
    description:
      "Connect with serious creatives actively looking to collaborate, not passive scrollers.",
    icon: Handshake,
    iconBg: "bg-green-500",
    cardBg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-200 hover:border-green-300",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your YouTube, Instagram performance with comprehensive analytics all in one dashboard.",
    icon: BarChart3,
    iconBg: "bg-purple-500",
    cardBg: "bg-gradient-to-br from-purple-50 to-pink-50",
    border: "border-purple-200 hover:border-purple-300",
  },
  {
    title: "Real Opportunities",
    description:
      "Access genuine collaboration opportunities and brand partnerships that match your skills.",
    icon: Rocket,
    iconBg: "bg-orange-500",
    cardBg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-200 hover:border-orange-300",
  },
  {
    title: "100% Creator Earnings",
    description:
      "Keep every penny from collaborations. No commissions, no fees - your talent, your earnings.",
    icon: DollarSign,
    iconBg: "bg-pink-500",
    cardBg: "bg-gradient-to-br from-pink-50 to-rose-50",
    border: "border-pink-200 hover:border-pink-300",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-orange-50/30"></div>

      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Creators Choose Peerpop
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to showcase, connect, and grow your creative
            career
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-md ${feature.cardBg} border ${feature.border}`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${feature.iconBg} rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
              >
                <feature.icon size={32} />
              </div>

              {/* Title */}
              <CardTitle className="text-xl font-bold mb-4 text-center text-gray-900">
                {feature.title}
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-sm text-center text-gray-600">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
