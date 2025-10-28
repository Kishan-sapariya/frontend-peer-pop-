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
  HelpCircle, // New icon for 'How It Works'
  Briefcase, // New icon for 'Opportunities'
  Info, // New icon for 'About'
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
import { useConnectionStore } from "@/store/useConnectionStore";
import { Badge } from "@/components/ui/badge";
import { useConversationStore } from "@/store/useConversationStore";
import { capitalizeInitials, getInitialLetter } from "@/utils/formatDate";

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
    // Only fetch connections and listen for socket events if authenticated
    if (isAuthenticated) {
      getConnections();
      listenForSocketEvents();
    }
  }, [isAuthenticated, getConnections, listenForSocketEvents]);

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

  const NavItem = ({ href, children, badgeCount, icon: Icon, isMessage }) => (
    <Link href={href}>
      <Button
        variant="ghost"
        className="relative text-white hover:bg-white/10 hover:text-[#F0AF1B]"
      >
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
        className="w-full justify-start text-gray-700 hover:text-black"
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

  const PublicNavItem = ({ href, children, icon: Icon }) => (
    <Link href={href}>
      <Button
        className="bg-black text-white hover:text-[#F0AF1B] hidden md:flex"
      >
        <span className="hidden lg:inline">{children}</span>
        <Icon className="h-5 w-5 mr-1 text-white group-hover:text-[#F0AF1B] lg:hidden" />
      </Button>
    </Link>
  );

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#F0AF1B] rounded-lg flex items-center justify-center shadow-lg">
              <Sparkle className="text-white" />
            </div>
            <Link href="/">
              <h1 className="text-2xl font-bold text-[#F0AF1B] hidden sm:block">
                Peerpop
              </h1>
            </Link>
            {user && <NavbarSearch />}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
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

                <NotificationBell />
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
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
                        <AvatarFallback className="font-semibold text-white bg-[#F0AF1B]">
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
                    className="w-56 rounded-md border border-gray-100 bg-white shadow-xl p-2"
                  >
                    <div className="flex flex-col space-y-1">
                      {/* User Info */}
                      <div className="py-2 px-2">
                        <p className="text-sm font-medium leading-none truncate text-black">
                          {user.username}
                        </p>
                        <p className="text-xs leading-none truncate text-gray-500">
                          {user.email}
                        </p>
                      </div>

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

                      {user?.isAdmin && (
                        <PopoverLinkItem href="/admin" icon={User2}>
                          Admin
                        </PopoverLinkItem>
                      )}

                      {!user.creatorType && user.role !== "BUSINESS" && (
                        <PopoverLinkItem href="/onboarding" icon={Settings}>
                          Onboarding
                        </PopoverLinkItem>
                      )}

                      <div className="border-t border-gray-100 pt-1"></div>
                      <Button
                        onClick={handleLogout}
                        className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <PublicNavItem href="/about" icon={Info}>
                    About
                  </PublicNavItem>
                  <PublicNavItem href="/how-it-works" icon={HelpCircle}>
                    How It Works
                  </PublicNavItem>
                  <PublicNavItem href="/opportunities" icon={Briefcase}>
                    Opportunities
                  </PublicNavItem>
                  <PublicNavItem href="/mentors&peers" icon={Briefcase}>
                    Mentors & Peers
                  </PublicNavItem>
                </div>

                <div className="flex items-center space-x-4">
                  <Link href="/login/business" className="hidden md:block">
                    <Button
                      variant="outline"
                      className="bg-[#F0AF1B] text-black hover:bg-[#F0AF1B]/90 border-transparent"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Business Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="hidden md:block">
                    <Button className="bg-white text-black hover:bg-gray-100 shadow-lg">
                      <Users className="h-4 w-4 mr-2" />
                      Join as Creator
                    </Button>
                  </Link>
                </div>

                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="md:hidden text-[#F0AF1B] hover:bg-white/10"
                    >
                      <Menu className="h-7 w-7" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-56 rounded-md border border-gray-100 bg-white shadow-xl p-2"
                  >
                    <div className="flex flex-col space-y-1">
                      <PopoverLinkItem href="/feed" icon={Telescope}>
                        Explore
                      </PopoverLinkItem>
                      <PopoverLinkItem href="/how-it-works" icon={HelpCircle}>
                        How It Works
                      </PopoverLinkItem>
                      <PopoverLinkItem href="/opportunities" icon={Briefcase}>
                        Opportunities
                      </PopoverLinkItem>
                      <PopoverLinkItem href="/about" icon={Info}>
                        About
                      </PopoverLinkItem>
                      <div className="border-t border-gray-100 pt-1"></div>
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
