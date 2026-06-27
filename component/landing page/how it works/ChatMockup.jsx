import { Search, MoreVertical, Paperclip, Smile, Send } from "lucide-react";

const Avatar = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={`rounded-full object-cover ${className}`}
  />
);

export function ChatMockup() {
  return (
    <div className="w-full rounded-2xl border border-yellow-500/20 bg-black shadow-2xl overflow-hidden">
      <div className="flex h-[460px]">
        <div className="hidden sm:flex w-16 border-r border-yellow-500/10 bg-gray-950  flex-col items-center flex-shrink-0">
          <div className="border-b border-yellow-500/10 **h-[65px] flex items-center justify-center flex-shrink-0">
            <h3 className="font-bold text-yellow-500 text-base">C</h3>
          </div>

          <div className="divide-y divide-gray-800 overflow-y-auto flex-1 w-full">
            <div className="bg-gray-900/40 p-3 **border-l-4 border-yellow-500** flex justify-center hover:bg-gray-900 transition-all cursor-pointer">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-10 w-10 border-2 border-yellow-500"
              />
            </div>

            <div className="p-3 flex justify-center hover:bg-gray-900/40 transition-all cursor-pointer">
              <Avatar
                src="https://randomuser.me/api/portraits/women/32.jpg"
                alt="Sarah Johnson"
                className="h-10 w-10 border border-yellow-500/20 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-3 flex justify-center hover:bg-gray-900/40 transition-all cursor-pointer">
              <Avatar
                src="https://randomuser.me/api/portraits/men/82.jpg"
                alt="Michael Doe"
                className="h-10 w-10 border border-yellow-500/20 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-black">
          <div className="border-b border-yellow-500/10 p-4 flex items-center justify-between flex-shrink-0 bg-gray-950">
            <div className="flex items-center gap-3">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-10 w-10 border-2 border-yellow-500/20"
              />
              <div>
                <h4 className="font-bold text-white text-base">
                  Nike Brand Team
                </h4>
              </div>
            </div>
            <button aria-label="More options" className="rounded-full p-2 text-gray-400 hover:bg-gray-800 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 space-y-4 p-4 overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Received Message */}
            <div className="flex items-end gap-3 max-w-[80%]">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-8 w-8 border border-yellow-500/20 flex-shrink-0"
              />
              <div>
                <div className="rounded-3xl rounded-bl-lg bg-gray-900/70 p-3 border border-yellow-500/10">
                  <p className="text-sm text-white leading-relaxed">
                    Hi! We love your content and would like to discuss a
                    potential collaboration for our new sneaker launch.
                  </p>
                </div>
                <span className="mt-1 block text-xs text-gray-500 ml-2">
                  10:30 AM
                </span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex justify-end items-end">
              <div className="max-w-[80%] text-right">
                <div className="inline-block rounded-3xl rounded-br-lg bg-yellow-500 p-3 text-black">
                  <p className="text-sm leading-relaxed text-left">
                    Thank you! I'd love to hear more about the campaign. What
                    did you have in mind?
                  </p>
                </div>
                <span className="mt-1 block text-xs text-gray-500 mr-2">
                  10:32 AM
                </span>
              </div>
            </div>

            {/* Received Message 2 */}
            <div className="flex items-end gap-3 max-w-[80%]">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-8 w-8 border border-yellow-500/20 flex-shrink-0"
              />
              <div>
                <div className="rounded-3xl rounded-bl-lg bg-gray-900/70 p-3 border border-yellow-500/10">
                  <p className="text-sm text-white leading-relaxed">
                    We're looking for 3 Instagram posts and 2 TikTok videos.
                    Budget is ₹5,00,000. Interested?
                  </p>
                </div>
                <span className="mt-1 block text-xs text-gray-500 ml-2">
                  10:35 AM
                </span>
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="flex items-end gap-3">
              <Avatar
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-8 w-8 border border-yellow-500/20 flex-shrink-0"
              />
              <div className="rounded-3xl rounded-bl-lg bg-gray-900/70 px-4 py-3 border border-yellow-500/10">
                <div className="flex space-x-1">
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                  <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-yellow-500/10 p-4 flex-shrink-0 bg-gray-950">
            <div className="flex items-center gap-3">
              {/* Attachment Button */}
              <button aria-label="Attach file" className="p-2 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-gray-800 transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>

              {/* Input Field */}
              <div className="flex-1 flex items-center rounded-xl border border-yellow-500/20 bg-gray-900 px-4 py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button aria-label="Add emoji" className="p-1 rounded-full text-gray-400 hover:text-yellow-500 transition-colors">
                  <Smile className="h-5 w-5" />
                </button>
              </div>

              {/* Send Button */}
              <button aria-label="Send message" className="p-3 rounded-full bg-yellow-500 text-black cursor-pointer hover:bg-yellow-400 transition-colors flex-shrink-0">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
