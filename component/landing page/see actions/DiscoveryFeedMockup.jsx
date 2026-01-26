export function DiscoveryFeedMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Discover Creators
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="rounded-lg bg-yellow-500 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-black shadow-md hover:bg-yellow-400 transition">
              Filters
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 sm:mt-4">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 sm:px-4 sm:py-2.5 shadow-inner">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0"
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
              className="flex-1 bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-500 outline-none"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Creator Cards */}
      <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50">
        {[
          // DRY — reuse card data
          {
            name: "Priya Sharma",
            role: "Fashion & Lifestyle Creator",
            location: "Mumbai, India",
            followers: "850K",
            rating: "4.9",
            tags: ["Fashion", "Beauty", "Lifestyle"],
            img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/c_fill,w_80,h_80,f_auto,q_auto/v1761552110/profile_pic_lady_zcqryf.jpg",
          },
          {
            name: "Arjun Kumar",
            role: "Tech Reviewer & YouTuber",
            location: "Bangalore, India",
            followers: "1.2M",
            rating: "5.0",
            tags: ["Technology", "Reviews"],
            img: "https://res.cloudinary.com/dvzqfb2z3/image/upload/c_fill,w_80,h_80,f_auto,q_auto/v1761552110/profile_pic_men_ho2yca.jpg",
          },
        ].map((creator, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 transition-all hover:border-yellow-500 shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <img
                src={creator.img}
                alt={creator.name}
                className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-full object-cover mx-auto sm:mx-0 shadow-sm"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 justify-center sm:justify-start">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {creator.name}
                  </h3>
                  <div className="mt-1 sm:mt-0 rounded-full bg-yellow-500 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-black inline-block">
                    ✓ Verified
                  </div>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {creator.role}
                </p>
                <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] sm:text-xs text-gray-500">
                  <span>📍 {creator.location}</span>
                  <span>👥 {creator.followers} followers</span>
                  <span>⭐ {creator.rating} rating</span>
                </div>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  {creator.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs text-gray-600 border border-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center sm:justify-end mt-3 sm:mt-0">
                <button className="rounded-lg border border-yellow-500 bg-yellow-500/10 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-yellow-700 hover:bg-yellow-500 hover:text-black transition-colors shadow-sm">
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}