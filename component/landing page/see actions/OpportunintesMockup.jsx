export function OpportunitiesMockup() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Opportunities</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              3 new matches for you
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="divide-y divide-gray-200">
        {/* Opportunity 1 - Featured */}
        <div className="bg-gradient-to-r from-yellow-50/50 to-white p-4 hover:bg-yellow-50 transition-colors">
          <div className="flex items-start gap-3">
            {/* Company Logo */}
            <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-black">F</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">
                      Campaign
                    </h3>
                    <span className="rounded-full bg-yellow-100 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-500 border border-yellow-300">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">E-Commerce</p>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                Join India's biggest shopping festival! We're looking for
                lifestyle and tech creators to promote our Big Billion Days
                sale.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  E-Commerce
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Shopping
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Lifestyle
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Budget: </span>
                    <span className="text-green-600 font-bold text-sm">
                      ₹6-12L
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    100K+ followers
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    24 applicants
                  </span>
                </div>
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity 2 */}
        <div className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-black">N</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Beauty Ambassador Program
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Beauty & Personal Care
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                Become a Nykaa Beauty Ambassador! We're seeking beauty and
                makeup creators to showcase our exclusive product range.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Beauty
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Makeup
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Skincare
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Budget: </span>
                    <span className="text-green-600 font-bold text-sm">
                      ₹4-8L
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    50K+ followers
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    36 applicants
                  </span>
                </div>
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity 3 */}
        <div className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-black">b</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Audio Product Launch
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Audio & Electronics
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                Launch our latest wireless earbuds collection! Looking for tech
                reviewers and music creators to create unboxing videos and
                product reviews.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Tech
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Audio
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gray-300">
                  Gadgets
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Budget: </span>
                    <span className="text-green-600 font-bold text-sm">
                      ₹2.5-5L
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    30K+ followers
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-[10px]">
                    52 applicants
                  </span>
                </div>
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
