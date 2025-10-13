"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  Sparkle,
  Building2,
  Users,
  MessageCircle,
  Telescope,
  User2,
  HomeIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationBell from "./notifications/NotificationBell";
import { NavbarSearch } from "./NavbarSearch";
// Assuming these utils exist or using mock functions
const capitalizeInitials = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
const getInitialLetter = (s) => (s ? s.charAt(0).toUpperCase() : "");

import { useConnectionStore } from "@/store/useConnectionStore";
import { Badge } from "@/components/ui/badge";
import { useConversationStore } from "@/store/useConversationStore";

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const getConnections = useConnectionStore((s) => s.getConnections);
  const listenForSocketEvents = useConnectionStore(
    (s) => s.listenForSocketEvents
  );
  const pendingCount = useConnectionStore((s) => s.getPendingCount());
  const unreadConversations = useConversationStore((state) =>
    state.getUnreadConversationCount()
  );

  useEffect(() => {
    getConnections();
    listenForSocketEvents();
  }, [getConnections, listenForSocketEvents]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsPopoverOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // --- Utility Components with Inlined Tailwind Classes ---

  const NavItem = ({ href, children, badgeCount, icon: Icon, isMessage }) => (
    <Link href={href}>
      <Button
        variant="ghost"
        // Black Navbar: White text, subtle white BG on hover, yellow text on hover
        className="relative text-white hover:bg-white/10 hover:text-[#F0AF1B]"
      >
        {/* Icon color is white by default, gets yellow on hover */}
        <Icon className="h-5 w-5 mr-1 text-white group-hover:text-[#F0AF1B]" />
        <span className="hidden lg:inline">{children}</span>
        {badgeCount > 0 && (
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold ${
              isMessage ? "w-5 h-5" : "px-2 py-0"
            } rounded-full flex items-center justify-center`}
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </Button>
    </Link>
  );

  const PopoverLinkItem = ({
    href,
    children,
    badgeCount,
    icon: Icon,
    onClick = () => {},
  }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        onClick={() => {
          setIsPopoverOpen(false);
          onClick();
        }}
        // White Popover: Gray/Black text, light yellow BG on hover
        className="w-full justify-start text-gray-700 hover:bg-yellow-50/50 text-black hover:text-black"
      >
        <Icon className="mr-2 h-4 w-4" /> {children}
        {badgeCount > 0 && (
          <Badge className="ml-auto bg-red-500 text-white text-xs px-2 py-0 rounded-full">
            {badgeCount}
          </Badge>
        )}
      </Button>
    </Link>
  );

  // --- Main Component Render ---

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              // Yellow Background for Sparkle icon
              className="w-8 h-8 bg-[#F0AF1B] rounded-lg flex items-center justify-center shadow-lg"
            >
              <Sparkle className="text-white" />
            </div>
            <Link href="/">
              <h1
                // Yellow Text for brand name
                className="text-2xl font-bold text-[#F0AF1B] hidden sm:block"
              >
                Peerpop
              </h1>
            </Link>
            {user && <NavbarSearch />}
          </div>

          {/* Nav & Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Desktop Nav Links (Uses NavItem) */}
                <div className="hidden md:flex items-center space-x-2">
                  <NavItem href="/feed" icon={HomeIcon}>
                    Home
                  </NavItem>
                  <NavItem
                    href="/connections"
                    icon={Users}
                    badgeCount={pendingCount}
                  >
                    Peers
                  </NavItem>
                  <NavItem
                    href="/conversations"
                    icon={MessageCircle}
                    isMessage
                    badgeCount={unreadConversations}
                  >
                    Messages
                  </NavItem>
                </div>

                {/* Notifications & User Menu */}
                <NotificationBell />
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      // Subtle white BG on hover for the avatar button
                      className="h-10 rounded-full p-1 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Avatar className="h-9 w-9">
                        {user?.image && (
                          <AvatarImage
                            className="object-cover rounded-full"
                            src={user.image}
                            alt={user.username || "User Avatar"}
                          />
                        )}
                        <AvatarFallback
                          // Yellow BG for Avatar Fallback, White Text
                          className="font-semibold text-white bg-[#F0AF1B]"
                        >
                          {getInitialLetter(user.username)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium text-white ml-2 mr-1 hidden lg:inline-block">
                        {capitalizeInitials(user.username)}
                      </span>

                      {isPopoverOpen ? (
                        <ChevronUp className="h-4 w-4 hidden text-white lg:inline-block" />
                      ) : (
                        <ChevronDown className="h-4 w-4 hidden text-white lg:inline-block" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    // White Popover Content
                    className="w-56 rounded-md border border-gray-100 bg-white shadow-xl p-2"
                  >
                    <div className="flex flex-col space-y-1">
                      {/* User Info */}
                      <div className="py-2 px-2">
                        <p
                          // Black Text
                          className="text-sm font-medium leading-none truncate text-black"
                        >
                          {user.username}
                        </p>
                        <p className="text-xs leading-none truncate text-gray-500">
                          {user.email}
                        </p>
                      </div>

                      {/* Mobile Nav Links (Uses PopoverLinkItem) */}
                      <div className="md:hidden border-t border-gray-100 pt-1">
                        <PopoverLinkItem href="/feed" icon={HomeIcon}>
                          Home
                        </PopoverLinkItem>
                        <PopoverLinkItem
                          href="/connections"
                          icon={Users}
                          badgeCount={pendingCount}
                        >
                          Peers
                        </PopoverLinkItem>
                        <PopoverLinkItem
                          href="/conversations"
                          icon={MessageCircle}
                          badgeCount={unreadConversations}
                        >
                          Messages
                        </PopoverLinkItem>
                        <div className="border-t border-gray-100"></div>
                      </div>

                      {/* Profile Link (Uses PopoverLinkItem) */}
                      <PopoverLinkItem
                        href={
                          user.role === "BUSINESS"
                            ? `/profile/business/${user.username}`
                            : `/profile/${
                                user.username
                              }/${user?.creatorType?.toLowerCase()}`
                        }
                        icon={User}
                      >
                        Profile
                      </PopoverLinkItem>

                      {/* Admin Link (Uses PopoverLinkItem) */}
                      {user?.isAdmin && (
                        <PopoverLinkItem href="/admin" icon={User2}>
                          Admin
                        </PopoverLinkItem>
                      )}

                      {/* Onboarding Link (Uses PopoverLinkItem) */}
                      {!user.creatorType && user.role !== "BUSINESS" && (
                        <PopoverLinkItem href="/onboarding" icon={Settings}>
                          Onboarding
                        </PopoverLinkItem>
                      )}

                      {/* Logout Button */}
                      <div className="border-t border-gray-100 pt-1"></div>
                      <Button
                        onClick={handleLogout}
                        // Red button for logout
                        className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              // Not Authenticated
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/feed">
                    <Button
                      variant="ghost"
                      // White text, yellow text on hover
                      className="text-white hover:text-[#F0AF1B]"
                    >
                      Explore
                    </Button>
                  </Link>
                  <Link href="/login/business">
                    <Button
                      variant="outline"
                      // Yellow button, black text
                      className="bg-[#F0AF1B] text-black hover:bg-[#F0AF1B]/90 border-transparent hover:border-white"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Business Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    {/* White button, black text */}
                    <Button className="bg-white text-black hover:bg-gray-100 shadow-lg">
                      <Users className="h-4 w-4 mr-2" />
                      Join as Creator
                    </Button>
                  </Link>
                </div>

                {/* Mobile Menu for logged-out users */}
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    {/* Menu Icon - Yellow text, subtle white BG on hover */}
                    <Button
                      variant="ghost"
                      className="md:hidden text-[#F0AF1B] hover:bg-white/10"
                    >
                      <Menu className="h-7 w-7" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    // White Popover Content
                    className="w-56 rounded-md border border-gray-100 bg-white shadow-xl p-2"
                  >
                    <div className="flex flex-col space-y-1">
                      <PopoverLinkItem href="/feed" icon={Telescope}>
                        Explore
                      </PopoverLinkItem>
                      <PopoverLinkItem href="/login/business" icon={Building2}>
                        Business Login
                      </PopoverLinkItem>
                      <PopoverLinkItem href="/signup" icon={Users}>
                        Join as Creator
                      </PopoverLinkItem>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
