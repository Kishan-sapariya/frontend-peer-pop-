import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

// --- Theme Constants (matching your Hero Section) ---
const BG_DARK_BLUE = "";
const ACCENT_YELLOW = "#F0AF1B";

const Footer = () => {
  return (
    // Updated background color to a darker shade of blue/navy
    <footer className=" py-12 px-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-400 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* Logo icon with the accent yellow/gold */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: ACCENT_YELLOW,
                  boxShadow: `0 0 10px ${ACCENT_YELLOW}50`, // Subtle glow
                }}
              >
                <Sparkles className="w-5 h-5 text-black" />{" "}
                {/* Text-black for contrast on yellow */}
              </div>
              <h3 className="text-xl font-bold">Peerpop</h3>
            </div>
            <p className="text-gray-800">
              {" "}
              {/* Slightly lighter gray for better contrast */}
              The creative professional network where collaboration meets
              opportunity.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">Platform</h4>
            <ul className="space-y-2 text-gray-800">
              <li>
                <Link
                  href="/feed"
                  className="transition-colors text-gray-700 hover:text-gray-900"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/onboarding"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Join
                </Link>
              </li>
              <li>
                <Link
                  href="/login/business"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">
              Community
            </h4>
            <ul className="space-y-2 text-gray-800">
              <li>
                <a
                  href="#"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">
              Support
            </h4>
            <ul className="space-y-2 text-gray-800">
              <li>
                <a
                  href="#"
                  className="transition-colors text-gray-700 hover:text-gray-900"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="transition-colors  text-gray-700 hover:text-gray-900"
                >
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div
          className="border-t mt-8 pt-8 text-center text-gray-900 border-gray-700"
        >
          <p>&copy; 2025 Peerpop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
