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
  const creatorTypeParam = searchParams.get("creatorType") || "";
  const locationParam = searchParams.get("location") || "";

  const { results, fetchSearchResults, loading } = useAuthStore();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [customLocationInput, setCustomLocationInput] = useState("");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    const creatorTypes = creatorTypeParam ? creatorTypeParam.split(",") : [];
    const locations = locationParam ? locationParam.split(",") : [];
    setSelectedProfessions(creatorTypes);
    setSelectedLocations(locations);
  }, [creatorTypeParam, locationParam]);

  useEffect(() => {
    const creatorTypes =
      selectedProfessions.length > 0 ? selectedProfessions.join(",") : "";
    const locations =
      selectedLocations.length > 0 ? selectedLocations.join(",") : "";

    fetchSearchResults(q, creatorTypes, locations);
  }, [q, selectedProfessions, selectedLocations, fetchSearchResults]);

  useEffect(() => {
    setActiveFilterCount(selectedProfessions.length + selectedLocations.length);
  }, [selectedProfessions, selectedLocations]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Search className="w-4 h-4 text-yellow-600" />
                Search Results For
              </div>
              <h1 className="text-3xl font-bold text-gray-900">"{q}"</h1>
              <p className="text-gray-700">
                Found {results.length} user{results.length !== 1 ? "s" : ""}
              </p>
              {results.length === 0 && !loading && (
                <p className="text-sm text-gray-600 italic">
                  Tip: You can search by username, name, or creator type (e.g.,
                  "youtuber").
                </p>
              )}
            </div>

            <Dialog open={showFilters} onOpenChange={setShowFilters}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-400 hover:border-yellow-500 bg-white text-gray-900 hover:bg-yellow-50"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold">Filters</span>
                    {activeFilterCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 animate-pulse bg-yellow-500 text-gray-900 font-semibold"
                      >
                        {activeFilterCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              </DialogTrigger>

              <DialogContent
                className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-2xl flex flex-col"
                style={{ padding: 0 }}
              >
                <DialogHeader className="p-6 pb-4 border-b border-gray-200 flex-row items-center justify-between sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                      <SlidersHorizontal className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <DialogTitle className="font-bold text-xl text-gray-900">
                        Advanced Filters
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-600">
                        Refine your search to find the perfect match
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="p-6 pt-4 flex-1 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-900" />
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Professions
                        </h4>
                        {selectedProfessions.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-700"
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
                              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer ${
                                selectedProfessions.includes(enumValue)
                                  ? "bg-yellow-100 border border-yellow-300"
                                  : ""
                              }`}
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
                                className="data-[state=checked]:bg-yellow-500 data-[state=checked]:text-gray-900 border-gray-300"
                              />
                              <label
                                htmlFor={`profession-${enumValue}`}
                                className="text-sm text-gray-800 cursor-pointer font-medium flex-1"
                              >
                                {label}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-gray-900" />
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Locations
                        </h4>
                        {selectedLocations.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-700"
                          >
                            {selectedLocations.length} selected
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Label className="text-sm font-medium text-gray-700">
                          Add Custom Location
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter state or city name"
                            value={customLocationInput}
                            onChange={(e) =>
                              setCustomLocationInput(e.target.value)
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleAddCustomLocation()
                            }
                            className="flex-1 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                          />
                          <Button
                            onClick={handleAddCustomLocation}
                            disabled={!customLocationInput.trim()}
                            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-4"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {selectedLocations.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                            Selected Locations
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedLocations.map((location, id) => (
                              <Badge
                                key={id}
                                variant="secondary"
                                className="bg-yellow-100 text-gray-900 hover:bg-yellow-200 cursor-pointer transition-colors"
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

                      <div className="space-y-3">
                        <Label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                          Popular Locations
                        </Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {popularLocations.map((location) => (
                            <div
                              key={location}
                              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer ${
                                selectedLocations.includes(location)
                                  ? "bg-yellow-100 border border-yellow-300"
                                  : ""
                              }`}
                              onClick={() => handleLocationToggle(location)}
                            >
                              <Checkbox
                                id={`location-${location}`}
                                checked={selectedLocations.includes(location)}
                                onCheckedChange={() =>
                                  handleLocationToggle(location)
                                }
                                className="data-[state=checked]:bg-yellow-500 data-[state=checked]:text-gray-900 border-gray-300"
                              />
                              <label
                                htmlFor={`location-${location}`}
                                className="text-sm text-gray-800 cursor-pointer font-medium flex-1"
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

                <div className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              <span className="ml-3 text-gray-600">Finding creatives...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                No users found for "{q}"
              </p>
              <p className="text-gray-600 mb-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((user) => (
              <Link
                key={user.id}
                href={
                  user.type === "BUSINESS"
                    ? `/profile/business/${user.username}`
                    : user.type === "FOUNDER"
                    ? `/profile/${user.username}/founder`
                    : `/profile/${user.username}/${user.creatorType?.toLowerCase()}`
                }
              >
                <Card className="group border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white overflow-hidden cursor-pointer hover:-translate-y-1">
                  {/* Header with gradient */}
                  <CardHeader className="p-0 relative h-28">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white/30 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 border-4 border-white/20 rounded-full"></div>
                    </div>
                    {/* Badge positioned on header */}
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-black font-semibold px-3 py-1 text-xs">
                      {user.type === "BUSINESS"
                        ? "Business"
                        : user.type === "FOUNDER"
                        ? "Founder"
                        : user.creatorType.charAt(0) +
                          user.creatorType.slice(1).toLowerCase()}
                    </Badge>
                  </CardHeader>

                  {/* Avatar */}
                  <div className="relative px-5">
                    <Avatar className="w-20 h-20 absolute -top-10 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage
                        src={user.image}
                        alt={user.username}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-yellow-500 text-black text-2xl font-bold">
                        {user.type === "BUSINESS"
                          ? getInitialLetter(user.companyName)
                          : getInitialLetter(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <CardContent className="px-5 pt-14 pb-5">
                    {/* Name */}
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors truncate">
                      {user.type === "BUSINESS" ? user.companyName : user.username}
                    </h3>

                    {/* Industry for business */}
                    {user.type === "BUSINESS" && user.industry && (
                      <p className="text-gray-500 text-sm mt-1">{user.industry}</p>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <span className="truncate">
                        {user.type === "BUSINESS"
                          ? user.headquarters || "Location not specified"
                          : user?.location ||
                            user?.data?.personalInfo?.location ||
                            "Location not specified"}
                      </span>
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-600 group-hover:text-yellow-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fcd34d; /* yellow-400 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fbbf24; /* yellow-500 */
        }
      `}</style>
    </div>
  );
}
