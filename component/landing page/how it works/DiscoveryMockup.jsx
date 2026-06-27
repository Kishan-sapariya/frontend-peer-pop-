import Image from "next/image";

export function DiscoveryMockup() {
  return (
    <div className="w-full rounded-xl border border-gray-800 bg-black font-sans">
      <div className="flex h-full">
        {/* Filters Sidebar */}
        <div className="w-48 border-r border-gray-800 bg-black p-4">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-white">Filters</h4>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <div className="h-3 w-3 rounded-sm border-2 border-yellow-400 bg-yellow-400" />
                    <span>Creators</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="h-3 w-3 rounded-sm border border-gray-700" />
                    <span>Brands</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Niche
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <div className="h-3 w-3 rounded-sm border-2 border-yellow-400 bg-yellow-400" />
                    <span>Fashion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="h-3 w-3 rounded-sm border border-gray-700" />
                    <span>Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 p-4">
          <div className="mb-4">
            <div className="rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-400">
              Search creators, brands
            </div>
          </div>

          <div className="grid gap-4">
            {/* Profile Card 1 */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <div className="flex items-start gap-4">
                <img
                  src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1761552299/profile_pic_for_men_zpsmcl.jpg"
                  alt="Alex Chen"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Alex Chen</h4>
                      <p className="text-sm text-gray-400">
                        Tech Reviewer • 2M followers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <div className="flex items-start gap-4">
                <img
                  src="https://res.cloudinary.com/dvzqfb2z3/image/upload/v1761552110/profile_pic_lady_zcqryf.jpg"
                  alt="Maria Garcia"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Maria Garcia</h4>
                      <p className="text-sm text-gray-400">
                        Fashion Designer • 850K followers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
