"use client";

import { MessageCircle } from "lucide-react";

// This page shows when on /conversations (no specific chat selected)
// On mobile: The sidebar (conversation list) is shown via layout
// On desktop: This placeholder is shown in the main area
export default function ConversationsPage() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full bg-gray-50 text-center p-8">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
        <MessageCircle className="w-10 h-10 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your Messages
      </h2>
      <p className="text-gray-500 max-w-sm">
        Select a conversation from the sidebar to start chatting, or start a new conversation.
      </p>
    </div>
  );
}
