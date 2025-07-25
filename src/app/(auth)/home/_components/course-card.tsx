import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Course } from "../../../../../types";

interface CourseCardProps {
  course: Course;
  onContinue?: () => void;
}

const difficultyConfig: Record<string, string> = {
  Easy: "bg-green-500",
  Moderate: "bg-orange-500",
  Hard: "bg-red-500",
};

export function CourseCard({ course, onContinue }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        <Image
          src={course.imageSrc}
          alt={course.title}
          fill
          className="object-cover"
        />
        <Badge
          className={`absolute top-3 left-3 ${
            difficultyConfig[course.difficulty]
          } text-white`}
        >
          {course.difficulty}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
        <p className="text-xs text-gray-500 mb-3">
          Released:{" "}
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
          onClick={onContinue}
        >
          Continue to Course
        </Button>
      </CardContent>
    </Card>
  );
}
