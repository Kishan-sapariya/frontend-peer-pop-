"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { useGroupStore } from "@/store/useGroupStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import toast from "react-hot-toast";

const JoinRequestManager = ({ groupId }) => {
  const {
    getJoinRequestsForGroup,
    joinRequests,
    isJoinRequestLoading,
    respondToJoinRequest,
  } = useGroupStore();

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("PENDING");

  useEffect(() => {
    if (open) {
      getJoinRequestsForGroup(groupId, activeTab);
    }
  }, [open, activeTab, groupId, getJoinRequestsForGroup]);

  const requests = joinRequests[groupId] || [];

  const renderList = () => {
    if (isJoinRequestLoading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin h-6 w-6 text-yellow-500" />
        </div>
      );
    }

    if (requests.length === 0) {
      return (
        <p className="text-center text-zinc-500 py-6">
          No {activeTab.toLowerCase()} requests.
        </p>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between p-4 border rounded-xl bg-zinc-50"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                {req.user.image ? (
                  <img
                    src={req.user.image}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-yellow-500 text-white">
                    {req.user.username?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div>
                <p className="font-semibold">{req.user.username}</p>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {req.status === "PENDING" ? (
                <>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={async () => {
                      const res = await respondToJoinRequest(
                        groupId,
                        req.id,
                        "APPROVE"
                      );

                      if (res.success) {
                        toast.success("Request approved");
                        getJoinRequestsForGroup(groupId, activeTab);
                      } else {
                        toast.error(res.error);
                      }
                    }}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={async () => {
                      const res = await respondToJoinRequest(
                        groupId,
                        req.id,
                        "REJECT"
                      );

                      if (res.success) {
                        toast.success("Request rejected");
                        getJoinRequestsForGroup(groupId, activeTab);
                      } else {
                        toast.error(res.error);
                      }
                    }}
                  >
                    Reject
                  </Button>
                </>
              ) : req.status === "APPROVED" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white border border-green-400 hover:bg-green-600 text-green-500 hover:text-white font-bold flex gap-2">
          <Users className="h-4 w-4" />
          Requests
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Group Join Requests
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="APPROVED">Approved</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="PENDING">{renderList()}</TabsContent>
          <TabsContent value="APPROVED">{renderList()}</TabsContent>
          <TabsContent value="REJECTED">{renderList()}</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRequestManager;
