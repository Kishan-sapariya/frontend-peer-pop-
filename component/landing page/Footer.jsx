"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

const DARK_TEXT = "text-[#041049]";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-lg flex items-center justify-center bg-black shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Peerpop Logo"
                  width={50}
                  height={50}
                  className="ml-0"
                />
              </div>
              <h3 className={`text-xl font-bold ${DARK_TEXT}`}>Peerpop</h3>
            </div>

            <p className="text-gray-800">
              The creative professional network where collaboration meets
              opportunity.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className={`font-bold mb-4 ${DARK_TEXT}`}>Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/feed"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/onboarding"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Join
                </Link>
              </li>
              <li>
                <Link
                  href="/login/business"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`font-bold mb-4 ${DARK_TEXT}`}>Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className={`transition-colors text-gray-800 hover:${DARK_TEXT}`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${DARK_TEXT}`}>Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`text-[#041049] hover:text-pink-600 transition-colors`}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className={`text-[#041049] hover:text-blue-700 transition-colors`}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className={`text-[#041049] hover:text-blue-500 transition-colors`}
                aria-label="X / Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className={`text-[#041049] hover:text-blue-800 transition-colors`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center border-yellow-700 text-gray-800">
          <p>&copy; 2025 Peerpop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
