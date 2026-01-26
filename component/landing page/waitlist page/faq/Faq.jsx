"use client";

import React from "react";
import MotionSection from "../MotionSection/MotionSection";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <MotionSection className="py-20 md:py-28 bg-white relative">
      <div className="px-4 md:px-10 max-w-4xl mx-auto">
        {/* Heading */}
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-14 text-black">
          Questions? <span className="text-yellow-500">We Have Answers.</span>
        </h3>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-5">
          {[
            {
              q: "Who can join PeerPop?",
              a: "PeerPop is designed for serious creators (all niches) and established brands looking for high-value collaborations. We review profiles to maintain a professional, growth-focused network.",
            },
            {
              q: "When will I get early access?",
              a: "Access is granted in batches so onboarding remains smooth. Waitlist members are prioritized and typically receive access within the next few months.",
            },
            {
              q: "Is joining the waitlist free?",
              a: "Yes. The waitlist is completely free. Future premium features may exist, but early members retain exclusive benefits regardless.",
            },
            {
              q: "What makes PeerPop different?",
              a: "PeerPop prioritizes meaningful connections, not just transactions. Our matchmaking focuses on alignment, transparency, and long-term partnerships.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="rounded-xl border border-yellow-300/50 bg-amber-100 hover:shadow-xl px-2"
              >
                <AccordionTrigger className="text-left font-semibold text-lg text-black hover:text-yellow-600 py-4 px-2">
                  {faq.q}
                </AccordionTrigger>

                <AccordionContent className="text-zinc-600 text-base px-2 pb-4 pt-0 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </MotionSection>
  );
};

export default Faq;
