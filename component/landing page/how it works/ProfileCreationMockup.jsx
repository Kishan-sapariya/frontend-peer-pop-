import { Instagram } from "lucide-react";

export function ProfileCreationMockup() {
  return (
    <div className="w-full rounded-lg border border-gray-800 bg-black p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white">
            Create Your <span className="text-yellow-500">Profile</span>
          </h3>
          <p className="text-sm text-gray-400">Tell us about yourself</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Full Name</label>
            <div className="rounded-md border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white">
              Sarah Johnson
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Creative Niche
            </label>
            <div className="rounded-md border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white">
              Fashion & Lifestyle Influencer
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Bio</label>
            <div className="rounded-md border border-gray-800 bg-gray-950 px-3 py-3 text-sm leading-relaxed text-white">
              Fashion content creator with 500K+ followers.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Social Links
            </label>
            <div className="flex items-center gap-2 rounded-md border border-gray-800 bg-gray-950 px-3 py-2">
              <Instagram className="text-yellow-400"/>
              <span className="text-sm text-white">
                instagram.com/sarahjohnson
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <div className="flex-1 rounded-md bg-yellow-500 px-4 py-2 text-center text-sm font-medium text-primary-foreground ">
              Save Profile
            </div>
            <div className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-white">
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
