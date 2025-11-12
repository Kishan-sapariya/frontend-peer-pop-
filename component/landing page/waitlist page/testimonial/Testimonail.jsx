// Testimonail.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MotionSection from "../MotionSection/MotionSection";

const avatarSeeds = [
  "brand-1",
  "creator-2",
  "brand-3",
  "creator-4",
  "brand-5",
  "creator-6",
];

const AvatarGrid = ({ seeds = avatarSeeds }) => (
  <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-10">
    {seeds.map((seed, i) => {
      const size = i % 2 === 0 ? 64 : 72;
      const url = `https://picsum.photos/seed/${encodeURIComponent(
        seed
      )}/${size}`;
      return (
        <motion.div
          key={seed}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.08 * i, duration: 0.45, ease: "easeOut" }}
          className="rounded-full overflow-hidden w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-zinc-900"
        >
          <img
            src={url}
            alt={`avatar-${i}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      );
    })}
  </div>
);

const AnimatedCount = ({
  to = 0,
  duration = 1500,
  format = (n) => n,
  start = false,
}) => {
  const [value, setValue] = useState(0);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!start) return; // only start animation when in view

    const startTime = performance.now();
    startTimeRef.current = startTime;

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * to);
      setValue(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [start, to, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 8 }}
      transition={{ duration: 0.6 }}
      className="font-extrabold text-4xl md:text-5xl tracking-tight text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
    >
      {format(value)}
    </motion.span>
  );
};

const Stat = ({ label, to, duration = 1500, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <AnimatedCount
        to={to}
        duration={duration}
        start={inView}
        format={(n) =>
          `${prefix}${n.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}${suffix}`
        }
      />
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-zinc-400 mt-2 font-medium text-center max-w-[160px]"
      >
        {label}
      </motion.div>
    </div>
  );
};

const Testimonail = () => {
  return (
    <MotionSection className="py-16 md:py-24 text-center border-b border-yellow-500/20 relative overflow-hidden">
      {/* soft background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-black/90 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative px-4 md:px-10 max-w-6xl mx-auto">
        <h3 className="text-xl text-yellow-500 font-semibold mb-8 uppercase tracking-widest">
          Already Trusted by Top Creators, Mentors & Brands
        </h3>

        <AvatarGrid />

        {/* Quote */}
        <div className="max-w-3xl mx-auto mb-6">
          <blockquote className="text-2xl italic font-medium text-zinc-300 border-l-4 border-yellow-500 pl-4 mb-6">
            “PeerPop helped me connect with brands that truly match my values.”
            — Creator @NextBigThing
          </blockquote>
          <p className="text-sm text-zinc-500 font-mono tracking-wide">
            Real creators. Real deals. Real growth.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center max-w-3xl mx-auto">
          <Stat label="Verified members" to={5000} duration={1800} suffix="+" />
          <Stat label="Industries covered" to={20} duration={1400} />
          <Stat
            label="Collaborations initiated"
            to={10000}
            duration={2000}
            suffix="+"
          />
        </div>
      </div>
    </MotionSection>
  );
};

export default Testimonail;
