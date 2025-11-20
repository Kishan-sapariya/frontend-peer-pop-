import React from "react";
import { Clock3, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { Laugh, Music, Camera, Mic, Clapperboard } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.17, 0.55, 0.55, 1] },
  },
};

const DecorativeOrbits = () => {
  const icons = [
    { Icon: Youtube, color: "#FF0000", label: "Youtuber" },
    { Icon: Laugh, color: "#FFB800", label: "Comedian" },
    { Icon: Instagram, color: "#FF6EEA", label: "Influencer" },
    { Icon: Music, color: "#8B5CF6", label: "Musician" },
    { Icon: Mic, color: "#F43F5E", label: "Podcaster" },
    { Icon: Camera, color: "#38BDF8", label: "Photographer" },
    { Icon: Clapperboard, color: "#A1A1AA", label: "Actor" },
  ];

  const iconPositions = [
    { x: "45%", y: "12%" },
    { x: "85%", y: "15%" },
    { x: "95%", y: "50%" },
    { x: "12%", y: "42%" },
    { x: "80%", y: "40%" },
    { x: "-2%", y: "60%" },
    { x: "3%", y: "20%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 items-center justify-center overflow-hidden z-[0] hidden md:flex">
      <div className="relative size-[135vmin] translate-y-14 max-w-[1200px] max-h-[1200px]">
        {/* Outermost ring with animated border */}
        <div className="absolute inset-0 rounded-full">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                from 0deg,
                transparent 0%,
                transparent 85%,
                rgba(234, 179, 8, 0.6) 90%,
                rgba(234, 179, 8, 1) 95%,
                rgba(234, 179, 8, 0.6) 100%
              )`,
              mask: "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
              WebkitMask:
                "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Base ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-500/20" />
        </div>

        {/* Second Ring */}
        <div className="absolute inset-[15%] rounded-full">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                from 0deg,
                transparent 0%,
                transparent 85%,
                rgba(234, 179, 8, 0.5) 90%,
                rgba(234, 179, 8, 0.8) 95%,
                rgba(234, 179, 8, 0.5) 100%
              )`,
              mask: "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
              WebkitMask:
                "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Base ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-500/15" />
        </div>

        {/* Inner ring */}
        <motion.div
          className="absolute inset-[30%] rounded-full border border-yellow-500/20"
          style={{
            background:
              "radial-gradient(circle, transparent 95%, rgba(234, 179, 8, 0.05) 100%)",
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Dotted accent ring */}
        <div
          className="absolute inset-[22%] rounded-full opacity-40"
          style={{
            border: "1px dashed rgba(234, 179, 8, 0.2)",
          }}
        />

        {icons.map(({ Icon, color, label }, i) => {
          const position = iconPositions[i];

          return (
            <OrbIcon
              key={label}
              Icon={Icon}
              color={color}
              label={label}
              delay={i * 0.1}
              style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-[38%] rounded-full bg-yellow-500/15 blur-3xl"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-[42%] rounded-full bg-yellow-400/10 blur-2xl"
          animate={{
            opacity: [0.6, 0.3, 0.6],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </div>
  );
};

const OrbIcon = ({ Icon, color, label, style, delay = 0 }) => (
  <motion.div
    style={style}
    title={label}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay,
      duration: 0.6,
      ease: [0.17, 0.55, 0.55, 1],
    }}
    whileHover={{
      scale: 1.2,
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    }}
    className="flex items-center justify-center rounded-full 
      bg-black/90 backdrop-blur-xl 
      shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_20px_rgba(234,179,8,0.25),0_4px_20px_rgba(0,0,0,0.8)]
      hover:shadow-[0_0_50px_rgba(0,0,0,0.7),0_0_30px_rgba(234,179,8,0.4),0_8px_30px_rgba(0,0,0,0.9)]
      ring-1 ring-white/10 hover:ring-white/20
      p-5 transition-all duration-300 cursor-pointer group"
  >
    <Icon
      className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
      style={{ color }}
    />
    {/* Icon color glow on hover */}
    <motion.div
      className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);

const HeroSectionWaitlist = ({ openForm }) => {
  return (
    <section className="relative py-28 md:py-40 text-center overflow-hidden border-b border-yellow-500/20 min-h-[85vh] flex items-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-zinc-950 to-black" />

      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-transparent to-black/70" />

      <motion.div
        animate={{ opacity: [0.4, 0.2, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/30 rounded-full mix-blend-soft-light blur-[150px] opacity-40"
      />

      <motion.div
        animate={{ opacity: [0.3, 0.15, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full mix-blend-soft-light blur-[150px] opacity-30"
      />

      <DecorativeOrbits />

      <div className="relative z-10 px-4 max-w-4xl mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-7 tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Exclusive Access. <br />
            <span className="relative inline-block text-yellow-500 drop-shadow-[0_0_40px_rgba(234,179,8,0.8)]">
              Infinite Opportunities.
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Thousands of creators, mentors, and brands have already joined
            PeerPop's Elite Network. Be next in line to unlock premium
            collaborations and growth.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            onClick={openForm}
            className="group relative bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-lg px-8 py-4 rounded-xl 
              shadow-[0_8px_40px_rgba(234,179,8,0.5),0_0_50px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_50px_rgba(234,179,8,0.7),0_0_70px_rgba(234,179,8,0.4)] 
              transition-all duration-400 focus:ring-4 focus:ring-yellow-500/50"
          >
            <span className="flex items-center justify-center gap-3">
              <Clock3 className="h-5 w-5" />
              Join Waitlist
            </span>
          </motion.button>

          <motion.a
            href="#benefits"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 
              font-semibold text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] 
              transition-all duration-400 flex items-center justify-center"
          >
            See Benefits
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[1]" />
    </section>
  );
};

export default HeroSectionWaitlist;
