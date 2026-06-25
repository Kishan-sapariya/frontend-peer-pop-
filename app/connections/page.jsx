"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useConnectionStore } from "../../store/useConnectionStore";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from "../../component/LoadingSpinner";
import {
  Users,
  UserPlus,
  Send,
  UserCheck,
  X,
  Inbox,
  Search,
  Sparkles,
  ArrowRight,
  Heart,
  ArrowLeft,
  MapPin,
  Eye,
  Clock,
  Filter,
  Loader2,
} from "lucide-react";
import { getInitialLetter } from "../../utils/formatDate";
import ConfirmDialog from "@/components/ui/confirm-dialog";

// Creator type options for filtering
const CREATOR_TYPES = [
  { label: "All", value: "" },
  { label: "YouTuber", value: "YOUTUBER" },
  { label: "Comedian", value: "COMEDIAN" },
  { label: "Influencer", value: "INFLUENCER" },
  { label: "Musician", value: "MUSICIAN" },
  { label: "Dancer", value: "DANCER" },
  { label: "Photographer", value: "PHOTOGRAPHER" },
  { label: "Podcaster", value: "PODCASTER" },
  { label: "Actor", value: "ACTOR" },
];

// Skeleton Card Component
function SkeletonCard() {
  return (
    <Card className="border border-gray-100 shadow-md rounded-2xl bg-white overflow-hidden">
      <CardHeader className="p-0 relative h-28">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </CardHeader>
      <div className="relative px-5">
        <div className="w-20 h-20 absolute -top-10 rounded-full bg-gray-200 animate-pulse ring-4 ring-white"></div>
      </div>
      <CardContent className="px-5 pt-14 pb-5">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConnectionsPage() {
  const { user, results, fetchSearchResults, loadMore, loading, hasMore, resetSearch } = useAuthStore();
  const {
    connections,
    getConnections,
    acceptRequest,
    rejectRequest,
    deleteRequest,
    sendConnectionRequest,
  } = useConnectionStore();

  const [filter, setFilter] = useState("PENDING");
  const [showDiscover, setShowDiscover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreatorType, setSelectedCreatorType] = useState("");
  const [sendingTo, setSendingTo] = useState(null); // Track which user we're sending request to
  const [hasFetchedDiscover, setHasFetchedDiscover] = useState(false);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  // Fetch creators when discover mode is activated (with caching)
  useEffect(() => {
    if (showDiscover && !hasFetchedDiscover) {
      fetchSearchResults("", "", "", 12);
      setHasFetchedDiscover(true);
    }
  }, [showDiscover, hasFetchedDiscover, fetchSearchResults]);

  // Debounced search - only triggers when search query or filter changes (not on initial load)
  const prevSearchRef = useRef({ query: "", type: "" });
  useEffect(() => {
    if (!showDiscover) return;

    // Skip if nothing changed (initial load is handled by the other effect)
    if (
      prevSearchRef.current.query === searchQuery &&
      prevSearchRef.current.type === selectedCreatorType
    ) {
      return;
    }

    prevSearchRef.current = { query: searchQuery, type: selectedCreatorType };

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(searchQuery, selectedCreatorType, "", 12);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedCreatorType, showDiscover, fetchSearchResults]);

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    if (showDiscover && loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      });
      observerRef.current.observe(loadMoreRef.current);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [showDiscover, handleObserver]);

  const handleDiscoverClick = () => {
    setShowDiscover(true);
  };

  const handleBackToConnections = () => {
    setShowDiscover(false);
    // Don't reset search - keep results cached
  };

  // Get connection status for a user
  const getConnectionStatus = useCallback(
    (creatorId) => {
      const connection = connections.find(
        (c) =>
          (c.senderId === user?.id && c.receiverId === creatorId) ||
          (c.receiverId === user?.id && c.senderId === creatorId)
      );

      if (!connection) return null;

      if (connection.status === "ACCEPTED") return "connected";
      if (connection.senderId === user?.id) return "sent";
      if (connection.receiverId === user?.id) return "pending";
      return null;
    },
    [connections, user?.id]
  );

  // Handle sending connection request
  const handleConnect = async (e, creatorId) => {
    e.preventDefault();
    e.stopPropagation();
    setSendingTo(creatorId);
    try {
      await sendConnectionRequest(creatorId);
      await getConnections(); // Refresh connections
    } finally {
      setSendingTo(null);
    }
  };

  // Filter results to exclude current user
  const filteredResults = useMemo(() => {
    return results.filter((creator) => creator.id !== user?.id);
  }, [results, user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredConnections = connections.filter((conn) => {
    if (filter === "ALL") return conn.status === "ACCEPTED";
    if (filter === "PENDING")
      return conn.status === "PENDING" && conn.receiverId === user?.id;
    if (filter === "SENT")
      return conn.senderId === user?.id && conn.status === "PENDING";
    return true;
  });

  const getConnectionCounts = () => ({
    ALL: connections.filter((c) => c.status === "ACCEPTED").length,
    PENDING: connections.filter(
      (c) => c.status === "PENDING" && c.receiverId === user?.id
    ).length,
    SENT: connections.filter(
      (c) => c.senderId === user?.id && c.status === "PENDING"
    ).length,
  });

  const counts = getConnectionCounts();

  const getEmptyState = () => {
    if (filter === "PENDING") {
      return {
        icon: Inbox,
        iconBg: "bg-gradient-to-br from-amber-100 to-yellow-100",
        iconColor: "text-amber-500",
        title: "No pending requests",
        description:
          "When someone wants to connect with you, their request will appear here.",
        action: null,
      };
    }
    if (filter === "ALL") {
      return {
        icon: Heart,
        iconBg: "bg-gradient-to-br from-pink-100 to-rose-100",
        iconColor: "text-pink-500",
        title: "No connections yet",
        description:
          "Start building your network! Discover creators and send connection requests.",
        action: (
          <Button
            onClick={handleDiscoverClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-xl mt-4"
          >
            <Search className="h-4 w-4 mr-2" />
            Discover Creators
          </Button>
        ),
      };
    }
    return {
      icon: Send,
      iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
      iconColor: "text-blue-500",
      title: "No sent requests",
      description:
        "You haven't sent any connection requests yet. Find interesting people to connect with!",
      action: (
        <Button
          onClick={handleDiscoverClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-xl mt-4"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Discover Creators
        </Button>
      ),
    };
  };

  const emptyState = getEmptyState();
  const EmptyIcon = emptyState.icon;

  // Render connection status button for a creator
  const renderConnectionButton = (creator, status) => {
    const isSending = sendingTo === creator.id;

    if (status === "connected") {
      return (
        <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <UserCheck className="w-4 h-4" />
          Connected
        </div>
      );
    }

    if (status === "sent") {
      return (
        <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
          <Clock className="w-4 h-4" />
          Request Sent
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
          <Inbox className="w-4 h-4" />
          Pending
        </div>
      );
    }

    return (
      <Button
        size="sm"
        onClick={(e) => handleConnect(e, creator.id)}
        disabled={isSending}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-lg"
      >
        {isSending ? (
          <>
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 mr-1.5" />
            Connect
          </>
        )}
      </Button>
    );
  };

  // Discover Creators View
  if (showDiscover) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToConnections}
                      className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 mb-1">
                        Discover Creators
                      </h1>
                      <p className="text-zinc-500 text-sm">
                        Find and connect with creators
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500">
                    {filteredResults.length} creator{filteredResults.length !== 1 ? "s" : ""} found
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      type="text"
                      placeholder="Search by name or username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl border-zinc-200 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {CREATOR_TYPES.map((type) => (
                      <Button
                        key={type.value}
                        variant={selectedCreatorType === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCreatorType(type.value)}
                        className={`rounded-lg ${
                          selectedCreatorType === type.value
                            ? "bg-yellow-500 hover:bg-yellow-600 text-zinc-900"
                            : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Loading for initial load */}
          {loading && filteredResults.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && filteredResults.length === 0 && (
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="py-16 px-6 text-center">
                <Users className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                <h3 className="text-xl font-bold text-zinc-800 mb-2">No creators found</h3>
                <p className="text-zinc-500">
                  {searchQuery || selectedCreatorType
                    ? "Try adjusting your search or filters."
                    : "Check back later for new creators."}
                </p>
                {(searchQuery || selectedCreatorType) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCreatorType("");
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Creator Grid */}
          {filteredResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((creator) => {
                const status = getConnectionStatus(creator.id);
                const profileLink =
                  creator.type === "BUSINESS"
                    ? `/profile/business/${creator.username}`
                    : creator.type === "FOUNDER"
                    ? `/profile/${creator.username}/founder`
                    : `/profile/${creator.username}/${creator.creatorType?.toLowerCase()}`;

                return (
                  <Card
                    key={creator.id}
                    className="group border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white overflow-hidden hover:-translate-y-1"
                  >
                    {/* Header with gradient */}
                    <Link href={profileLink}>
                      <CardHeader className="p-0 relative h-28 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white/30 rounded-full"></div>
                          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-4 border-white/20 rounded-full"></div>
                        </div>
                        {/* Badge positioned on header */}
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-black font-semibold px-3 py-1 text-xs">
                          {creator.type === "BUSINESS"
                            ? "Business"
                            : creator.type === "FOUNDER"
                            ? "Founder"
                            : creator.creatorType.charAt(0) +
                              creator.creatorType.slice(1).toLowerCase()}
                        </Badge>
                        {/* Connection status badge */}
                        {status && (
                          <Badge
                            className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium ${
                              status === "connected"
                                ? "bg-green-100 text-green-700"
                                : status === "sent"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {status === "connected"
                              ? "Connected"
                              : status === "sent"
                              ? "Sent"
                              : "Pending"}
                          </Badge>
                        )}
                      </CardHeader>
                    </Link>

                    {/* Avatar */}
                    <div className="relative px-5">
                      <Link href={profileLink}>
                        <Avatar className="w-20 h-20 absolute -top-10 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                          <AvatarImage
                            src={creator.image}
                            alt={creator.username}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-yellow-500 text-black text-2xl font-bold">
                            {creator.type === "BUSINESS"
                              ? getInitialLetter(creator.companyName)
                              : getInitialLetter(creator.username)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>

                    <CardContent className="px-5 pt-14 pb-5">
                      {/* Name */}
                      <Link href={profileLink}>
                        <h3 className="font-bold text-lg text-gray-900 hover:text-yellow-600 transition-colors truncate cursor-pointer">
                          {creator.type === "BUSINESS" ? creator.companyName : creator.username}
                        </h3>
                      </Link>

                      {/* Industry for business */}
                      {creator.type === "BUSINESS" && creator.industry && (
                        <p className="text-gray-500 text-sm mt-1">{creator.industry}</p>
                      )}

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                        <span className="truncate">
                          {creator.type === "BUSINESS"
                            ? creator.headquarters || "Location not specified"
                            : creator?.location ||
                              creator?.data?.personalInfo?.location ||
                              "Location not specified"}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {renderConnectionButton(creator, status)}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-10 mt-6">
            {loading && filteredResults.length > 0 && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                <span className="ml-2 text-sm text-gray-600">Loading more...</span>
              </div>
            )}
            {!hasMore && filteredResults.length > 0 && (
              <p className="text-center text-sm text-zinc-500">
                You've reached the end
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 mb-1">
                  Your Network
                </h1>
                <p className="text-zinc-500 text-sm">
                  Manage your connections and collaboration requests
                </p>
              </div>

              {/* Stats and Discover Button */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDiscoverClick}
                  className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-xl"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Discover
                </Button>
                <div className="text-center px-4 py-2 bg-zinc-50 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-600">
                    {counts.ALL}
                  </p>
                  <p className="text-xs text-zinc-500">Connections</p>
                </div>
                {counts.PENDING > 0 && (
                  <div className="text-center px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-2xl font-bold text-amber-600">
                      {counts.PENDING}
                    </p>
                    <p className="text-xs text-amber-600">Pending</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 sm:px-8 pb-6">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-3 h-auto p-1.5 rounded-xl bg-zinc-100">
                {[
                  {
                    value: "PENDING",
                    label: "Pending",
                    count: counts.PENDING,
                    icon: Inbox,
                  },
                  {
                    value: "ALL",
                    label: "Connections",
                    count: counts.ALL,
                    icon: Users,
                  },
                  {
                    value: "SENT",
                    label: "Sent",
                    count: counts.SENT,
                    icon: Send,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg
                        data-[state=active]:text-zinc-900 data-[state=active]:bg-white data-[state=active]:shadow-sm
                        text-zinc-500 data-[state=inactive]:hover:text-zinc-700 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.count > 0 && (
                        <Badge
                          className={`text-xs px-1.5 py-0.5 min-w-[20px] justify-center rounded-full ${
                            filter === tab.value
                              ? "bg-yellow-500 text-zinc-900"
                              : "bg-zinc-200 text-zinc-600"
                          }`}
                        >
                          {tab.count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {filteredConnections.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="py-16 px-6 text-center relative">
                {/* Decorative Elements */}
                <div className="absolute top-8 left-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-60 animate-pulse" />
                <div className="absolute top-16 right-1/4 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-pulse delay-300" />
                <div className="absolute bottom-12 left-1/3 w-2 h-2 bg-amber-300 rounded-full opacity-60 animate-pulse delay-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="relative inline-flex mb-6">
                    <div
                      className={`w-20 h-20 ${emptyState.iconBg} rounded-2xl flex items-center justify-center transform rotate-3`}
                    >
                      <EmptyIcon className={`w-10 h-10 ${emptyState.iconColor}`} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center shadow-md transform -rotate-6">
                      <Sparkles className="w-4 h-4 text-zinc-800" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-800 mb-2">
                    {emptyState.title}
                  </h3>
                  <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    {emptyState.description}
                  </p>
                  {emptyState.action}
                </div>
              </div>

              {/* Helpful Tips */}
              {filter === "ALL" && (
                <div className="border-t border-zinc-100 bg-zinc-50/50 p-6">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                    Quick Tips
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      {
                        icon: Search,
                        text: "Search for creators by niche",
                      },
                      { icon: UserPlus, text: "Send personalized requests" },
                      { icon: Heart, text: "Engage with their content" },
                    ].map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-zinc-600"
                      >
                        <tip.icon className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span>{tip.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            filteredConnections.map((conn) => {
              const isOutgoing = conn.senderId === user?.id;
              const otherUser = isOutgoing ? conn.receiver : conn.sender;
              const isAccepted = conn.status === "ACCEPTED";
              const profileLink =
                otherUser?.type === "BUSINESS"
                  ? `/profile/business/${otherUser?.username}`
                  : `/profile/${
                      otherUser?.username
                    }/${otherUser?.creatorType?.toLowerCase()}`;
              return (
                <Card
                  key={conn.id}
                  className="rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12 ring-2 ring-zinc-100">
                          <AvatarImage
                            className="object-cover"
                            src={otherUser?.image}
                            alt={otherUser?.username}
                          />
                          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-yellow-400 to-amber-500 text-zinc-900">
                            {otherUser?.username?.charAt(0)?.toUpperCase() ||
                              "?"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <Link href={profileLink}>
                            <h3 className="font-semibold text-base truncate transition-colors cursor-pointer hover:text-yellow-600 text-zinc-900">
                              {otherUser?.username || "Unknown User"}
                            </h3>
                          </Link>
                          {isAccepted ? (
                            <p className="text-sm text-zinc-500 flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-green-500" />
                              Connected
                            </p>
                          ) : (
                            <p className="text-sm text-zinc-500">
                              {isOutgoing
                                ? "Request sent"
                                : "Wants to connect"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {isAccepted ? (
                          <>
                            <Link href={profileLink}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-sm border-zinc-200 hover:bg-zinc-50 rounded-lg"
                              >
                                View Profile
                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                              </Button>
                            </Link>
                            <ConfirmDialog
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-sm text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              }
                              title="Remove Connection?"
                              description={`Are you sure you want to disconnect from ${otherUser?.username}? You'll need to send a new request to reconnect.`}
                              confirmText="Remove"
                              onConfirm={() => deleteRequest(conn.id)}
                            />
                          </>
                        ) : isOutgoing ? (
                          <ConfirmDialog
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-sm border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg"
                              >
                                Cancel Request
                              </Button>
                            }
                            title="Cancel Request?"
                            description={`Are you sure you want to cancel your connection request to ${otherUser?.username}?`}
                            confirmText="Cancel Request"
                            onConfirm={() => deleteRequest(conn.id)}
                          />
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={() => acceptRequest(conn.id)}
                              className="text-sm bg-yellow-500 text-zinc-900 hover:bg-yellow-600 font-semibold rounded-lg"
                            >
                              <UserCheck className="w-4 h-4 mr-1.5" />
                              Accept
                            </Button>
                            <ConfirmDialog
                              trigger={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-sm border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg"
                                >
                                  Decline
                                </Button>
                              }
                              title="Decline Request?"
                              description={`Are you sure you want to decline the connection request from ${otherUser?.username}?`}
                              confirmText="Decline"
                              onConfirm={() => rejectRequest(conn.id)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
