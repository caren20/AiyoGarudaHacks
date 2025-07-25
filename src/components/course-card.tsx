import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  difficulty: "Easy" | "Intermediate" | "Hard" | "Advanced";
  imageSrc: string;
  imageAlt: string;
  onContinue?: () => void;
}

const difficultyConfig = {
  Easy: "bg-green-500",
  Intermediate: "bg-orange-500",
  Hard: "bg-red-500",
  Advanced: "bg-teal-500",
};

export function CourseCard({
  title,
  description,
  level,
  difficulty,
  imageSrc,
  imageAlt,
  onContinue,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        <Badge
          className={`absolute top-3 left-3 ${difficultyConfig[difficulty]} text-white`}
        >
          {difficulty}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-500 mb-3">Level: {level}</p>
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
