"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

export default function ConnectionsPage() {
  const { user } = useAuthStore();
  const {
    connections,
    getConnections,
    acceptRequest,
    rejectRequest,
    deleteRequest,
  } = useConnectionStore();

  const [filter, setFilter] = useState("PENDING");

  useEffect(() => {
    getConnections();
  }, [getConnections]);

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
  const totalConnections = counts.ALL + counts.PENDING + counts.SENT;

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
          <Link href="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-xl mt-4">
              <Search className="h-4 w-4 mr-2" />
              Discover Creators
            </Button>
          </Link>
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
        <Link href="/">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold rounded-xl mt-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Explore Peerpop
          </Button>
        </Link>
      ),
    };
  };

  const emptyState = getEmptyState();
  const EmptyIcon = emptyState.icon;

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

              {/* Stats */}
              <div className="flex items-center gap-4">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteRequest(conn.id)}
                              className="text-sm text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : isOutgoing ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteRequest(conn.id)}
                            className="text-sm border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg"
                          >
                            Cancel Request
                          </Button>
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => rejectRequest(conn.id)}
                              className="text-sm border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg"
                            >
                              Decline
                            </Button>
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
