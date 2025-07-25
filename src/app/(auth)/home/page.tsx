"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./_components/course-card";
import { NewsCard } from "./_components/news-card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Course } from "../../../../types";

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setIsLoadingCourses(true);
      setCoursesError(null);

      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      // Limit to maximum 4 courses for the home page
      setCourses(data.courses.slice(0, 4));
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCoursesError("Failed to load courses");
    } finally {
      setIsLoadingCourses(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

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

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-400 via-purple-300 to-pink-300 rounded-2xl p-8 mb-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back,</h1>
          <p className="text-2xl text-white mb-6">{getUserFirstName()}</p>
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => router.push("/courses")}
          >
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Continue Learning
            </h2>
            <button
              onClick={() => router.push("/courses")}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              See All
            </button>
          </div>

          {/* Loading State */}
          {isLoadingCourses && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 animate-pulse"
                >
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {coursesError && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{coursesError}</p>
              <Button onClick={fetchCourses} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Courses Grid */}
          {!isLoadingCourses && !coursesError && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onContinue={() =>
                    router.push(`/courses/${course.id}/roadmap`)
                  }
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoadingCourses && !coursesError && courses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No courses found</p>
              <Button onClick={fetchCourses} variant="outline">
                Refresh
              </Button>
            </div>
          )}
        </div>

        {/* Recent News */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent News</h2>
            <span className="text-sm text-gray-500">Lihat Selengkapnya</span>
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
    </>
  );
}
