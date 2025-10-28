export function ChatMockup() {
  return (
    <div className="w-full rounded-2xl border border-yellow-500/20 bg-black shadow-lg overflow-hidden">
      <div className="flex h-[420px]">
        {/* Sidebar - Conversations */}
        <div className="w-64 border-r border-yellow-500/10 bg-gray-950">
          <div className="border-b border-yellow-500/10 p-4">
            <h3 className="font-semibold text-white text-lg">Messages</h3>
          </div>

          <div className="divide-y divide-gray-800">
            <div className="bg-gray-900/40 p-3 hover:bg-gray-900 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Nike Brand Team"
                  className="h-10 w-10 rounded-full object-cover border border-yellow-500/20"
                />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-semibold text-white">
                      Nike Brand Team
                    </h4>
                    <span className="text-xs text-gray-400">2m</span>
                  </div>
                  <p className="truncate text-xs text-gray-400">
                    That sounds perfect! Let's schedule...
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 hover:bg-gray-900/40 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Sarah Johnson"
                  className="h-10 w-10 rounded-full object-cover border border-yellow-500/20"
                />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-semibold text-white">
                      Sarah Johnson
                    </h4>
                    <span className="text-xs text-gray-400">1h</span>
                  </div>
                  <p className="truncate text-xs text-gray-400">
                    Thanks for the advice!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col bg-black">
          {/* Header */}
          <div className="border-b border-yellow-500/10 p-4 flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Nike Brand Team"
              className="h-10 w-10 rounded-full object-cover border border-yellow-500/20"
            />
            <div>
              <h4 className="font-semibold text-white">Nike Brand Team</h4>
              <p className="text-xs text-gray-400">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 p-4 overflow-y-auto scrollbar-hide">
            <div className="flex gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-8 w-8 rounded-full object-cover border border-yellow-500/20"
              />
              <div className="max-w-xs rounded-2xl bg-gray-900/70 p-3 border border-yellow-500/10">
                <p className="text-sm text-white leading-relaxed">
                  Hi! We love your content and would like to discuss a potential
                  collaboration for our new sneaker launch.
                </p>
                <span className="mt-1 block text-xs text-gray-500">
                  10:30 AM
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <div className="max-w-xs rounded-2xl bg-yellow-500 p-3 text-black">
                <p className="text-sm leading-relaxed">
                  Thank you! I'd love to hear more about the campaign. What did
                  you have in mind?
                </p>
                <span className="mt-1 block text-xs text-black/60">
                  10:32 AM
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Nike Brand Team"
                className="h-8 w-8 rounded-full object-cover border border-yellow-500/20"
              />
              <div className="max-w-xs rounded-2xl bg-gray-900/70 p-3 border border-yellow-500/10">
                <p className="text-sm text-white leading-relaxed">
                  We're looking for 3 Instagram posts and 2 TikTok videos.
                  Budget is ₹5,00,000. Interested?
                </p>
                <span className="mt-1 block text-xs text-gray-500">
                  10:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-yellow-500/10 p-4">
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border border-yellow-500/10 bg-gray-950 px-3 py-2 text-sm text-gray-400">
                Type a message...
              </div>
              <div className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black cursor-pointer hover:bg-yellow-400 transition-colors">
                Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
