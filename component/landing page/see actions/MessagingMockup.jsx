import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Paperclip, Smile, Send } from "lucide-react";

export function MessagingMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-800 bg-black shadow-2xl">
      <div className="flex h-[400px]">
        {/* Conversations List */}
        <div className="w-64 border-r border-gray-800 bg-gray-950">
          {/* Header */}
          <div className="border-b border-gray-800 p-3">
            <h3 className="text-base font-semibold text-white">Messages</h3>
            <div className="mt-2 flex items-center gap-2 rounded-md bg-gray-900 border border-gray-800 px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-500 text-white"
                disabled
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div className="overflow-y-auto">
            {/* Active Conversation */}
            <div className="border-l-2 border-primary bg-gray-900 p-3 hover:bg-gray-800">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/professional-female-brand-manager.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">
                        Sarah Martinez
                      </span>
                      <Badge
                        variant="secondary"
                        className="h-3.5 px-1 text-[9px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                      >
                        Brand
                      </Badge>
                    </div>
                    <span className="text-[10px] text-gray-400">2m</span>
                  </div>
                  <p className="truncate text-[10px] text-gray-300">
                    That sounds perfect! When can we...
                  </p>
                </div>
              </div>
            </div>

            {/* Other Conversations */}
            <div className="p-4 hover:bg-gray-900">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        James Chen
                      </span>
                      <Badge
                        variant="secondary"
                        className="h-4 px-1 text-[10px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                      >
                        Mentor
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400">1h</span>
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    Thanks for the advice on the portfolio!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-900">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>EP</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        Emma Parker
                      </span>
                      <Badge
                        variant="secondary"
                        className="h-4 px-1 text-[10px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                      >
                        Creator
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400">3h</span>
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    Would love to collaborate on this!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-900">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Marcus Kim
                    </span>
                    <span className="text-xs text-gray-400">1d</span>
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    Let me know if you need any help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-2 flex-col bg-black">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-800 p-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">
                    Sarah Martinez
                  </span>
                  <Badge
                    variant="secondary"
                    className="h-3.5 px-1 text-[9px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                  >
                    Brand
                  </Badge>
                </div>
                <p className="text-[10px] text-gray-400">Active now</p>
              </div>
            </div>
            <button className="rounded-md p-1.5 hover:bg-gray-900">
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {/* Received Message */}
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-lg rounded-tl-none bg-gray-900 p-2">
                  <p className="text-xs text-gray-100">
                    Hi! I'm reaching out from TechStyle Co. We love your content
                    and would like to discuss a potential partnership for our
                    spring campaign.
                  </p>
                </div>
                <span className="mt-1 text-[10px] text-gray-500">10:32 AM</span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex items-start gap-2 justify-end">
              <div className="flex-1 text-right">
                <div className="inline-block rounded-lg rounded-tr-none bg-primary p-2 text-left text-primary-foreground">
                  <p className="text-xs">
                    Thanks for reaching out! I'd love to hear more about the
                    campaign. What kind of collaboration did you have in mind?
                  </p>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-gray-500">10:35 AM</span>
                </div>
              </div>
            </div>

            {/* Received Message */}
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-lg rounded-tl-none bg-gray-900 p-2">
                  <p className="text-xs text-gray-100">
                    We're looking for 3-4 Instagram posts and 2 TikTok videos
                    featuring our new sustainable fashion line. Budget is $5,000
                    for the full package.
                  </p>
                </div>
                <span className="mt-1 text-[10px] text-gray-500">10:38 AM</span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex items-start gap-2 justify-end">
              <div className="flex-1 text-right">
                <div className="inline-block rounded-lg rounded-tr-none bg-primary p-2 text-left text-primary-foreground">
                  <p className="text-xs">
                    That sounds perfect! When can we schedule a call to discuss
                    the details?
                  </p>
                </div>
                <div className="mt-1">
                  <span className="text-[10px] text-gray-500">10:40 AM</span>
                </div>
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="rounded-lg rounded-tl-none bg-gray-900 p-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-800 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-950 px-2 py-1.5">
              <button className="rounded-md p-0.5 hover:bg-gray-900">
                <Paperclip className="h-4 w-4 text-gray-400" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-500 text-white"
                disabled
              />
              <button className="rounded-md p-0.5 hover:bg-gray-900">
                <Smile className="h-4 w-4 text-gray-400" />
              </button>
              <button className="rounded-md bg-primary p-1.5 text-primary-foreground hover:bg-primary/90">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
