"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminStore } from "@/store/useAdminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { user, isAuthenticated } = useAuthStore();

  const {
    waitlist,
    pagination,
    filters,
    fetchWaitlist,
    deleteWaitlistEntry,
    setFilters,
    setPage,
    isLoading,
  } = useAdminStore();

  // Check if user is admin
  useEffect(() => {
    if (isAuthenticated && !user?.isAdmin) {
      router.push("/feed");
    }
  }, [isAuthenticated, user, router]);

  // Fetch waitlist on mount
  useEffect(() => {
    if (user?.isAdmin) {
      fetchWaitlist();
    }
  }, [user?.isAdmin, fetchWaitlist]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.isAdmin) {
        setFilters({ search: searchTerm });
        fetchWaitlist({ search: searchTerm });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, user?.isAdmin]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  // Show access denied if not admin
  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have admin privileges.</p>
        <Button
          onClick={() => router.push("/feed")}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Go to Feed
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Waitlist Management</h1>
              <p className="text-gray-500 mt-1">
                View and manage waitlist applications
              </p>
            </div>
          </div>
          {pagination && (
            <div className="hidden sm:block bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{pagination.total}</span> total entries
              </p>
            </div>
          )}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 bg-gray-50"
              />
            </div>

            {/* Role filter */}
            <Select
              value={filters.role || "all"}
              onValueChange={(value) => {
                const role = value === "all" ? "" : value;
                setFilters({ role });
                fetchWaitlist({ role });
              }}
            >
              <SelectTrigger className="w-full sm:w-40 h-11 border-gray-200 bg-gray-50">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="CREATOR">Creator</SelectItem>
                <SelectItem value="COMPANY">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Waitlist Table */}
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
                        <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 w-[180px] border-r border-gray-200">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 border-r border-gray-200">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 text-center w-[120px] border-r border-gray-200">
                          Role
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 w-[180px] border-r border-gray-200">
                          Joined At
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600 text-xs uppercase tracking-wider py-3 px-6 text-center w-[80px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {waitlist.map((entry, index) => (
                        <TableRow
                          key={entry.id}
                          className="hover:bg-yellow-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <TableCell className="font-medium text-gray-900 py-4 px-6 border-r border-gray-100">
                            {entry.name}
                          </TableCell>
                          <TableCell className="text-gray-600 py-4 px-6 border-r border-gray-100">
                            {entry.email}
                          </TableCell>
                          <TableCell className="py-4 px-6 text-center border-r border-gray-100">
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
                          <TableCell className="text-gray-500 text-sm py-4 px-6 border-r border-gray-100">
                            {formatDate(entry.createdAt)}
                          </TableCell>
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

                {/* Pagination */}
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
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
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
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
