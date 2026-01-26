"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { GraduationCap, Users2, Star, TrendingUp } from "lucide-react";
import Footer from "@/component/landing page/Footer";
// Import motion from framer-motion
import { motion } from "framer-motion";

// Framer Motion Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // Stagger the children's entrance
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function MentorsPeersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center flex-1 py-24 md:py-40 text-center">
          {/* Apply motion.div to the main content container */}
          <motion.div
            className="mx-auto max-w-3xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
              variants={item}
            >
              Find Your Mentors <span className="text-yellow-500">& Peers</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300"
              variants={item}
            >
              Connect with experienced mentors who've been where you are, and
              collaborate with peers who share your creative journey.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={item}
            >
              <Button
                size="lg"
                asChild
                className="bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
              >
                <Link href="/signup">Find Mentors</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-yellow-500 bg-black text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                <Link href="/signup">Become a Mentor</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Mentorship Section */}
        <section className="border-t border-b border-gray-800 bg-gray-950 py-20 md:py-32 flex items-center justify-center">
          {/* Use motion.div for the section content with `whileInView` for scroll animation */}
          <motion.div
            className="w-full max-w-7xl px-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <motion.div variants={item}>
                <GraduationCap className="mx-auto h-12 w-12 text-yellow-500" />
                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white">
                  Learn from the <span className="text-yellow-500">best</span>
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Get guidance from experienced professionals who understand
                  your creative path and can help you avoid common pitfalls.
                </p>
              </motion.div>
            </div>

            {/* Feature Cards Container - Staggered */}
            <motion.div
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 place-items-center"
              variants={container}
            >
              {[
                [
                  "1-on-1 Sessions",
                  "Schedule personalized video calls with mentors to discuss your goals, challenges, and next steps.",
                ],
                [
                  "Portfolio Reviews",
                  "Get expert feedback on your work and learn how to present yourself to brands and collaborators.",
                ],
                [
                  "Career Guidance",
                  "Navigate the creative industry with advice from those who've successfully built their careers.",
                ],
                [
                  "Industry Insights",
                  "Stay ahead of trends and learn what's working in your niche from experienced professionals.",
                ],
                [
                  "Skill Development",
                  "Master new techniques and tools with hands-on guidance from experts in your field.",
                ],
                [
                  "Network Access",
                  "Get introductions to industry contacts and opportunities through your mentor's network.",
                ],
              ].map(([title, desc]) => (
                // Individual Card Item
                <motion.div
                  key={title}
                  variants={item}
                  className="w-full max-w-sm"
                >
                  <Card className="bg-black border border-yellow-500/20 hover:border-yellow-500/60 transition-all">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold text-yellow-500">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                        {desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Peer Collaboration Section */}
        <section className="py-20 md:py-32 flex flex-col items-center justify-center">
          <motion.div
            className="w-full max-w-7xl px-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <motion.div variants={item}>
                <Users2 className="mx-auto h-12 w-12 text-yellow-500" />
                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white">
                  Collaborate with{" "}
                  <span className="text-yellow-500">peers</span>
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  Find creators at your level to collaborate, share ideas, and
                  grow together in your creative journey.
                </p>
              </motion.div>
            </div>

            {/* Peer Cards Container - Staggered */}
            <motion.div
              className="mt-16 grid gap-8 lg:grid-cols-2 place-items-center"
              variants={container}
            >
              {/* Creative Partnerships Card */}
              <motion.div variants={item} className="max-w-lg w-full">
                <Card className="bg-black border border-yellow-500/40 hover:border-yellow-500/60 transition-all">
                  <CardContent className="pt-6">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <h3 className="mt-4 text-2xl font-bold text-yellow-500">
                      Creative Partnerships
                    </h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">
                      Team up with other creators for projects, content
                      collaborations, and joint ventures. Share audiences and
                      grow together.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Find collaborators in complementary niches
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Work on joint content and campaigns
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Cross-promote to each other's audiences
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Peer Learning Card */}
              <motion.div variants={item} className="max-w-lg w-full">
                <Card className="bg-black border border-yellow-500/40 hover:border-yellow-500/60 transition-all">
                  <CardContent className="pt-6">
                    <TrendingUp className="h-8 w-8 text-yellow-500" />
                    <h3 className="mt-4 text-2xl font-bold text-yellow-500">
                      Peer Learning
                    </h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">
                      Join communities of creators at your level. Share
                      experiences, ask questions, and learn from each other's
                      successes and challenges.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Join niche-specific creator groups
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Share tips, tools, and strategies
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1" />
                        Get feedback on your work
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-20 md:py-32 flex flex-col items-center justify-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="mx-auto max-w-3xl rounded-2xl p-8 text-center border border-yellow-500/20 md:p-12"
            variants={item}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-500">
              Start learning and growing today
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Connect with mentors and peers who will help you reach your
              creative goals faster.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" asChild className="border-black text-white">
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
        <Footer />
      </main>
    </div>
  );
}
