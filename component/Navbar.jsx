"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  Sparkle,
  Building2,
  Users,
  Plus,
  MessageCircle,
  Telescope,
  Search,
  User2,
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
import { getInitialLetter } from "@/utils/formatDate";
import { useConnectionStore } from "@/store/useConnectionStore";
import { Badge } from "@/components/ui/badge";
import { useConversationStore } from "@/store/useConversationStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    getConnections(); // load initial state
    listenForSocketEvents(); // keep it in sync with sockets
  }, [getConnections, listenForSocketEvents]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsPopoverOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-cyan-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkle className="text-white" />
            </div>
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                Peerpop
              </h1>
            </Link>
            <NavbarSearch />
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-9 w-9 relative overflow-visible ">
                        {user?.image && (
                          <AvatarImage
                            className="object-cover rounded-full"
                            src={user.image}
                            alt={user.username || "User Avatar"}
                          />
                        )}
                        <AvatarFallback className="font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-400">
                          {getInitialLetter(user.username)}
                        </AvatarFallback>
                        {(pendingCount > 0 || unreadConversations > 0) && (
                          <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500 z-10 ring-2 ring-white"></span>
                        )}
                      </Avatar>

                      <span className="text-gray-700 font-medium ml-2 mr-1 hidden sm:inline-block">
                        {user.username}
                      </span>

                      {isPopoverOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-700" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-700" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-56 rounded-md border bg-white shadow-md p-2"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="py-2 px-2">
                        <p className="text-sm font-medium leading-none truncate">
                          {user.username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="border-t my-2"></div>
                      <Link
                        href={
                          user.role === "BUSINESS"
                            ? `/profile/business/${user.username}`
                            : `/profile/${
                                user.username
                              }/${user?.creatorType?.toLowerCase()}`
                        }
                        passHref
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:bg-muted/60"
                        >
                          <User className="mr-2 h-4 w-4" /> profile
                        </Button>
                      </Link>
                      <Link href="/feed">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:bg-muted/60"
                        >
                          <Telescope className="mr-2 h-4 w-4" /> Explore
                        </Button>
                      </Link>
                      {user?.isAdmin && (
                        <Link href="/admin">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-700 hover:bg-muted/60"
                          >
                            <User2 className="mr-2 h-4 w-4" /> Admin
                          </Button>
                        </Link>
                      )}
                      <Link href="/connections">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:bg-muted/60 relative"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Peers
                          {pendingCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-0 rounded-full">
                              {pendingCount}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                      <Link href="/conversations">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:bg-muted/60"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" /> Messages
                          {unreadConversations > 0 && (
                            <span className=" bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                              {unreadConversations}
                            </span>
                          )}
                        </Button>
                      </Link>

                      {!user.creatorType && user.role !== "BUSINESS" && (
                        <Link href="/onboarding" passHref>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-700 hover:bg-muted/60"
                          >
                            <Settings className="mr-2 h-4 w-4" /> Onboarding
                          </Button>
                        </Link>
                      )}
                      <div className="border-t my-2"></div>
                      <Button
                        onClick={handleLogout}
                        className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Link href="/feed">
                    <Button variant="ghost" className="hover:bg-cyan-50">
                      Explore
                    </Button>
                  </Link>
                  <Link href="/login/business">
                    <Button
                      variant="outline"
                      className="border-orange-300 hover:bg-orange-50 text-orange-600 bg-transparent"
                    >
                      <Building2 />
                      Business Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg">
                      <Users />
                      Join as Creator
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu  */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-cyan-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="flex items-center space-x-3 pb-2">
                        <Avatar className="h-8 w-8">
                          {user?.image && (
                            <AvatarImage
                              className="object-cover"
                              src={user.image}
                              alt={user.username || "User Avatar"}
                            />
                          )}
                          <AvatarFallback className="font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-400 text-sm">
                            {getInitialLetter(user.username || user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium truncate">
                            {user.username}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/profile/${
                        user?.username
                      }/${user?.creatorType?.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-cyan-600"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Link href="/feed">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-cyan-600"
                      >
                        <Telescope className="mr-2 h-4 w-4" />
                        Explore
                      </Button>
                    </Link>
                    {user?.isAdmin && (
                      <Link href="/admin">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-cyan-600"
                        >
                          <User2 className="mr-2 h-4 w-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Link href="/connections">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-cyan-600"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Peers
                        {pendingCount > 0 && (
                          <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-0 rounded-full">
                            {pendingCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Link href="/conversations">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-cyan-600"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Messages
                        <span className=" bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {unreadConversations}
                        </span>
                      </Button>
                    </Link>
                    {!user.creatorType && user.role !== "BUSINESS" && (
                      <Link
                        href="/onboarding"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-700 hover:text-cyan-600"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Onboarding
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white hover:bg-red-600 justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login/business"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-orange-300 hover:bg-orange-50 text-orange-600 bg-transparent flex items-center"
                      >
                        <Building2 />
                        Business Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg flex items-center">
                        <Users />
                        Join as Creator
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
