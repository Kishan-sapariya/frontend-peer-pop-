"use client";

import React, { useState } from "react";
import { Search, Users, Sparkles, CheckCircle } from "lucide-react"; // Using lucide-react for icons
import GroupSearch from "@/component/group/GroupSearch";
import CreateGroup from "@/component/group/CreateGroup";

// --- 1. MOCK/DUMMY DATA ---

const DUMMY_GROUPS = [
  {
    id: 1,
    name: "React Maestros",
    members: 1240,
    category: "Web Dev",
    isJoined: true,
  },
  {
    id: 2,
    name: "Sunset Photographers",
    members: 452,
    category: "Hobby",
    isJoined: true,
  },
  {
    id: 3,
    name: "Financial Freedom",
    members: 15100,
    category: "Finance",
    isJoined: false,
  },
  {
    id: 4,
    name: "Indie Game Devs 2024",
    members: 88,
    category: "Gaming",
    isJoined: false,
  },
  {
    id: 5,
    name: "Local Book Club",
    members: 35,
    category: "Community",
    isJoined: false,
  },
  {
    id: 6,
    name: "Healthy Recipes Daily",
    members: 5000,
    category: "Lifestyle",
    isJoined: false,
  },
  {
    id: 7,
    name: "Advanced Algorithms",
    members: 920,
    category: "CS",
    isJoined: false,
  },
  {
    id: 8,
    name: "Travel Hacks",
    members: 2100,
    category: "Lifestyle",
    isJoined: false,
  },
];

const DUMMY_JOINED_GROUPS = DUMMY_GROUPS.filter((g) => g.isJoined);
const DUMMY_SUGGESTED_GROUPS = DUMMY_GROUPS.filter((g) => !g.isJoined).slice(
  0,
  4
);

// --- 2. MOCK UI COMPONENTS (Replicating Imports) ---

// Mock Button
const Button = ({ children, className = "", variant = "default", onClick }) => {
  let baseStyle =
    "px-4 py-2 rounded-xl font-medium transition-colors duration-200 shadow-md";
  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-yellow-500 hover:bg-yellow-600 text-black";
      break;
    case "secondary":
      // Changed for light theme
      variantStyle = "bg-zinc-200 hover:bg-zinc-300 text-zinc-900";
      break;
    case "outline":
      // Changed for light theme
      variantStyle = "border border-zinc-300 text-zinc-600 hover:bg-zinc-100";
      break;
    case "success":
      variantStyle = "bg-green-600 hover:bg-green-700 text-white";
      break;
    default:
      // Changed for light theme
      variantStyle = "bg-zinc-700 hover:bg-zinc-800 text-white";
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const GroupCard = ({ group }) => {
  const handleAction = () => {
    // NOTE: alert() is not supported in the embedded environment.
    console.log(`Action clicked for group: ${group.name}`);
  };

  const membersFormatted = new Intl.NumberFormat().format(group.members);

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-md transition-all hover:border-yellow-500/50 hover:shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
            {group.category}
          </span>
          {group.isJoined && (
            <CheckCircle className="h-5 w-5 text-green-600" title="Joined" />
          )}
        </div>

        {/* Adjusted text color for light theme */}
        <h3 className="text-xl font-bold text-zinc-900 mb-2 truncate">
          {group.name}
        </h3>

        {/* Adjusted text color for light theme */}
        <div className="flex items-center text-zinc-500 text-sm mb-4">
          <Users className="h-4 w-4 mr-2" />
          <span>{membersFormatted} Members</span>
        </div>
      </div>

      {group.isJoined ? (
        <Button variant="success" className="w-full" onClick={handleAction}>
          View Group
        </Button>
      ) : (
        <Button variant="primary" className="w-full" onClick={handleAction}>
          <Sparkles className="h-4 w-4 mr-2 inline-block" />
          Join Group
        </Button>
      )}
    </div>
  );
};

// --- 4. MAIN PAGE COMPONENT ---

export default function GroupsPage() {
  const [search, setSearch] = useState("");

  return (
    // Changed main background to white and default text color to dark
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl p-6 sm:p-10 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-2 border-b border-zinc-200">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-2">
              Groups
            </h1>
            {/* Adjusted text color */}
            <p className="text-zinc-500 text-md">
              Connect with enthusiasts, professionals, and friends.
            </p>
          </div>
          <CreateGroup />
        </div>

        {/* Search */}
        <GroupSearch search={search} setSearch={setSearch} />

        {/* Joined Groups */}
        <section className="space-y-6">
          {/* Adjusted text color */}
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center">
            <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
            Your Groups ({DUMMY_JOINED_GROUPS.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_JOINED_GROUPS.length > 0 ? (
              DUMMY_JOINED_GROUPS.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))
            ) : (
              // Adjusted background and border for light theme
              <div className="col-span-full bg-zinc-50 p-8 rounded-xl text-center text-zinc-500 border-dashed border-2 border-zinc-300">
                You haven't joined any groups yet. Explore below to get started!
              </div>
            )}
          </div>
        </section>

        {/* Adjusted divider color */}
        <hr className="border-zinc-200" />

        {/* Suggested Groups */}
        <section className="space-y-6">
          {/* Adjusted text color */}
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-yellow-600" />
            Discover Groups ({DUMMY_SUGGESTED_GROUPS.length} Suggested)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_SUGGESTED_GROUPS.length > 0 ? (
              DUMMY_SUGGESTED_GROUPS.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))
            ) : (
              // Adjusted background and border for light theme
              <div className="col-span-full bg-zinc-50 p-8 rounded-xl text-center text-zinc-500 border-dashed border-2 border-zinc-300">
                We couldn't find any new suggestions for you right now.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
