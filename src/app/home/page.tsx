"use client";

import { useState, useEffect } from "react";
import { Bell, Search, ChevronRight, Mic } from "lucide-react";
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
import { CourseCard } from "@/components/course-card";
import { NewsCard } from "./_components/news-card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Get user's first name for greeting
  const getUserFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(" ")[0];
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

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
        <div className="text-lg">Loading...</div>
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
          <main className="p-6">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-400 via-purple-300 to-pink-300 rounded-2xl p-8 mb-8 overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back,
                </h1>
                <p className="text-2xl text-white mb-6">{getUserFirstName()}</p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  CONTINUE TO COURSE
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
                <div className="absolute right-8 top-8 w-32 h-20 bg-white/20 rounded-full"></div>
                <div className="absolute right-16 top-16 w-24 h-16 bg-white/15 rounded-full"></div>
                <div className="absolute right-4 bottom-8 w-28 h-18 bg-white/20 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Continue Learning
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CourseCard
                    title="Computer Science"
                    description="Learn how to build mobile, desktop, and web applications"
                    level="Beginner"
                    difficulty="Easy"
                    imageSrc="/placeholder.svg?height=128&width=300"
                    imageAlt="Computer Science"
                  />

                  <CourseCard
                    title="Electronics and Robotics"
                    description="Master electronic and robotic principles"
                    level="Intermediate"
                    difficulty="Hard"
                    imageSrc="/placeholder.svg?height=128&width=300"
                    imageAlt="Electronics and Robotics"
                  />

                  <CourseCard
                    title="Mechanical Design"
                    description="Learn mechanical design and engineering"
                    level="Intermediate"
                    difficulty="Intermediate"
                    imageSrc="/placeholder.svg?height=128&width=300"
                    imageAlt="Mechanical Design"
                  />

                  <CourseCard
                    title="Cybersecurity"
                    description="Build the skills to learn how to protect data"
                    level="Advanced"
                    difficulty="Advanced"
                    imageSrc="/placeholder.svg?height=128&width=300"
                    imageAlt="Cybersecurity"
                  />
                </div>
              </div>

              {/* Recent News */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent News
                  </h2>
                  <span className="text-sm text-gray-500">
                    Lihat Selengkapnya
                  </span>
                </div>
                <div className="space-y-4">
                  <NewsCard
                    title="Breaking Ground and Breaking Stereotypes: Nadia, the Woman Behind Jakarta's MRT Design"
                    description="Nadia stood out the moment she walked onto the construction site — not because of her skills, but because she was the only wo..."
                    imageSrc="/placeholder.svg?height=120&width=120"
                    imageAlt="Nadia"
                  />

                  <NewsCard
                    title="Mechanical Engineering with Purpose: Yuliana's Rise in a Male-Dominated Industry"
                    description="Yuliana entered her mechanical engineering class and found only 3 other women among 100 students. &quot;At first, I felt like I didn't be..."
                    imageSrc="/placeholder.svg?height=120&width=120"
                    imageAlt="Yuliana"
                  />

                  <NewsCard
                    title="From Stargazing in Yogyakarta to NASA: Raisa's Journey to the Stars"
                    description="Raisa was fascinated by the stars ever since her father pointed out Orion's Belt from their rooftop in Yogyakarta. Despite limited scie..."
                    imageSrc="/placeholder.svg?height=120&width=120"
                    imageAlt="Raisa"
                  />
                </div>
              </div>
            </div>
          </main>

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
