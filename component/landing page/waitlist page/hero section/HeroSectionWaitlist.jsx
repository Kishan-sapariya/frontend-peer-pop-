import React from "react";
import { Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCount from "../AnimatedCount";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.17, 0.55, 0.55, 1] },
  },
};

// ⭐ Perfect full-screen scalable orbit background
const DecorativeOrbits = () => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-center overflow-visible z-0">
      <div className="relative size-[160vmin] translate-y-[-36vh]">
        {/* Outer Ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(234,179,8,0.35)"
            strokeWidth="0.35"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Middle Ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="rgba(234,179,8,0.28)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
    </div>
  );
};

const PremiumHero = ({ openForm }) => {
  const [email, setEmail] = React.useState("");

  return (
    <section className="relative flex flex-col items-center text-center bg-white pb-32">
      {/* Background */}
      <DecorativeOrbits />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 md:pt-32">
        {/* Headline */}
        <motion.h2
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-4xl text-black md:text-6xl font-extrabold leading-tight mb-5"
        >
          Exclusive Access. <br />
          <span className="text-yellow-500">Infinite Opportunities.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 text-lg max-w-2xl mx-auto mb-10"
        >
          Thousands of creators, mentors, and brands have already joined
          PeerPop’s Elite Network. Be next in line to unlock premium
          collaborations and growth.
        </motion.p>

        {/* CTA BAR — cleaner, slimmer, premium */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.35 }}
          className="flex flex-col w-full items-center justify-center"
        >
          <button
            onClick={openForm}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-16 py-3 rounded-full text-black font-bold shadow-[0_8px_32px_rgba(234,179,8,0.5)] text-sm md:text-base transition-transform active:scale-95"
          >
            <Clock3 className="h-4 w-4" />
            Join Waitlist
          </button>
        </motion.div>
      </div>

      {/* ⭐ Dashboard IMAGE placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="sm:flex relative hidden z-10 mt-20 w-full max-w-5xl mx-auto"
      >
        <img
          className="w-full h-full rounded-3xl shadow-xl border border-yellow-300/40 flex items-center justify-center text-xl text-yellow-800 font-semibold object-cover"
          src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1764912675/Frame_48_rsh292.png"
        />
      </motion.div>

      {/* ⭐ Animated STATS */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative z-10 mt-24 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
      >
        {/* STAT 1 */}
        <div className="flex flex-col items-center">
          <AnimatedCount to={5000} duration={1500} suffix="+" />
          <p className="text-zinc-500 mt-2 text-sm">Active Creators</p>
        </div>

        {/* STAT 2 */}
        <div className="flex flex-col items-center">
          <AnimatedCount to={500} duration={1500} suffix="+" />
          <p className="text-zinc-500 mt-2 text-sm">Brand Partners</p>
        </div>

        {/* STAT 3 */}
        <div className="flex flex-col items-center">
          <AnimatedCount to={8000} duration={1500} suffix="+" />
          <p className="text-zinc-500 mt-2 text-sm">Deals Activated</p>
        </div>
      </motion.div>
    </section>
  );
};

export default PremiumHero;
