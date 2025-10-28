import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Briefcase, ChevronRight, Check } from "lucide-react";

// Common style for the list items (value propositions)
const ListItem = ({ children }) => (
  <li className="flex items-center space-x-2 text-gray-300">
    <Check className="w-4 h-4 text-yellow-500 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

// Card for a specific role (Creator or Brand)
const RoleCard = ({
  title,
  icon: Icon,
  description,
  features,
  ctaText,
  ctaLink,
  delay,
}) => (
  <motion.div
    className="flex flex-col p-8 bg-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 ease-in-out h-full"
    whileHover={{ y: -4 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500">
        <Icon className="w-7 h-7 text-yellow-500" />
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>

    <p className="mt-2 text-gray-400 text-lg flex-grow">{description}</p>

    <div className="mt-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-3">
        Key Benefits:
      </h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </ul>
    </div>

    <a
      href={ctaLink}
      className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-black bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200"
    >
      {ctaText}
      <ChevronRight className="ml-2 w-4 h-4" />
    </a>
  </motion.div>
);

// Main Component
const ForUsers = () => {
  const roles = [
    {
      title: "Creators",
      icon: Lightbulb,
      description:
        "Influencers, actors, musicians, artists, and content creators looking to grow their brand and find opportunities.",
      features: [
        "Find brand partnerships",
        "Connect with mentors",
        "Collaborate with peers",
      ],
      ctaText: "Join as Creator",
      ctaLink: "/signup",
      delay: 0,
    },
    {
      title: "Brands",
      icon: Briefcase,
      description:
        "Companies and agencies seeking authentic creator partnerships for campaigns and collaborations.",
      features: [
        "Discover verified creators",
        "Launch campaigns seamlessly",
        "Track performance",
      ],
      ctaText: "Get Started as a Brand",
      ctaLink: "/login/business",
      delay: 0.2,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 md:p-12 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <header className="text-center mb-12 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Built for every<span className="text-yellow-500"> creative</span>
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you're just starting out or already established, PeerPop has
            something for you.
          </p>
        </header>

        {/* Two-Column Grid for Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <RoleCard
              key={index}
              title={role.title}
              icon={role.icon}
              description={role.description}
              features={role.features}
              ctaText={role.ctaText}
              ctaLink={role.ctaLink}
              delay={role.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForUsers;
