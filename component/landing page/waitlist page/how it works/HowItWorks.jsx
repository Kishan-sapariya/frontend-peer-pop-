import React from "react";
import { motion } from "framer-motion";
import MotionSection from "../MotionSection/MotionSection"; 

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.65, 0.3, 0.9],
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

const stepsData = [
  {
    title: "Sign up for the waitlist",
    imageSrc:
      "https://image.pollinations.ai/prompt/yellow%20button%20saying%20'Join%20Waitlist'%20on%20a%20dark%20background%20with%20subtle%20yellow%20glow",
  },
  {
    title: "Get early access invite",
    imageSrc:
      "https://image.pollinations.ai/prompt/glowing%20yellow%20envelope%20with%20'Invitation'%20text%20on%20dark%20background%20abstract%20digital",
  },
  {
    title: "Set up your creative profile",
    imageSrc:
      "https://image.pollinations.ai/prompt/user%20profile%20interface%20with%20glowing%20yellow%20highlights%20on%20dark%20background%20digital%20dashboard",
  },
  {
    title: "Start collaborating",
    imageSrc:
      "https://image.pollinations.ai/prompt/abstract%20network%20of%20glowing%20yellow%20lines%20connecting%20multiple%20user%20icons%20on%20dark%20background%20collaboration%20concept",
  },
];

const HowItWorks = () => {
  return (
    <MotionSection className="py-16 md:py-24 border-b border-yellow-500/20 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="px-4 md:px-10 max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-12 md:mb-20 text-white">
          Your <span className="text-yellow-500">Path to Collaboration</span>
        </h3>

        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-stretch space-y-12 md:space-y-0 space-x-0 md:space-x-8">
          <div className="absolute top-[calc(50%+40px)] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent z-0 hidden md:block">
            <div className="absolute inset-0 blur-sm bg-yellow-500/10" />
          </div>

          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent z-0 block md:hidden">
            <div className="absolute inset-0 blur-sm bg-yellow-500/10" />
          </div>

          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-row-reverse md:flex-col items-center gap-4 md:gap-0 flex-1 text-center group relative z-10 w-full md:w-auto"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className="relative w-2/3 md:w-full h-36 md:h-48 rounded-2xl overflow-hidden mb-0 md:mb-8 
                  bg-gradient-to-br from-zinc-900/80 via-black/90 to-zinc-950/80
                  border border-yellow-500/20 shadow-xl shadow-black/50
                  group-hover:shadow-yellow-500/20 group-hover:border-yellow-500/30 transition-all duration-300"
              >
                <img
                  src={step.imageSrc}
                  alt={step.title}
                  className="w-full h-full object-cover p-2 md:p-4 rounded-2xl"
                />
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-300" />
              </div>

              <div className="relative w-1/3 md:w-auto mb-0 md:mb-6 flex justify-center md:block">
                <div
                  className="w-10 h-10 md:w-14 md:h-14 bg-yellow-500 text-black font-extrabold rounded-full flex items-center justify-center text-xl z-10 relative
                    border-2 border-yellow-500 group-hover:scale-[1.15] transition-transform 
                    shadow-xl shadow-yellow-500/20 group-hover:shadow-yellow-500/40"
                >
                  {index + 1}
                </div>
              </div>

              <p className="font-semibold text-base md:text-lg text-white max-w-[200px] leading-snug text-left md:text-center mt-4 md:mt-0">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default HowItWorks;
