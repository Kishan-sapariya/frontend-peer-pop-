"use client";

import React, { useState } from "react";
import CreateGroup from "@/component/group/CreateGroup";
import JoinedGroups from "@/component/group/JoinedGroups";
import SuggestedGroups from "@/component/group/SuggestedGroups";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function GroupsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl p-6 sm:p-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-zinc-200 mb-10">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-2">
              Groups
            </h1>
            <p className="text-zinc-500 text-md">
              Connect with enthusiasts, professionals, and friends.
            </p>
          </div>
          <CreateGroup />
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 sm:p-8">
          <Tabs defaultValue="joined" className="w-full">
            <TabsList className="bg-zinc-100 p-1 rounded-xl flex w-full max-w-sm mx-auto">
              <TabsTrigger
                value="joined"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Joined Groups
              </TabsTrigger>

              <TabsTrigger
                value="suggested"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Suggested Groups
              </TabsTrigger>
            </TabsList>

            {/* Tab Panels */}
            <div className="mt-4">
              <TabsContent value="joined">
                <JoinedGroups />
              </TabsContent>

              <TabsContent value="suggested">
                <SuggestedGroups />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
