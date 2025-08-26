"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, MessageCircle } from "lucide-react";
import { useConnectionStore } from "@/store/useConnectionStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useConversationStore } from "@/store/useConversationStore";
import { useRouter } from "next/navigation";

export default function ConnectBtn({ profileId, isOwnProfile, creatorType }) {
  const { sendConnectionRequest, connections, getConnections, deleteRequest } =
    useConnectionStore();
  const { user } = useAuthStore();
  const { createConversation } = useConversationStore();
  const router = useRouter();

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  if (isOwnProfile) return null;

  const btnBgColor = (creatorType) => {
    switch (creatorType) {
      case "YOUTUBER":
        return "bg-red-500 hover:bg-red-700";
      case "COMEDIAN":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "INFLUENCER":
        return "bg-purple-700 hover:bg-purple-800";
    }
  };
  if (!user) return null;

  const connection = connections?.find(
    (c) =>
      (c.senderId === user.id && c.receiverId === profileId) ||
      (c.senderId === profileId && c.receiverId === user.id)
  );

  const handleClick = () => {
    if (!connection) {
      sendConnectionRequest(profileId);
    } else if (connection.status === "ACCEPTED") {
      deleteRequest(connection.id);
    }
  };

  const getButtonLabel = () => {
    if (!connection) return "Connect";

    if (connection.senderId === user.id) {
      switch (connection.status) {
        case "PENDING":
          return "Request Sent";
        case "ACCEPTED":
          return "remove connection";
        case "REJECTED":
          return "Rejected";
        default:
          return "Connect";
      }
    }

    if (connection.receiverId === user.id) {
      switch (connection.status) {
        case "PENDING":
          return "Requested to Connect";
        case "ACCEPTED":
          return "Connected";
        case "REJECTED":
          return "Rejected";
        default:
          return "Connect";
      }
    }
  };

  const handleCreateConversation = async () => {
    await createConversation(profileId);
    router.push(`/conversations`);
  };

  return (
    <div className="flex-col sm:flex-row space-x-1.5 space-y-1.5">
      <Button
        onClick={handleClick}
        size="lg"
        className={`w-full sm:w-auto ${
          !connection ? `${btnBgColor(creatorType)}` : ""
        }`}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        {getButtonLabel()}
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={handleCreateConversation}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Message
      </Button>
    </div>
  );
}
