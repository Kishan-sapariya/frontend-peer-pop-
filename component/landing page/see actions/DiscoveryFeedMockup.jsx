export function DiscoveryFeedMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-800 bg-black shadow-2xl">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Discover Creators</h2>
          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400">
              Filters
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, niche, or location..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Creator Cards */}
      <div className="space-y-4 p-6">
        {/* Creator 1 */}
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all hover:border-yellow-500/50">
          <div className="flex items-start gap-4">
            <img
              src="https://res.cloudinary.com/dvzqfb2z3/image/upload/c_fill,w_80,h_80,f_auto,q_auto/v1761552110/profile_pic_lady_zcqryf.jpg"
              alt="Priya Sharma"
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Priya Sharma</h3>
                <div className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-semibold text-black">
                  ✓ Verified
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Fashion & Lifestyle Creator
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>📍 Mumbai, India</span>
                <span>👥 850K followers</span>
                <span>⭐ 4.9 rating</span>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  Fashion
                </span>
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  Beauty
                </span>
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  Lifestyle
                </span>
              </div>
            </div>
            <button className="rounded-lg border border-yellow-500 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors">
              Connect
            </button>
          </div>
        </div>

        {/* Creator 2 */}
        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all hover:border-yellow-500/50">
          <div className="flex items-start gap-4">
            <img
              src="https://res.cloudinary.com/dvzqfb2z3/image/upload/c_fill,w_80,h_80,f_auto,q_auto/v1761552110/profile_pic_men_ho2yca.jpg"
              alt="Arjun Kumar"
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Arjun Kumar</h3>
                <div className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-semibold text-black">
                  ✓ Verified
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Tech Reviewer & YouTuber
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>📍 Bangalore, India</span>
                <span>👥 1.2M followers</span>
                <span>⭐ 5.0 rating</span>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  Technology
                </span>
                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  Reviews
                </span>
              </div>
            </div>
            <button className="rounded-lg border border-yellow-500 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
