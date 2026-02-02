"use client";

import React, { useState } from "react";
import CreateGroup from "@/component/group/CreateGroup";
import JoinedGroups from "@/component/group/JoinedGroups";
import SuggestedGroups from "@/component/group/SuggestedGroups";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Sparkles } from "lucide-react";

export default function GroupsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 text-zinc-900">
      <div className="mx-auto max-w-6xl p-6 sm:p-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-zinc-200 mb-8">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-3">
              Groups
            </h1>
            <p className="text-zinc-500 text-base">
              Connect with enthusiasts, professionals, and friends.
            </p>
          </div>
          <CreateGroup />
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl overflow-hidden">
          <Tabs defaultValue="joined" className="w-full">
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <TabsList className="bg-zinc-100 p-3 rounded-xl flex w-full max-w-md mx-auto gap-1">
                <TabsTrigger
                  value="joined"
                  className="flex-1 rounded-lg py-3 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-700 data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-700"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Joined Groups
                </TabsTrigger>

                <TabsTrigger
                  value="suggested"
                  className="flex-1 rounded-lg py-3 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yellow-700 data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Suggested Groups
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Panels */}
            <div className="mt-2">
              <TabsContent value="joined" className="focus-visible:outline-none">
                <JoinedGroups />
              </TabsContent>

              <TabsContent value="suggested" className="focus-visible:outline-none">
                <SuggestedGroups />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
