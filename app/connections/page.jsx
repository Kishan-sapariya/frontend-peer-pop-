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
import { Users, UserPlus, UserMinus, UserCheck, X } from "lucide-react";

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
      <div className="min-h-screen bg-white flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent mb-2 bg-gradient-to-r from-yellow-500 to-orange-500">
            Your Network
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your professional connections and collaboration requests.
          </p>
        </div>

        <div className="mb-6">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 rounded-xl bg-white border border-gray-200 shadow-md">
              {[
                {
                  value: "PENDING",
                  label: "Pending",
                  count: counts.PENDING,
                  icon: UserPlus,
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
                  icon: UserMinus,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 text-xs sm:text-sm rounded-lg 
                      data-[state=active]:text-gray-900 data-[state=active]:bg-yellow-400 data-[state=active]:shadow-lg 
                      text-gray-600 data-[state=inactive]:hover:bg-gray-100 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <Badge
                        className="text-xs px-1.5 py-0.5 min-w-[20px] justify-center ml-1 
                        bg-gray-200 text-gray-700 
                        data-[state=active]:bg-gray-800 data-[state=active]:text-yellow-400"
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
        <div className="space-y-4">
          {filteredConnections.length === 0 ? (
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-yellow-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No connections found
                </h3>
                <p className="text-gray-500 text-sm">
                  {filter === "ALL"
                    ? "You haven't connected with anyone yet. Explore and send a request!"
                    : filter === "PENDING"
                    ? "You have no incoming connection requests."
                    : "You haven't sent any pending requests."}
                </p>
              </CardContent>
            </Card>
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
                  className="rounded-xl transition-colors p-4 bg-white border border-gray-200 shadow-sm"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-14 w-14 border border-yellow-400">
                          <AvatarImage
                            className="object-cover"
                            src={otherUser?.image}
                            alt={otherUser?.username}
                          />
                          <AvatarFallback className="text-xl font-semibold bg-yellow-400 text-gray-900">
                            {otherUser?.username?.charAt(0)?.toUpperCase() ||
                              "?"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <Link href={profileLink}>
                            <h3 className="font-semibold text-lg truncate transition-colors cursor-pointer hover:text-yellow-600 text-gray-900">
                              {otherUser?.username || "Unknown User"}
                            </h3>
                          </Link>
                          {isAccepted ? (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <UserCheck className="w-4 h-4 text-green-600" />{" "}
                              Connected
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              {isOutgoing
                                ? "Request sent"
                                : "Connection request"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {isAccepted ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteRequest(conn.id)}
                            // Remove Button: Red text on light background
                            className="text-xs sm:text-sm flex-1 sm:flex-none text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        ) : isOutgoing ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteRequest(conn.id)}
                            // Cancel Sent Request: Light grey/yellow outline
                            className="text-xs sm:text-sm flex-1 sm:flex-none border-gray-300 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                          >
                            Cancel
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={() => acceptRequest(conn.id)}
                              // Accept Button: Solid yellow
                              className="text-xs sm:text-sm flex-1 sm:flex-none bg-yellow-500 text-gray-900 hover:bg-yellow-600 font-semibold shadow-md"
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => rejectRequest(conn.id)}
                              // Reject Button: Light grey outline
                              className="text-xs sm:text-sm border-gray-300 text-gray-600 hover:bg-gray-100 flex-1 sm:flex-none"
                            >
                              Reject
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
        {/* --- End Connections List --- */}
      </div>
    </div>
  );
}
