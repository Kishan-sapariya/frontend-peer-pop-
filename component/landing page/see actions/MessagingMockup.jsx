import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Paperclip, Smile, Send } from "lucide-react";

export function MessagingMockup() {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex h-full max-h-[80vh] min-h-[450px]">
        
        {/* Sidebar */}
        <div className="hidden md:flex w-20 border-r border-gray-200 bg-gray-50 flex-col items-center flex-shrink-0 pt-4">
          <h3 className="text-xs font-bold text-gray-500 mb-4">CHATS</h3>
          <div className="flex-1 w-full space-y-3">
            {/* Active chat */}
            <div className="relative flex justify-center py-2 cursor-pointer bg-yellow-50/50 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-yellow-500">
              <Avatar className="h-10 w-10 border-2 border-yellow-500 ring-2 ring-yellow-500/50 transition-all">
                <AvatarFallback className="bg-yellow-100 text-yellow-700">SM</AvatarFallback>
                {/* Image tag removed for mockup consistency, but would be here */}
              </Avatar>
            </div>

            {/* Other Chats */}
            {["JC", "EP", "MK"].map((f, i) => (
              <div
                key={i}
                className="flex justify-center py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <Avatar className="h-10 w-10 opacity-80 hover:opacity-100 transition-opacity">
                  <AvatarFallback className="bg-gray-200 text-gray-600">{f}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex flex-1 flex-col bg-white">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-3 sm:p-4 flex-shrink-0 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                <AvatarFallback className="bg-yellow-100 text-yellow-700">SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    Sarah Martinez (TechStyle Co.)
                  </span>
                  <Badge
                    variant="secondary"
                    className="h-4 px-1.5 text-[10px] bg-yellow-100 text-yellow-700 border-yellow-300 font-medium"
                  >
                    Brand
                  </Badge>
                </div>
                <p className="text-xs text-green-600">Active now</p>
              </div>
            </div>
            <button aria-label="More options" className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Messages Container (for scrollbar) */}
          <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-4 bg-gray-100/50">
            
            {/* Received Message */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-yellow-100 text-yellow-700">SM</AvatarFallback>
              </Avatar>
              <div className="max-w-[75%]">
                <div className="rounded-xl rounded-tl-sm bg-gray-200 p-3">
                  <p className="text-sm text-gray-800 leading-relaxed">
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

            {/* Sent Message (Yellow Accent) */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-[75%] text-right">
                <div className="inline-block rounded-xl rounded-tr-sm bg-yellow-500 p-3 text-left text-black shadow-md">
                  <p className="text-sm leading-relaxed">
                    Thanks for reaching out! I'd love to hear more about the
                    campaign.
                  </p>
                </div>
                <span className="mt-1 mr-1 text-[11px] text-gray-500">
                  10:35 AM
                </span>
              </div>
              {/* No avatar for sender in many modern chat UIs, but you can add one here if needed */}
            </div>

            {/* Typing Indicator */}
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-yellow-100 text-yellow-700">SM</AvatarFallback>
              </Avatar>
              <div className="rounded-xl rounded-tl-sm bg-gray-200 px-3 py-2 animate-pulse">
                <div className="h-2 w-8 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 sm:p-4 flex-shrink-0 bg-white">
            <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2">
              <button aria-label="Attach file" className="rounded-full p-1.5 hover:bg-gray-100 transition-colors">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-gray-800"
                disabled
              />
              <button aria-label="Add emoji" className="rounded-full p-1.5 hover:bg-gray-100 transition-colors">
                <Smile className="h-5 w-5 text-gray-500" />
              </button>
              
              {/* Send Button (Yellow Accent) */}
              <button aria-label="Send message" className="rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600 transition-colors shadow-md">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}