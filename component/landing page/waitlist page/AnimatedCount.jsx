import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedCount = ({ to, duration = 1500, suffix = "" }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  // Detect when the element enters viewport
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return; // Start only when visible

    let start = 0;
    const increment = to / (duration / 16);

    const tick = () => {
      start += increment;

      if (start < to) {
        setValue(Math.floor(start));
        requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="text-yellow-500 font-extrabold text-3xl md:text-5xl"
    >
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCount;
