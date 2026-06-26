"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import CTASection from "@/component/landing page/cta";
import Footer from "@/component/landing page/Footer";
import CreativeFieldsSection from "@/component/landing page/featuresSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HowItWorks = () => {
  const steps = [
    {
      stepNumber: 1,
      title: "Browse & Apply",
      description:
        "Find opportunities that match your niche and apply with your portfolio.",
    },
    {
      stepNumber: 2,
      title: "Get Selected",
      description:
        "Brands review applications and select creators that fit their campaign.",
    },
    {
      stepNumber: 3,
      title: "Create Content",
      description:
        "Work with the brand to create authentic content that resonates with your audience.",
    },
    {
      stepNumber: 4,
      title: "Get Paid",
      description:
        "Get paid promptly after your work is reviewed and accepted.",
    },
  ];

  const benefits = [
    {
      title: "Verified Brands",
      description:
        "All brands are verified and vetted to ensure legitimate opportunities and fair compensation.",
    },
    {
      title: "Secure Payments",
      description:
        "Payments are held in escrow and released when deliverables are approved, protecting both parties.",
    },
    {
      title: "Fair Rates",
      description:
        "Transparent pricing and industry-standard rates ensure you're compensated fairly for your work.",
    },
    {
      title: "Creative Freedom",
      description:
        "Maintain your authentic voice while meeting brand guidelines and campaign objectives.",
    },
    {
      title: "Support Team",
      description:
        "Our team is here to help resolve any issues and ensure smooth collaborations.",
    },
    {
      title: "Build Relationships",
      description:
        "Successful campaigns often lead to long-term partnerships and recurring opportunities.",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-b from-[#FFF8EC] via-[#FFFDF8] to-gray-50 py-16 md:py-20 flex flex-col items-center justify-center text-center px-4">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-yellow-400" /> Opportunities
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Featured <span className="text-yellow-500">Opportunities</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hand-picked brand partnerships available now for verified creators.
          </p>
        </div>

        <motion.div
          className="mt-16 w-full max-w-5xl space-y-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              title: "Fashion Week Campaign",
              budget: "₹40,000 - ₹80,000",
              category: "Fashion",
              deadline: "2 weeks left",
              location: "Remote",
            },
            {
              title: "Product Launch",
              budget: "₹12,000 - ₹20,000",
              category: "Technology",
              deadline: "1 month left",
              location: "Remote",
            },
            {
              title: "Wellness Campaign",
              budget: "₹50,000 - ₹90,000",
              category: "Health & Fitness",
              deadline: "3 weeks left",
              location: "Remote",
            },
            {
              title: "Travel Campaign",
              budget: "₹20,000 - ₹50,000",
              category: "Travel",
              deadline: "1 week left",
              location: "On-location",
            },
          ].map((opportunity, i) => (
            <motion.div key={i} variants={item}>
              <Card className="bg-white border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all">
                <CardContent className="p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {opportunity.title}
                      </h3>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        {opportunity.category}
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-yellow-500" />
                        <span>{opportunity.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span>{opportunity.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-yellow-500" />
                        <span>{opportunity.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                      <Link href="/signup">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            asChild
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            <Link href="/signup">View All Opportunities</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-200 bg-white flex flex-col items-center justify-center text-center">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-5xl px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {[
            { value: "200+", label: "Active Campaigns" },
            { value: "₹40L+", label: "Avg. Campaign Budget" },
            { value: "500+", label: "Partner Brands" },
            { value: "95%", label: "Creator Satisfaction" },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" variants={item}>
              <div className="text-4xl font-extrabold text-yellow-500">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 border-t border-gray-200 flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            How Brand Partnerships <span className="text-yellow-500">Work</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            A simple, transparent process from discovery to payment.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step) => (
              <motion.div key={step.stepNumber} variants={item}>
                <Card className="bg-white border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all h-full">
                  <CardHeader className="items-start text-left pb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-sm mb-2">
                      {step.stepNumber}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="items-start text-left pt-0">
                    <CardDescription className="text-gray-600 text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Work With Brands Section */}
      <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center bg-white border-t border-gray-200 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="w-14 h-14 inline-flex items-center justify-center rounded-full bg-yellow-500 text-black mb-4">
            <Briefcase className="h-7 w-7" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Why Work With Brands on{" "}
            <span className="text-yellow-500">PeerPop?</span>
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 place-items-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={item}
                className="w-full max-w-sm"
              >
                <Card className="bg-gray-50 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all w-full h-full">
                  <CardHeader className="items-start text-left pb-2">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="items-start text-left pt-2">
                    <CardDescription className="text-gray-600 text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CreativeFieldsSection />

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-yellow-500 py-20 md:py-32">
        <div>
          <div className="mx-auto max-w-3xl text-center px-4">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-black md:text-4xl">
              Ready to find your next brand{" "}
              <span className="text-gray-900">partnership?</span>
            </h2>
            <p className="mt-4 text-pretty text-lg text-gray-800">
              Join PeerPop and get access to exclusive opportunities from top
              brands.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                asChild
                className="bg-black hover:bg-gray-900 text-yellow-500"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;
