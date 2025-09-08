"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  SlidersHorizontal,
  X,
  MapPin,
  Plus,
  Trash2,
  Search,
  Filter,
  Users,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getInitialLetter } from "@/utils/formatDate";

const professions = {
  Youtuber: "YOUTUBER",
  Comedian: "COMEDIAN",
  "Social media influencer": "INFLUENCER",
  Musician: "MUSICIAN",
  Dancer: "DANCER",
  Photographer: "PHOTOGRAPHER",
  Podcaster: "PODCASTER",
  Actor: "ACTOR",
};

const popularLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Visakhapatnam",
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const creatorType = searchParams.get("creatorType") || "";
  const location = searchParams.get("location") || "";

  const { results, fetchSearchResults, loading } = useAuthStore();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [customLocationInput, setCustomLocationInput] = useState("");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    if (q || creatorType || location) {
      fetchSearchResults(q, creatorType, location);
    }
  }, [q, creatorType, location, fetchSearchResults]);

  // --- UI helpers ---
  const handleProfessionToggle = (enumValue) => {
    setSelectedProfessions((prev) => {
      const newProfessions = prev.includes(enumValue)
        ? prev.filter((p) => p !== enumValue)
        : [...prev, enumValue];

      updateURL({ creatorType: newProfessions, location: selectedLocations });
      return newProfessions;
    });
  };

  const handleLocationToggle = (loc) => {
    setSelectedLocations((prev) => {
      const newLocations = prev.includes(loc)
        ? prev.filter((l) => l !== loc)
        : [...prev, loc];

      updateURL({ creatorType: selectedProfessions, location: newLocations });
      return newLocations;
    });
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams(window.location.search);

    if (newFilters.q !== undefined) params.set("q", newFilters.q);

    if (newFilters.creatorType !== undefined) {
      if (newFilters.creatorType.length > 0) {
        params.set("creatorType", newFilters.creatorType.join(","));
      } else {
        params.delete("creatorType");
      }
    }

    if (newFilters.location !== undefined) {
      if (newFilters.location.length > 0) {
        params.set("location", newFilters.location.join(","));
      } else {
        params.delete("location");
      }
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleAddCustomLocation = () => {
    const trimmed = customLocationInput.trim();
    if (trimmed && !selectedLocations.includes(trimmed)) {
      const newLocations = [...selectedLocations, trimmed];
      setSelectedLocations(newLocations);
      updateURL({ creatorType: selectedProfessions, location: newLocations });
      setCustomLocationInput("");
    }
  };

  const handleRemoveLocation = (locToRemove) => {
    const newLocations = selectedLocations.filter((l) => l !== locToRemove);
    setSelectedLocations(newLocations);
    updateURL({ creatorType: selectedProfessions, location: newLocations });
  };

  const clearAllFilters = () => {
    setSelectedProfessions([]);
    setSelectedLocations([]);
    setCustomLocationInput("");
    updateURL({ creatorType: [], location: [] });
  };

  // --- Local filtering on already fetched results ---
  const filteredResults = results.filter((user) => {
    const professionMatch =
      selectedProfessions.length === 0 ||
      (user.type === "CREATOR" &&
        selectedProfessions.includes(user.creatorType));

    const userLocation =
      user.type === "CREATOR"
        ? user?.data?.personalInfo?.location || ""
        : user?.headquarters || "";

    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) =>
        userLocation.toLowerCase().includes(loc.toLowerCase())
      );

    return professionMatch && locationMatch;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const creatorType = params.get("creatorType")?.split(",") || [];
    const location = params.get("location")?.split(",") || [];
    setSelectedProfessions(creatorType);
    setSelectedLocations(location);
  }, []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Search className="w-4 h-4" />
                Search Results For
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                "{q}"
              </h1>
              <p className="text-slate-600">
                Found {filteredResults.length} user
                {filteredResults.length !== 1 ? "s" : ""}
              </p>
            </div>

            <Dialog open={showFilters} onOpenChange={setShowFilters}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className={`
        relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl
        border-2 border-blue-200 hover:border-blue-300 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50
      `}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                    {activeFilterCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 animate-pulse bg-blue-500 text-white"
                      >
                        {activeFilterCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              </DialogTrigger>

              <DialogContent
                className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-white shadow-xl rounded-2xl flex flex-col"
                style={{ padding: 0 }} // Keep padding minimal but allow for content to fill
              >
                {/* Dialog Header - Keep it as is */}
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 flex-row items-center justify-between sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 flex items-center justify-center">
                      <SlidersHorizontal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="font-bold text-xl text-slate-800">
                        Advanced Filters
                      </DialogTitle>
                      <DialogDescription className="text-sm text-slate-500">
                        Refine your search to find the perfect match
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                {/* The main content area where the scrollbar should appear */}
                <div className="p-6 pt-4 flex-1 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Professions Filter */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-800">
                          Professions
                        </h4>
                        {selectedProfessions.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            {selectedProfessions.length} selected
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {Object.entries(professions).map(
                          ([label, enumValue]) => (
                            <div
                              key={enumValue}
                              className={`
      flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer
      ${
        selectedProfessions.includes(enumValue)
          ? "bg-blue-50 border border-blue-200"
          : ""
      }
    `}
                              onClick={() => handleProfessionToggle(enumValue)}
                            >
                              <Checkbox
                                id={`profession-${enumValue}`}
                                checked={selectedProfessions.includes(
                                  enumValue
                                )}
                                onCheckedChange={() =>
                                  handleProfessionToggle(enumValue)
                                }
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-sky-500"
                              />
                              <label
                                htmlFor={`profession-${enumValue}`}
                                className="text-sm text-slate-700 cursor-pointer font-medium flex-1"
                              >
                                {label}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    {/* Locations Filter */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-800">
                          Locations
                        </h4>
                        {selectedLocations.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-700"
                          >
                            {selectedLocations.length} selected
                          </Badge>
                        )}
                      </div>

                      {/* Custom Location Input */}
                      <div className="space-y-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                        <Label className="text-sm font-medium text-slate-700">
                          Add Custom Location
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter city name (e.g., mumbai)"
                            value={customLocationInput}
                            onChange={(e) =>
                              setCustomLocationInput(e.target.value)
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleAddCustomLocation()
                            }
                            className="flex-1 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                          />
                          <Button
                            onClick={handleAddCustomLocation}
                            disabled={!customLocationInput.trim()}
                            className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white px-4"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Selected Locations Display */}
                      {selectedLocations.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                            Selected Locations
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedLocations.map((location, id) => (
                              <Badge
                                key={id}
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors"
                              >
                                {location}
                                <button
                                  onClick={() => handleRemoveLocation(location)}
                                  className="ml-2 hover:text-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Popular Locations */}
                      <div className="space-y-3">
                        <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                          Popular Locations
                        </Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {popularLocations.map((location) => (
                            <div
                              key={location}
                              className={`
      flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer
      ${
        selectedLocations.includes(location)
          ? "bg-emerald-50 border border-emerald-200"
          : ""
      }
    `}
                              onClick={() => handleLocationToggle(location)}
                            >
                              <Checkbox
                                id={`location-${location}`}
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() =>
                                  handleLocationToggle(location)
                                }
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-teal-500"
                              />
                              <label
                                htmlFor={`location-${location}`}
                                className="text-sm text-slate-700 cursor-pointer font-medium flex-1"
                              >
                                {location}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100 flex justify-end sticky bottom-0 bg-white z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">Finding creatives...</span>
            </div>
          )}

          {!loading && filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-8 h-8 mx-auto text-slate-400 mb-4" />
              <p className="text-xl font-semibold text-slate-600">
                No User found
              </p>
              <p className="text-slate-500">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((user) => (
              <Card
                key={user.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-white "
              >
                <CardHeader className="p-0 relative h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 opacity-80"></div>
                  <Avatar className="w-24 h-24 absolute -bottom-12 left-6 ring-4 ring-white shadow-sm">
                    <AvatarImage
                      src={user.image}
                      alt={user.username}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-600 text-white text-3xl font-bold">
                      {user.type === "BUSINESS"
                        ? getInitialLetter(user.companyName)
                        : getInitialLetter(user.username)}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="px-6 pt-16 pb-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">
                      {user.type === "BUSINESS"
                        ? user.companyName
                        : user.username}
                    </h3>
                    <Badge className="bg-green-200 text-black">
                      {user.type === "BUSINESS"
                        ? "Business account"
                        : "Creator account"}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {user.type === "CREATOR" ? user.creatorType : user.industry}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="w-4 h-4" />
                    {user.type === "BUSINESS"
                      ? user.headquarters
                      : user?.data?.personalInfo?.location}
                  </div>
                  <Link
                    href={
                      user.type === "BUSINESS"
                        ? `/profile/business/${user.username}`
                        : `/profile/${
                            user.username
                          }/${user.creatorType?.toLowerCase()}`
                    }
                  >
                    <Button className="w-full mt-3 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white">
                      <Eye className="w-4 h-4 mr-2" /> View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
