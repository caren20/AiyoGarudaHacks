"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bell, Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VoiceNavigationDialog } from "@/components/voice-navigation-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center mb-6">
            <Image
              src="/images/logo-loading.gif"
              alt="Loading..."
              width={96}
              height={96}
              unoptimized
            />
          </div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Redirecting...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search here ..."
                      className="pl-10 bg-gray-100 border-0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
                <div className="flex items-center space-x-3">
                  {user.displayName && (
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.displayName}
                    </span>
                  )}
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">{children}</main>

          {/* Floating Voice Navigation Button */}
          <Button
            size="lg"
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg z-50"
            onClick={() => setIsVoiceDialogOpen(true)}
          >
            <Mic className="w-6 h-6 text-white" />
          </Button>

          {/* Voice Navigation Dialog */}
          <VoiceNavigationDialog
            open={isVoiceDialogOpen}
            onOpenChange={setIsVoiceDialogOpen}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthLayout;
