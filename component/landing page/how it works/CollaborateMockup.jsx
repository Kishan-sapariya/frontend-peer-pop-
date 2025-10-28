export function CollaborationMockup() {
  return (
    <div className="w-full rounded-lg border border-gray-800 bg-black p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Sneaker Campaign
            </h3>
          </div>
          <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 border border-yellow-500/30">
            In Progress
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Total Deliverables</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <div className="text-2xl font-bold text-white">5,000</div>
            <div className="text-xs text-gray-400">Project Value</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Deliverables</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-3">
              <div className="h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-black" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Instagram Post #1
                </div>
                <div className="text-xs text-gray-400">Completed • Feb 15</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-3">
              <div className="h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-black" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  TikTok Video #1
                </div>
                <div className="text-xs text-gray-400">Completed • Feb 18</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-3">
              <div className="h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-black" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Instagram Post #2
                </div>
                <div className="text-xs text-gray-400">Completed • Feb 20</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-3">
              <div className="h-5 w-5 rounded-full border-2 border-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  Instagram Post #3
                </div>
                <div className="text-xs text-gray-400">Due Feb 25</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 rounded-md bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium">
            Upload Deliverable
          </div>
          <div className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-white">
            Message Team
          </div>
        </div>
      </div>
    </div>
  );
}
