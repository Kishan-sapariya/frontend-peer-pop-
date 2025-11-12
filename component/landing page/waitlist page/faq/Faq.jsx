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
    <MotionSection className="py-16 md:py-24 border-b border-yellow-500/20">
      <div className="px-4 md:px-10 max-w-4xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
          Questions? <span className="text-yellow-500">We Have Answers.</span>
        </h3>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              q: "Who can join PeerPop?",
              a: "PeerPop is designed for serious creators (all niches) and established brands looking for authentic, high-value collaborations. We review profiles to maintain a high-quality, professional network.",
            },
            {
              q: "When will I get early access?",
              a: "Access is granted in batches to ensure a smooth onboarding experience. Waitlist members will be prioritized and notified via email when their spot opens up, usually within the next few months.",
            },
            {
              q: "Is joining the waitlist free?",
              a: "Yes, joining the waitlist is completely free. We reserve the right to introduce premium tiers or paid features upon full launch, but your early access benefits are guaranteed.",
            },
            {
              q: "What makes PeerPop different from other creator platforms?",
              a: "PeerPop focuses exclusively on quality over quantity. Our proprietary matchmaking algorithm prioritizes value alignment, transparency, and long-term relationships, moving beyond simple transactional postings.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-b border-zinc-700 bg-zinc-900/90 rounded-lg p-0"
              >
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline text-yellow-500 hover:text-yellow-400 p-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 p-4 pt-0">
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
