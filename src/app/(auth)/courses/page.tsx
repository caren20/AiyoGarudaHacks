"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Course } from "../../../../types";

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);

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
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCoursesError("Failed to load courses");
    } finally {
      setIsLoadingCourses(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Helper function to get badge color based on difficulty
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "moderate":
      case "medium":
        return "bg-orange-500";
      case "hard":
      case "difficult":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Filter courses based on difficulty
  const filterOptions = ["All", "Easy", "Moderate", "Hard"];

  const filteredCourses =
    activeFilter === "All"
      ? courses
      : courses.filter(
          (course) =>
            course.difficulty.toLowerCase() === activeFilter.toLowerCase()
        );

  // Split courses for display (first 4 as ongoing, rest as all courses)
  const ongoingCourses = courses.slice(0, 4);
  const remainingCourses =
    activeFilter === "All" ? courses.slice(4) : filteredCourses;

  return (
    <>
      {/* Loading State */}
      {isLoadingCourses && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Ongoing Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      {/* Main Content */}
      {!isLoadingCourses && !coursesError && (
        <>
          {/* Ongoing Courses Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Ongoing Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ongoingCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={course.imageSrc || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${getBadgeColor(
                        course.difficulty
                      )} text-white`}
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {new Date(course.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Continue to Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Courses Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
              <div className="flex space-x-2">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={
                      activeFilter === filter
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "text-gray-600 hover:text-gray-800"
                    }
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={course.imageSrc || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <Badge
                          className={`absolute top-2 left-2 ${getBadgeColor(
                            course.difficulty
                          )} text-white text-xs`}
                        >
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {course.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(course.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            View Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State for filtered results */}
            {remainingCourses.length === 0 && activeFilter !== "All" && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No courses found for difficulty: {activeFilter}
                </p>
                <Button
                  onClick={() => setActiveFilter("All")}
                  variant="outline"
                >
                  Show All Courses
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
