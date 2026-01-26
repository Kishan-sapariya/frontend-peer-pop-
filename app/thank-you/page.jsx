"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-8 p-10 bg-zinc-900/90 backdrop-blur-sm rounded-xl border border-zinc-700 shadow-2xl shadow-yellow-500/20">
        <div className="text-8xl animate-bounce-slow">🎉</div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-500 tracking-tight">
          Thanks for Joining the PeerPop Waitlist! 🙌
        </h1>

        <p className="text-lg text-zinc-300 leading-relaxed">
          You’re now part of a growing circle of creators and brands waiting to
          experience a smarter way to collaborate. Your early access invite will
          arrive in your inbox shortly.
        </p>

        <div className="space-y-4 pt-4">
          <Link href="/" passHref>
            <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold text-base px-8 py-6 transition-all duration-200 shadow-lg shadow-yellow-500/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home Page
            </Button>
          </Link>
          <p className="text-sm text-zinc-500 mt-3">
            Didn't receive an email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
