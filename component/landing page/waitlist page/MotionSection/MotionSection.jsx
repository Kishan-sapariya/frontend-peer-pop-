import { motion } from "framer-motion";

const MotionSection = ({ children, className, delay = 0 }) => (
  <motion.section
    className={className}
    initial={false}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
      amount: 0.1,
    }}
    transition={{
      duration: 0.8,
      delay: delay,
    }}
  >
    {children}
  </motion.section>
);

export default MotionSection;
