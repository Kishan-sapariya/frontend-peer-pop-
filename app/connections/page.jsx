"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConnectionStore } from "../../store/useConnectionStore";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from "../../component/LoadingSpinner";

export default function ConnectionsPage() {
  const { user } = useAuthStore();
  const {
    connections,
    getConnections,
    acceptRequest,
    rejectRequest,
    deleteRequest,
  } = useConnectionStore();

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  const filteredConnections = connections.filter((conn) => {
    if (filter === "ALL") return conn.status === "ACCEPTED";
    if (filter === "PENDING")
      return conn.status === "PENDING" && conn.senderId !== user?.id;
    if (filter === "SENT")
      return conn.senderId === user?.id && conn.status === "PENDING";
    return true;
  });

  if (!user) {
    return <LoadingSpinner />;
  }

  const getConnectionCounts = () => {
    const counts = {
      ALL: connections.filter((c) => c.status === "ACCEPTED").length,
      PENDING: connections.filter(
        (c) => c.status === "PENDING" && c.senderId !== user?.id
      ).length,
      SENT: connections.filter(
        (c) => c.senderId === user?.id && c.status === "PENDING"
      ).length,
    };
    return counts;
  };

  const counts = getConnectionCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Connections
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your connection requests
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-3 h-auto">
              {[
                { value: "ALL", label: "All Connections", count: counts.ALL },
                {
                  value: "PENDING",
                  label: "Pending Requests",
                  count: counts.PENDING,
                },
                { value: "SENT", label: "Sent Requests", count: counts.SENT },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0 ml-1"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Connections List */}
        <div className="space-y-3">
          {filteredConnections.length === 0 ? (
            <Card>
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No connections found
                </h3>
                <p className="text-gray-500 text-sm">
                  {filter === "ALL"
                    ? "You don't have any connections yet"
                    : `No ${filter.toLowerCase()} connections to display`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredConnections.map((conn, idx) => {
              const isOutgoing = conn.senderId === user?.id;
              const otherUser = isOutgoing ? conn.receiver : conn.sender;

              return (
                <Card
                  key={idx}
                  className="hover:shadow-sm transition-shadow p-4"
                >
                  <CardContent className="px-3 py-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                          <AvatarImage
                            className="object-cover"
                            src={otherUser?.image}
                            alt={otherUser?.username}
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {otherUser?.username?.charAt(0)?.toUpperCase() ||
                              "?"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                              {otherUser?.username || "Unknown User"}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {isOutgoing
                              ? "You sent a request"
                              : "Sent you a request"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {conn.status === "PENDING" && (
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          {isOutgoing ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteRequest(conn.id)}
                              className="text-xs sm:text-sm flex-1 sm:flex-none"
                            >
                              Cancel
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                onClick={() => acceptRequest(conn.id)}
                                className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 flex-1 sm:flex-none"
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => rejectRequest(conn.id)}
                                className="text-xs sm:text-sm  bg-red-500 hover:bg-red-600 flex-1 sm:flex-none text-white"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      )}
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
