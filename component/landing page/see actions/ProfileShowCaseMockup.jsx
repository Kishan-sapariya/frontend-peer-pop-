import Image from "next/image";

export function ProfileShowcaseMockup() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-800 bg-black shadow-2xl">
      {/* Cover Image with Yellow Gradient */}
      <div className="h-32 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />

      {/* Profile Header */}
      <div className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-6">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-black">
            <img
              src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1761552299/profile_pic_for_men_zpsmcl.jpg"
              alt="Rohan Verma"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
            Share Profile
          </button>
          <button className="rounded-lg bg-yellow-500 px-6 py-2 text-sm font-semibold text-black hover:bg-yellow-400">
            Connect
          </button>
        </div>

        {/* Profile Info */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">Rohan Verma</h2>
            <div className="rounded-full bg-yellow-500 px-2.5 py-1 text-xs font-bold text-black">
              ✓ VERIFIED
            </div>
          </div>
          <p className="mt-1 text-base text-gray-400">
            Content Creator & Brand Strategist
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Helping brands tell authentic stories through creative content. 5+
            years experience in digital marketing and influencer collaborations.
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
              <div className="text-xl font-bold text-yellow-500">2.4M</div>
              <div className="mt-1 text-xs text-gray-400">Followers</div>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
              <div className="text-xl font-bold text-yellow-500">8.5%</div>
              <div className="mt-1 text-xs text-gray-400">Engagement</div>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
              <div className="text-xl font-bold text-yellow-500">150+</div>
              <div className="mt-1 text-xs text-gray-400">Campaigns</div>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
              <div className="text-xl font-bold text-yellow-500">4.9</div>
              <div className="mt-1 text-xs text-gray-400">Rating</div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-400">SPECIALTIES</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-500">
                Brand Partnerships
              </span>
              <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-500">
                Content Strategy
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                Video Production
              </span>
              <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-500">
                Social Media
              </span>
            </div>
          </div>

          {/* Recent Work */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-400">
              RECENT COLLABORATIONS
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">Myntra</span>
              </div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">Zomato</span>
              </div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 p-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">boAt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
