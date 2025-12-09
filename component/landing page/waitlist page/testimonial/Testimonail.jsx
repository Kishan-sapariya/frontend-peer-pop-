import React from "react";
import { motion } from "framer-motion";
import MotionSection from "../MotionSection/MotionSection";

const avatarSeeds = [
  "brand-1",
  "creator-2",
  "brand-3",
  "creator-4",
  "brand-5",
  "creator-6",
];

// Avatar Grid — Updated Theme
const AvatarGrid = ({ seeds = avatarSeeds }) => (
  <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-12">
    {seeds.map((seed, i) => {
      const size = i % 2 === 0 ? 64 : 72;
      const url = `https://picsum.photos/seed/${encodeURIComponent(
        seed
      )}/${size}`;

      return (
        <motion.div
          key={seed}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.07 * i, duration: 0.45, ease: "easeOut" }}
          className="rounded-full overflow-hidden w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                     border-2 border-yellow-400 shadow-[0_0_18px_rgba(234,179,8,0.25)] bg-white"
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

const Testimonial = () => {
  return (
    <MotionSection className="py-20 md:py-28 text-center bg-white relative overflow-visible border-b border-yellow-500/20">
      {/* Soft yellow ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-yellow-50/60 via-white to-transparent pointer-events-none"
        animate={{ opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative px-4 md:px-10 max-w-6xl mx-auto">
        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-12 tracking-tight">
          <span className="text-yellow-500">Trusted</span> by Top Creators,
          Mentors & Brands
        </h3>

        <AvatarGrid />

        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <blockquote className="text-2xl md:text-3xl font-medium text-black border-l-4 border-yellow-500 pl-6 mb-6 leading-snug">
            “PeerPop helped me connect with brands that truly match my values.”
          </blockquote>

          <p className="text-sm text-zinc-500 font-medium tracking-wide">
            — Creator @NextBigThing
          </p>

          <p className="text-xs text-zinc-500 mt-2 tracking-wide">
            Real creators. Real deals. Real growth.
          </p>
        </motion.div>
      </div>
    </MotionSection>
  );
};

export default Testimonial;
