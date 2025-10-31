import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Briefcase, ChevronRight, Check } from "lucide-react";

const ListItem = ({ children }) => (
  <motion.li
    variants={fadeUp}
    className="flex items-center space-x-2 text-gray-300"
  >
    <Check className="w-4 h-4 text-yellow-500 flex-shrink-0" />
    <span>{children}</span>
  </motion.li>
);

// --- Motion Variants ---
const pageContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.25,
    },
  },
};

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

// --- Card Component ---
const RoleCard = ({
  title,
  icon: Icon,
  description,
  features,
  ctaText,
  ctaLink,
}) => (
  <motion.div variants={fadeUp}>
    <motion.div
      variants={cardContainer}
      whileHover={{ y: -6, boxShadow: "0 10px 20px rgba(255, 215, 0, 0.2)" }}
      className="flex flex-col p-8 bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition-all duration-300 ease-in-out h-full"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500">
          <Icon className="w-7 h-7 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-2 text-gray-400 text-lg flex-grow"
      >
        {description}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-3">
          Key Benefits:
        </h3>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <ListItem key={i}>{feature}</ListItem>
          ))}
        </ul>
      </motion.div>

      <motion.a
        variants={fadeUp}
        href={ctaLink}
        className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-black bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200"
      >
        {ctaText}
        <ChevronRight className="ml-2 w-4 h-4" />
      </motion.a>
    </motion.div>
  </motion.div>
);

// --- Page Component ---
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
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={pageContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.header variants={fadeUp} className="text-center mb-12 mt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Built for every <span className="text-yellow-500">creative</span>
            </h1>
            <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
              Whether you're just starting out or already established, PeerPop
              has something for you.
            </p>
          </motion.header>

          <motion.div
            variants={pageContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {roles.map((role, i) => (
              <RoleCard key={i} {...role} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForUsers;
