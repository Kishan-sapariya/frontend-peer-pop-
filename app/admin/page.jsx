"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard, ShieldAlert, ClipboardList, UsersRound } from "lucide-react";
import WaitlistTab from "@/component/admin/WaitlistTab";
import RegisteredUsersTab from "@/component/admin/RegisteredUsersTab";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // Redirect non-admins away
  useEffect(() => {
    if (isAuthenticated && !user?.isAdmin) {
      router.push("/feed");
    }
  }, [isAuthenticated, user, router]);

  // Loading while auth resolves
  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  // Access denied for non-admins
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
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <LayoutDashboard className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Waitlist and registered-user analytics at a glance
            </p>
          </div>
        </div>

        {/* Top-level tabs */}
        <Tabs defaultValue="waitlist" className="gap-6">
          <TabsList className="bg-white border border-gray-200 h-11 p-1 rounded-xl shadow-sm">
            <TabsTrigger
              value="waitlist"
              className="px-5 data-[state=active]:bg-yellow-500 data-[state=active]:text-black rounded-lg"
            >
              <ClipboardList className="w-4 h-4 mr-1.5" />
              Waitlist Users
            </TabsTrigger>
            <TabsTrigger
              value="registered"
              className="px-5 data-[state=active]:bg-yellow-500 data-[state=active]:text-black rounded-lg"
            >
              <UsersRound className="w-4 h-4 mr-1.5" />
              Registered Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waitlist">
            <WaitlistTab />
          </TabsContent>
          <TabsContent value="registered">
            <RegisteredUsersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
