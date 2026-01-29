"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Search,
  MessageSquare,
  Briefcase,
  Plus,
  Filter,
  Calendar,
  TrendingUp,
  Check,
} from "lucide-react";
import { ProfileCreationMockup } from "./ProfileCreationMockup";
import { DiscoveryMockup } from "./DiscoveryMockup";
import { ChatMockup } from "./ChatMockup";
import { CollaborationMockup } from "./CollaborateMockup";

const steps = [
  {
    step: 1,
    title: "Create Your Profile",
    description:
      "Sign up and build your profile in minutes. Share your creative work, interests, and goals. Tell us what you're looking for—mentorship, collaboration, or brand partnerships.",
    features: [
      "Add your portfolio and social links",
      "Define your creative niche and skills",
      "Get verified for authenticity",
    ],
    imageContent: <ProfileCreationMockup />,
  },
  {
    step: 2,
    title: "Discover Connections",
    description:
      "Browse through verified creators, mentors, and brands. Use our smart filters to find exactly who you're looking for. Our algorithm suggests matches based on your interests and goals.",
    features: [
      "Filter by niche, location, and experience",
      "View detailed profiles and portfolios",
      "Save favorites for later",
    ],
    imageContent: <DiscoveryMockup />,
  },
  {
    step: 3,
    title: "Start Conversations",
    description:
      "Reach out with personalized messages. Schedule video calls to get to know each other. Build genuine relationships before committing to collaborations.",
    features: [
      "Send connection requests with custom notes",
      "Chat in real-time with built-in messaging",
      "Schedule meetings with integrated calendar",
    ],
    imageContent: <ChatMockup />,
  },
  {
    step: 4,
    title: "Collaborate & Grow",
    description:
      "Work together on projects, campaigns, and creative ventures. Track your progress and celebrate wins. Build lasting relationships that help everyone grow.",
    features: [
      "Manage projects and deliverables",
      "Share files and feedback securely",
      "Leave reviews and build reputation",
    ],
    imageContent: <CollaborationMockup />,
  },
];

const FeatureListItem = ({ children }) => (
  <li className="flex items-start space-x-2 text-gray-600">
    <Check className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const StepItem = ({ stepData, reverse }) => {
  const contentOrder = reverse ? "lg:order-last" : "lg:order-first";
  const imageOrder = reverse ? "lg:order-first" : "lg:order-last";

  const content = (
    <motion.div
      className={`lg:col-span-1 ${contentOrder} p-4 md:p-0`}
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="mb-4">
        <p className="text-yellow-500 font-semibold text-sm uppercase tracking-widest">
          Step {stepData.step}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
          {stepData.title}
        </h2>
      </div>
      <p className="text-gray-600 text-lg mb-6">{stepData.description}</p>

      <ul className="space-y-3">
        {stepData.features.map((feature, index) => (
          <FeatureListItem key={index}>{feature}</FeatureListItem>
        ))}
      </ul>
    </motion.div>
  );

  const image = (
    <motion.div
      className={`lg:col-span-1 ${imageOrder} p-4 md:p-0 flex items-center justify-center`}
      initial={{ opacity: 0, x: reverse ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="w-full max-w-md aspect-video bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
        {stepData.imageContent}
      </div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-20 border-b border-gray-200 last:border-b-0">
      {content}
      {image}
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 text-gray-900 p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16 mt-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            How PeerPop <span className="text-yellow-500">Works</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to start building meaningful connections and
            growing your creative career.
          </p>
        </header>

        {/* Steps Grid */}
        <main>
          {steps.map((stepData, index) => (
            <StepItem
              key={stepData.step}
              stepData={stepData}
              reverse={index % 2 !== 0}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default HowItWorks;
