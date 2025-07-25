import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface NewsCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function NewsCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <CardContent className="p-0">
        <div className="flex">
          <div className="flex-1 p-4">
            <h3 className="text-base font-bold text-blue-600 mb-2 leading-snug line-clamp-3">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-snug line-clamp-3">
              {description}
            </p>
          </div>
          <div className="w-32 sm:w-36 flex items-center justify-center p-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
