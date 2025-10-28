import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Layers,
} from "lucide-react";

// Define the feature data with icons
const features = [
  {
    icon: Users,
    title: "Find Your People",
    description:
      "Connect with mentors, peers, and collaborators who share your creative vision and values.",
    delay: 0.1,
  },
  {
    icon: DollarSign,
    title: "Brand Opportunities",
    description:
      "Access exclusive brand deals and partnerships tailored to your niche and audience.",
    delay: 0.2,
  },
  {
    icon: Layers,
    title: "Grow Together",
    description:
      "Learn from experienced mentors and share knowledge with peers in your creative community.",
    delay: 0.3,
  },
  {
    icon: ShieldCheck,
    title: "Verified Profiles",
    description:
      "Connect with confidence knowing all profiles are verified and authentic.",
    delay: 0.4,
  },
  {
    icon: Zap,
    title: "Smart Matching",
    description:
      "Our algorithm connects you with the right people based on your goals and interests.",
    delay: 0.5,
  },
  {
    icon: HeartHandshake,
    title: "Real Connections",
    description:
      "Build authentic relationships that go beyond transactions and create lasting impact.",
    delay: 0.6,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      className="p-6 py-10 bg-black/80 backdrop-blur-2xl border border-yellow-500/30 hover:border-yellow-500/60 rounded-xl shadow-xl  transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: feature.delay }}
    >
      <div className="flex items-center space-x-4 mb-4">
        {/* Icon with yellow accent circle */}
        <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500">
          <Icon className="w-6 h-6 text-yellow-500" />
        </div>
        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
      </div>
      <p className="text-gray-400 mt-2 text-sm flex-grow">
        {feature.description}
      </p>
    </motion.div>
  );
};

const ContentSlide = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12 mt-8">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl tracking-tight">
            Everything you need to <span className="text-yellow-500">Grow</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mx-auto">
            PeerPop brings together the tools, connections, and opportunities to
            accelerate your creative career.
          </p>
        </header>

        {/* Feature Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentSlide;
