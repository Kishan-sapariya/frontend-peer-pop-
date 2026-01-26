export function ProfileShowcaseMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
      
      {/* Cover Image */}
      <div className="h-24 sm:h-32 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />

      {/* Profile Header */}
      <div className="relative px-4 pb-6 sm:px-6">
        
        {/* Profile Picture */}
        <div className="absolute -top-12 sm:-top-16 left-4 sm:left-6">
          <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1761552299/profile_pic_for_men_zpsmcl.jpg"
              alt="Rohan Verma"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
            Share
          </button>
          <button className="rounded-lg bg-yellow-500 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold text-black shadow-md hover:bg-yellow-400">
            Connect
          </button>
        </div>

        {/* Profile Info */}
        <div className="mt-14 sm:mt-16 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 justify-center sm:justify-start">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Rohan Verma
            </h2>
            <div className="mt-1 sm:mt-0 rounded-full bg-yellow-500 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-black inline-block">
              ✓ VERIFIED
            </div>
          </div>

          <p className="mt-1 text-sm sm:text-base text-gray-600">
            Content Creator & Brand Strategist
          </p>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-700 max-w-2xl mx-auto sm:mx-0">
            Helping brands tell authentic stories through creative content. 5+
            years experience in digital marketing and influencer collaborations.
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Followers", value: "2.4M" },
              { label: "Engagement", value: "8.5%" },
              { label: "Campaigns", value: "150+" },
              { label: "Rating", value: "4.9" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-gray-100 p-2 sm:p-3 text-center"
              >
                <div className="text-lg sm:text-xl font-bold text-yellow-600">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">
              SPECIALTIES
            </h3>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              {[
                { name: "Brand Partnerships", color: "yellow" },
                { name: "Content Strategy", color: "yellow" },
                { name: "Video Production", color: "amber" },
                { name: "Social Media", color: "yellow" },
              ].map((tag, i) => (
                // Used explicit Tailwind classes for color utility to ensure they are picked up
                <span
                  key={i}
                  className={`rounded-full border border-${tag.color}-500/30 px-3 sm:px-4 py-1 text-[11px] sm:text-sm font-medium
                    ${tag.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-amber-100 text-amber-700 border-amber-300'}
                  `}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Work */}
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600">
              RECENT COLLABORATIONS
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {["Myntra", "Zomato", "boAt"].map((brand, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg bg-gradient-to-br shadow-md
                    ${
                      i === 0
                        ? "from-yellow-400 to-amber-400"
                        : i === 1
                        ? "from-amber-400 to-yellow-500"
                        : "from-yellow-300 to-amber-300"
                    } flex items-center justify-center`}
                >
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}