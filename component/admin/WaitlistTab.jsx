"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Users,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building2,
  Clock,
} from "lucide-react";
import StatCard from "./StatCard";
import SignupChart from "./SignupChart";
import RoleDonut from "./RoleDonut";

const MONTH_OPTIONS = [
  { value: "3", label: "Last 3 months" },
  { value: "6", label: "Last 6 months" },
  { value: "12", label: "Last 12 months" },
];

const ROLE_TABS = [
  { value: "", label: "All" },
  { value: "CREATOR", label: "Creators" },
  { value: "COMPANY", label: "Companies" },
];

export default function WaitlistTab() {
  const {
    waitlist,
    pagination,
    filters,
    isLoading,
    fetchWaitlist,
    deleteWaitlistEntry,
    setFilters,
    setPage,
    waitlistStats,
    fetchWaitlistStats,
    statsMonths,
    setStatsMonths,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Initial load
  useEffect(() => {
    fetchWaitlist();
    fetchWaitlistStats();
  }, [fetchWaitlist, fetchWaitlistStats]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchTerm });
      fetchWaitlist({ search: searchTerm });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const creators = waitlistStats?.byRole?.CREATOR || 0;
  const companies = waitlistStats?.byRole?.COMPANY || 0;
  const pending = waitlistStats?.byStatus?.PENDING || 0;

  const roleDonutData = [
    { name: "Creators", value: creators, color: "#3b82f6" },
    { name: "Companies", value: companies, color: "#a855f7" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Waitlist" value={waitlistStats?.total ?? "—"} accent="yellow" />
        <StatCard icon={UserCheck} label="Creators" value={creators} accent="blue" />
        <StatCard icon={Building2} label="Companies" value={companies} accent="purple" />
        <StatCard icon={Clock} label="Pending" value={pending} accent="gray" />
      </div>

      {/* Month filter + charts */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Growth & breakdown</h2>
        <Select value={String(statsMonths)} onValueChange={(v) => setStatsMonths(Number(v))}>
          <SelectTrigger className="w-44 h-10 border-gray-200 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SignupChart data={waitlistStats?.timeline || []} title="Waitlist signups per month" />
        </div>
        <RoleDonut data={roleDonutData} title="By role" />
      </div>

      {/* Role sub-filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        {ROLE_TABS.map((tab) => {
          const active = (filters.role || "") === tab.value;
          const count =
            tab.value === "" ? waitlistStats?.total ?? 0 : waitlistStats?.byRole?.[tab.value] ?? 0;
          return (
            <button
              key={tab.value || "all"}
              onClick={() => {
                setFilters({ role: tab.value });
                fetchWaitlist({ role: tab.value });
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                active
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  active ? "bg-black/10" : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        <div className="relative flex-1 min-w-[200px] ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 border-gray-200 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200 py-4 px-6">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Waitlist Entries
            {pagination && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Showing {waitlist.length} of {pagination.total})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-500 mb-3" />
              <p className="text-gray-500 text-sm">Loading waitlist...</p>
            </div>
          ) : waitlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No entries found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6">Name</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6">Email</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 text-center">Role</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6">Joined At</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlist.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-yellow-50/50 transition-colors border-b border-gray-100 last:border-b-0">
                        <TableCell className="font-medium text-gray-900 py-4 px-6">{entry.name}</TableCell>
                        <TableCell className="text-gray-600 py-4 px-6">{entry.email}</TableCell>
                        <TableCell className="py-4 px-6 text-center">
                          <Badge
                            className={
                              entry.role === "CREATOR"
                                ? "bg-blue-100 text-blue-700 border-0 font-medium text-xs"
                                : "bg-purple-100 text-purple-700 border-0 font-medium text-xs"
                            }
                          >
                            {entry.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm py-4 px-6">{formatDate(entry.createdAt)}</TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center justify-center">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteWaitlistEntry(entry.id)}
                              className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Page {pagination.page} of {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={pagination.page === 1}
                      onClick={() => {
                        setPage(pagination.page - 1);
                        fetchWaitlist({ page: pagination.page - 1 });
                      }}
                      className="h-8 px-3 border-gray-200 hover:bg-gray-100 text-gray-600"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() => {
                        setPage(pagination.page + 1);
                        fetchWaitlist({ page: pagination.page + 1 });
                      }}
                      className="h-8 px-3 border-gray-200 hover:bg-gray-100 text-gray-600"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
