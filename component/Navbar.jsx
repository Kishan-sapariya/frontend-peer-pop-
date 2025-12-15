"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  MessageCircle,
  HomeIcon,
  Briefcase, 
  LayoutGrid,
  ShieldCheck,
  Clock,
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
        className="relative text-black hover:bg-accent"
      >
        <Icon className="h-5 w-5 mr-1 text-black" />
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

  const PopoverLinkItem = ({ href, children, badgeCount, icon: Icon }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        onClick={() => setIsPopoverOpen(false)}
        className="w-full justify-start text-zinc-700 hover:text-black"
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
    <header className="sticky top-4 z-50 w-full flex justify-center">
      <div
        className="
				max-w-7xl w-[95%] 
				bg-yellow-500 
				rounded-2xl 
				shadow-[0_4px_20px_rgba(234,179,8,0.25)]
				border border-yellow-600/40
				px-4 sm:px-6 py-3
				flex items-center justify-between
			"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-black rounded-md">
              <Image
                src="/logo.png"
                alt="Peerpop Logo"
                width={42}
                height={42}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-xl font-bold text-black hidden sm:block">
              Peerpop
            </h1>
          </Link>

          {user && <NavbarSearch />}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
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
                    className="rounded-full p-1 flex items-center hover:bg-yellow-200/50"
                  >
                    <Avatar className="h-9 w-9">
                      {user?.image ? (
                        <AvatarImage
                          src={user.image}
                          alt={user.username}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-black text-white">
                          {getInitialLetter(user.username)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="hidden lg:inline ml-2 font-medium text-black">
                      {capitalizeInitials(user.username)}
                    </span>
                    {isPopoverOpen ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-56 rounded-lg border bg-white shadow-xl p-2"
                >
                  <PopoverLinkItem href="/groups" icon={LayoutGrid}>
                    {" "}
                    Groups{" "}
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
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/waitlist" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-black hover:bg-yellow-200/50 hover:text-black font-medium text-sm px-3 sm:px-4"
                >
                  <Clock className="h-4 w-4 mr-1" /> Waitlist
                </Button>
              </Link>
              <Link href="/login/business" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-black hover:bg-yellow-200/50 hover:text-black font-medium text-sm px-3 sm:px-4"
                >
                  <Briefcase className="h-4 w-4 mr-1" /> Business Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-black text-yellow-500 hover:bg-zinc-800 text-sm sm:text-base px-3 sm:px-4">
                  Join as Creator
                </Button>
              </Link>

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="sm:hidden p-1 h-9 w-9">
                    <Menu className="h-6 w-6 text-black" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-48 bg-white rounded-lg shadow-xl p-2"
                >
                  <PopoverLinkItem href="/business/login" icon={Briefcase}>
                    Business Login
                  </PopoverLinkItem>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
