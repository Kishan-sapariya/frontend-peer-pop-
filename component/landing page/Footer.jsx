"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

const linkCls = "text-gray-800 transition-colors hover:text-black";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex items-center justify-center rounded-lg bg-black p-1.5 shadow-lg">
                <Image src="/logo.png" alt="PeerPop Logo" width={28} height={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">PeerPop</h3>
            </div>
            <p className="text-gray-800">
              The creative professional network where collaboration meets
              opportunity.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="mb-4 font-bold text-gray-900">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/feed" className={linkCls}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className={linkCls}>
                  Join
                </Link>
              </li>
              <li>
                <Link href="/login/business" className={linkCls}>
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 font-bold text-gray-900">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className={linkCls}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className={linkCls}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkCls}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={linkCls}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-gray-900">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/officialpeerpop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 transition-colors hover:text-pink-700"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Peer-pop/61581827147498/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 transition-colors hover:text-blue-800"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/109996653/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 transition-colors hover:text-blue-900"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/10 pt-8 text-center text-sm text-gray-700">
          <p>&copy; 2025 PeerPop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
