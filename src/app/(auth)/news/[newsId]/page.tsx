"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  User,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { News } from "../../../../../types";
import { useParams } from "next/navigation";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.newsId as string;
  const [article, setArticle] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch news article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/news`);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        // Find the specific article by matching the index with newsId
        const articleIndex = parseInt(newsId) - 1;
        const foundArticle = data.news[articleIndex];

        if (!foundArticle) {
          throw new Error("Article not found");
        }

        setArticle(foundArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    if (newsId) {
      fetchArticle();
    }
  }, [newsId]);

  // Helper function to get badge color based on job field
  const getBadgeColor = (job: string) => {
    const jobLower = job.toLowerCase();
    if (jobLower.includes("engineer")) {
      return "bg-blue-500";
    } else if (
      jobLower.includes("scientist") ||
      jobLower.includes("physicist")
    ) {
      return "bg-purple-500";
    } else if (
      jobLower.includes("developer") ||
      jobLower.includes("programmer")
    ) {
      return "bg-green-500";
    } else {
      return "bg-gray-500";
    }
  };

  // Extended article content (mock data for demonstration)
  const getExtendedContent = (article: News) => {
    const baseContent = article.description;

    // Extended content based on the person
    const extendedContents: { [key: string]: string } = {
      Nadia: `${baseContent}

Nadia earned her civil engineering degree with distinction, specializing in sustainable infrastructure. Early in her career, she quickly gained recognition for leading one of the first all-green bridge rehabilitation projects in her region, combining structural innovation with environmental responsibility.

Her approach challenged conventional practices and proved that eco-conscious design could meet—and even exceed—engineering standards. As the youngest project manager at her firm, Nadia oversaw multimillion-dollar developments, often in regions where women had never held such authority on a construction site. Her leadership style was collaborative but firm, and her deep technical knowledge earned her the respect of senior engineers and site workers alike. When questioned or underestimated, she responded not with defensiveness, but with data, design solutions, and results.

Beyond the construction zone, Nadia used her platform to advocate for more women in engineering. She launched mentorship programs in universities, visited high schools to talk to girls about careers in STEM, and co-founded a nonprofit that connects female engineers across Asia and the Middle East. The message was clear: visibility matters, and young women need to see others like them leading in fields they've been told were not meant for them.`,

      Yuliana: `${baseContent}

Yuliana's journey began in a mechanical engineering classroom where she was one of only four women among 100 students. The isolation was immediate and overwhelming. "At first, I felt like I didn't belong," she admits. "Every group project, every lab session, I had to prove myself twice as much as my male peers."

But rather than shrinking back, Yuliana used the challenge as fuel. She threw herself into her studies, often spending extra hours in the workshop learning to operate machinery that many assumed she couldn't handle. Her professors took notice, not just of her technical skills, but of her innovative approach to problem-solving.

Today, Yuliana leads major mechanical projects for a Fortune 500 company, designing systems that power manufacturing facilities across Southeast Asia. Her team of 30 engineers looks to her for guidance on everything from precision tooling to large-scale automation systems. She's known for her meticulous attention to detail and her ability to see solutions where others see obstacles.

"The key is persistence," she says. "Every door that seemed closed, every meeting where I was the only woman, every project where people doubted my capabilities—those became opportunities to prove that excellence has no gender."`,

      Raisa: `${baseContent}

Raisa's fascination with the cosmos began on a rooftop in Yogyakarta, where her father would point out constellations and tell stories about the stars. Despite growing up with limited access to advanced science resources, her curiosity never waned. She would spend hours at the local library, devouring every astronomy book she could find.

Her academic journey wasn't easy. Coming from a modest background, she had to work part-time jobs to fund her physics degree. But her professors quickly recognized her exceptional analytical mind and her ability to grasp complex astrophysical concepts. She earned scholarships that allowed her to focus entirely on her studies.

Today, Dr. Raisa works at NASA's Goddard Space Flight Center, where she analyzes data from space telescopes and contributes to missions that search for exoplanets. Her research has been published in leading astrophysics journals, and she's been part of teams that have discovered potentially habitable worlds beyond our solar system.

"When I look through those telescopes now, I remember that little girl on the rooftop in Yogyakarta," she reflects. "The universe seemed so vast and unreachable then. Now I know that with determination and the right support, even the stars are within reach."`,
    };

    return extendedContents[article.name] || baseContent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Custom Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 -mx-6 -mt-6 mb-6">
        <div className="flex items-center justify-between">
          <Link href="/news">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`${
                isLiked ? "text-red-500 border-red-500" : "text-gray-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading article...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/news">
            <Button variant="outline">Back to News</Button>
          </Link>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && article && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Article Header Card */}
          <Card className="overflow-hidden mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Content Side */}
                <div className="lg:col-span-2 p-6 sm:p-8">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <Badge
                      className={`${getBadgeColor(article.job)} text-white`}
                    >
                      {article.job}
                    </Badge>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 leading-tight">
                    {article.title}
                  </h1>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">
                        {article.name}, {article.age}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{article.job}</span>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:col-span-1 flex items-center justify-center p-6">
                  <div className="relative w-full max-w-sm">
                    <div className="relative h-64 sm:h-80 w-full">
                      <Image
                        src={article.imageSrc}
                        alt={article.name}
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.name}, {article.age}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {getExtendedContent(article)
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="text-base sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Inspired by {article.name}&apos;s Story?
              </h3>
              <p className="text-blue-100 mb-6">
                Discover more inspiring stories of women breaking barriers in
                STEM fields.
              </p>
              <Link href="/news">
                <Button variant="secondary" size="lg">
                  Read More Stories
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
