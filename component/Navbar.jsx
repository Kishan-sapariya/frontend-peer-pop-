"use client";

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  ChevronDown,
  User,
  Users,
  MessageCircle,
  HomeIcon,
  Briefcase,
  LayoutGrid,
  ShieldCheck,
  Home,
  Info,
  Zap,
  Lightbulb,
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
import Image from "next/image";

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const hasInitialized = useRef(false);

  // Use specific selectors to avoid unnecessary re-renders
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getConnections = useConnectionStore((s) => s.getConnections);
  const listenForSocketEvents = useConnectionStore((s) => s.listenForSocketEvents);
  const connections = useConnectionStore((s) => s.connections);
  const conversations = useConversationStore((state) => state.conversations);

  // Compute counts from state instead of calling methods (avoids re-renders)
  const pendingCount = useMemo(() => {
    if (!connections || !user) return 0;
    return connections.filter(
      (c) => c.status === "PENDING" && c.receiverId === user.id
    ).length;
  }, [connections, user]);

  const unreadConversations = useMemo(() => {
    return conversations?.filter((c) => c.unreadCount > 0)?.length || 0;
  }, [conversations]);

  useEffect(() => {
    // Only initialize once when authenticated
    if (isAuthenticated && !hasInitialized.current) {
      hasInitialized.current = true;
      getConnections();
      listenForSocketEvents();
    }
    // Reset when logged out
    if (!isAuthenticated) {
      hasInitialized.current = false;
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
        className="relative text-black/80 hover:text-black hover:bg-black/10 transition-all duration-200 rounded-lg"
      >
        <Icon className="h-5 w-5 mr-1" />
        <span className="hidden lg:inline font-medium">{children}</span>

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

  const PopoverLinkItem = ({ href, children, badgeCount, icon: Icon }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        onClick={() => setIsPopoverOpen(false)}
        className="w-full justify-start text-zinc-600 hover:text-black hover:bg-yellow-50 transition-all duration-200"
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-2 sm:p-3">
      <div className="max-w-7xl w-[98%] sm:w-[95%] bg-yellow-500 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg shadow-black/10 px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href={user ? "/feed" : "/"} className="flex items-center gap-2 shrink-0">
            <div className="bg-black rounded-md">
              <Image
                src="/logo.png"
                alt="Peerpop Logo"
                width={36}
                height={36}
                className="rounded-lg sm:w-[42px] sm:h-[42px]"
              />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-black hidden sm:block">
              Peerpop
            </h1>
          </Link>
          {user && <NavbarSearch />}
        </div>

        {/* Desktop Links (Non-Authenticated) */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center gap-1">
            <NavItem href="/about" icon={Info}>
              About
            </NavItem>
            <NavItem href="/how-it-works" icon={Zap}>
              How it Works
            </NavItem>
            <NavItem href="/opportunities" icon={Lightbulb}>
              Opportunities
            </NavItem>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-1">
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
                    className="group rounded-lg sm:rounded-xl px-1 sm:px-2 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 bg-transparent sm:bg-black/5 hover:bg-black/10 sm:hover:bg-black/15 border-none sm:border sm:border-transparent sm:hover:border-black/10 transition-all duration-300 ease-out"
                  >
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 ring-0 sm:ring-2 sm:ring-black/20 sm:group-hover:ring-black/40 transition-all duration-300">
                      {user?.image ? (
                        <AvatarImage
                          src={user.image}
                          alt={user.username}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-black text-yellow-500 font-semibold text-xs sm:text-sm">
                          {getInitialLetter(user.username)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="hidden lg:inline font-medium text-black/80 group-hover:text-black transition-colors duration-200">
                      {capitalizeInitials(user.username)}
                    </span>
                    <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 text-black/60 group-hover:text-black transition-all duration-300 ${isPopoverOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-56 rounded-lg border bg-white shadow-xl p-2"
                >
                  {/* Mobile-only nav links */}
                  <div className="md:hidden">
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
                    <div className="border-t my-2"></div>
                  </div>

                  <PopoverLinkItem href="/groups" icon={LayoutGrid}>
                    Groups
                  </PopoverLinkItem>
                  <PopoverLinkItem
                    href={
                      user.role === "BUSINESS"
                        ? `/profile/business/${user.username}`
                        : !user.creatorType
                        ? "/onboarding"
                        : `/profile/${
                            user.username
                          }/${user.creatorType.toLowerCase()}`
                    }
                    icon={User}
                  >
                    Profile
                  </PopoverLinkItem>

                  {user?.isAdmin && (
                    <PopoverLinkItem href="/admin" icon={ShieldCheck}>
                      Admin
                    </PopoverLinkItem>
                  )}

                  <div className="border-t mt-2 pt-2">
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/home" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-black/80 hover:text-black hover:bg-black/10 font-medium text-sm px-3 sm:px-4 transition-all duration-200"
                >
                  <Home className="h-4 w-4 mr-1" /> Home
                </Button>
              </Link>

              {/* Mobile Menu for Guest Users */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="md:hidden p-1 h-8 w-8 sm:h-9 sm:w-9 hover:bg-black/10 transition-all duration-200">
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-52 bg-white rounded-lg shadow-xl p-2"
                >
                  <PopoverLinkItem href="/home" icon={Home}>
                    Home
                  </PopoverLinkItem>
                  <PopoverLinkItem href="/about" icon={Info}>
                    About
                  </PopoverLinkItem>
                  <PopoverLinkItem href="/how-it-works" icon={Zap}>
                    How it Works
                  </PopoverLinkItem>
                  <PopoverLinkItem href="/opportunities" icon={Lightbulb}>
                    Opportunities
                  </PopoverLinkItem>
                  <div className="border-t my-2"></div>
                  <PopoverLinkItem href="/business/login" icon={Briefcase}>
                    Business Login
                  </PopoverLinkItem>
                  <Link href="/login" className="block mt-2">
                    <Button className="w-full bg-black text-yellow-500 hover:bg-zinc-800 transition-all duration-200">
                      Login
                    </Button>
                  </Link>
                </PopoverContent>
              </Popover>

              <Link href="/login" className="hidden sm:block">
                <Button className="bg-black text-yellow-500 hover:bg-zinc-800 hover:scale-105 transition-all duration-200 shadow-md">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
