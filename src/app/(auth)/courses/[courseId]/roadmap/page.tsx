"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course, Session } from "../../../../../../types";
import { useParams } from "next/navigation";

interface CourseModule {
  id: number;
  title: string;
  position: { x: number; y: number };
  gradient: string;
}

export default function Roadmap() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const courseData = await response.json();
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Generate modules from sessions
  const generateModulesFromSessions = (sessions: Session[]): CourseModule[] => {
    const positions = [
      { x: 20, y: 80 }, // Session 1 - left
      { x: 50, y: 65 }, // Session 2 - center
      { x: 80, y: 50 }, // Session 3 - right
      { x: 50, y: 35 }, // Session 4 - center
      { x: 20, y: 20 }, // Session 5 - left
      { x: 50, y: 8 }, // Session 6 - center (moved down from 10% to 8% but still giving space)
    ];

    const gradients = [
      "from-cyan-400 to-blue-500",
      "from-cyan-400 to-blue-500",
      "from-cyan-400 to-blue-500",
      "from-purple-400 to-pink-500",
      "from-purple-400 to-pink-500",
      "from-purple-400 to-pink-500",
    ];

    // Function to truncate title to max 2 words
    const truncateTitle = (title: string): string => {
      const words = title.split(" ");
      if (words.length > 2) {
        return words.slice(0, 2).join(" ") + "...";
      }
      return title;
    };

    return sessions.map((session, index) => ({
      id: index + 1,
      title: truncateTitle(session.sessionTitle),
      position: positions[index] || { x: 50, y: 50 },
      gradient: gradients[index] || "from-blue-400 to-purple-500",
    }));
  };

  const modules = course?.sessions
    ? generateModulesFromSessions(course.sessions)
    : [];

  const pathPoints = modules.map((module) => module.position);

  const createPath = () => {
    if (pathPoints.length === 0) return "";

    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];

      // Create smoother curves for the zigzag pattern
      const cp1x = prev.x;
      const cp1y = prev.y + (curr.y - prev.y) * 0.3;
      const cp2x = curr.x;
      const cp2y = curr.y - (curr.y - prev.y) * 0.3;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Custom Header for Roadmap */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 -mx-6 -mt-6 mb-6">
        <div className="flex items-center justify-between">
          <Link href="/courses">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 sm:px-6 py-2 rounded-full">
            <h1 className="text-sm sm:text-lg font-bold">
              {course ? `${course.title} - ${course.difficulty}` : "Loading..."}
            </h1>
          </div>
          <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading course roadmap...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && course && (
        <div className="relative h-[calc(100vh-150px)] overflow-visible">
          {/* Decorative Elements */}
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 text-pink-400 opacity-60">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="absolute top-20 sm:top-40 right-16 sm:right-32 text-purple-400 opacity-60">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 text-pink-400 opacity-60">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          {/* SVG Container for Path and Modules */}
          <div className="relative w-full h-full pt-8 pb-8">
            {pathPoints.length > 1 && (
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Curved Path */}
                <defs>
                  <linearGradient
                    id="pathGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d={createPath()}
                  stroke="url(#pathGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Course Modules */}
            {modules.map((module) => (
              <div
                key={module.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${module.position.x}%`,
                  top: `${module.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Module Circle */}
                <div className="relative group mb-2">
                  <Link href={`/courses/${courseId}/roadmap/${module.id}`}>
                    <Button
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${module.gradient} text-white text-lg sm:text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer`}
                    >
                      {module.id}
                    </Button>
                  </Link>
                </div>

                {/* Module Title */}
                <div className="text-center">
                  <div className="px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-white shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {module.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
