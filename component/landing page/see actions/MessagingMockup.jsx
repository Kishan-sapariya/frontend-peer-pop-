import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Paperclip, Smile, Send } from "lucide-react";

export function MessagingMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-black shadow-2xl">
      <div className="flex h-[500px]">
        {/* Compact Avatar List (Maximized Space Utilization) */}
        <div className="**w-20** border-r border-gray-800 bg-gray-950 flex flex-col items-center flex-shrink-0 pt-4">
          <h3 className="**text-xs** font-bold text-yellow-500 mb-4">CHATS</h3>{" "}
          {/* Minimal label */}
          {/* Conversation Items Container */}
          <div className="overflow-y-auto flex-1 w-full space-y-3">
            {/* Active Conversation (Avatar Only) */}
            <div className="relative flex justify-center py-2 cursor-pointer bg-gray-900 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-yellow-500">
              <Avatar className="h-10 w-10 border-2 border-yellow-500 ring-2 ring-yellow-500/50 transition-all">
                <AvatarImage src="/professional-female-brand-manager.jpg" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
            </div>

            {/* Other Conversations (Avatar Only) */}
            {[
              { fallback: "JC", role: "Mentor" },
              { fallback: "EP", role: "Creator" },
              { fallback: "MK", role: "Staff" },
            ].map((conv, index) => (
              <div
                key={index}
                className="flex justify-center py-2 hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <Avatar className="h-10 w-10 opacity-80 hover:opacity-100 transition-opacity">
                  <AvatarFallback>{conv.fallback}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area (Expanded to utilize extra space) */}
        <div className="flex **flex-1** flex-col bg-gray-900">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-800 p-4 flex-shrink-0 bg-black/30">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">
                    Sarah Martinez (TechStyle Co.)
                  </span>
                  <Badge
                    variant="secondary"
                    className="h-4 px-1.5 text-[10px] bg-yellow-500/10 text-yellow-400 border-yellow-500/30 font-medium"
                  >
                    Brand
                  </Badge>
                </div>
                <p className="text-xs text-green-400">Active now</p>
              </div>
            </div>
            <button className="rounded-full p-2 hover:bg-gray-800 transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar bg-black/50">
            {/* Received Message 1 */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%]">
                <div className="rounded-xl rounded-tl-sm bg-gray-800 p-3">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Hi! I'm reaching out from TechStyle Co. We love your content
                    and would like to discuss a potential partnership for our
                    spring campaign.
                  </p>
                </div>
                <span className="mt-1 ml-1 text-[11px] text-gray-500">
                  10:32 AM
                </span>
              </div>
            </div>

            {/* Sent Message 1 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-[70%] text-right">
                <div className="inline-block rounded-xl rounded-tr-sm bg-yellow-500 p-3 text-left text-black">
                  <p className="text-sm leading-relaxed">
                    Thanks for reaching out! I'd love to hear more about the
                    campaign. What kind of collaboration did you have in mind?
                  </p>
                </div>
                <div className="mt-1 mr-1">
                  <span className="text-[11px] text-gray-500">10:35 AM</span>
                </div>
              </div>
            </div>

            {/* Received Message 2 */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%]">
                <div className="rounded-xl rounded-tl-sm bg-gray-800 p-3">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    We're looking for 3-4 Instagram posts and 2 TikTok videos
                    featuring our new sustainable fashion line. Budget is
                    **$5,000** for the full package.
                  </p>
                </div>
                <span className="mt-1 ml-1 text-[11px] text-gray-500">
                  10:38 AM
                </span>
              </div>
            </div>

            {/* Sent Message 2 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-[70%] text-right">
                <div className="inline-block rounded-xl rounded-tr-sm bg-yellow-500 p-3 text-left text-black">
                  <p className="text-sm leading-relaxed">
                    That sounds perfect! When can we schedule a call to discuss
                    the details?
                  </p>
                </div>
                <div className="mt-1 mr-1">
                  <span className="text-[11px] text-gray-500">10:40 AM</span>
                </div>
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="rounded-xl rounded-tl-sm bg-gray-800 px-3 py-2 animate-pulse">
                <div className="h-2 w-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-800 p-4 flex-shrink-0 bg-gray-900">
            <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-950 px-3 py-2">
              <button className="rounded-full p-1.5 hover:bg-gray-800 transition-colors">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600 text-white"
                disabled
              />
              <button className="rounded-full p-1.5 hover:bg-gray-800 transition-colors">
                <Smile className="h-5 w-5 text-gray-500" />
              </button>
              <button className="rounded-full bg-yellow-500 p-2 text-black hover:bg-yellow-600 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
