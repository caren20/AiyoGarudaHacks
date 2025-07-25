"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { News } from "../../../../types";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch news from API
  const fetchNews = async () => {
    try {
      setIsLoadingNews(true);
      setNewsError(null);

      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNews(data.news);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsError("Failed to load news");
    } finally {
      setIsLoadingNews(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

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

  // Split news for display (first 3 as latest, rest as most popular)
  const latestNews = news.slice(0, 3);
  const mostPopularNews = news; // Show all news in Most Popular

  // Today's quote data (single quote)
  const todaysQuote = {
    id: 2,
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Katherine Johnson",
    authorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    background: "bg-gradient-to-r from-blue-500 to-purple-500",
  };

  return (
    <>
      {/* Loading State */}
      {isLoadingNews && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Latest News
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
      {newsError && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{newsError}</p>
          <Button onClick={fetchNews} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Main Content */}
      {!isLoadingNews && !newsError && (
        <>
          {/* Latest News Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-purple-50 border-0"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-blue-500 font-medium">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </div>
                        </div>
                        <h3 className="font-bold text-blue-600 mb-2 line-clamp-3 text-base leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {article.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() =>
                            router.push(
                              `/news/${
                                news.findIndex((n) => n.id === article.id) + 1
                              }`
                            )
                          }
                        >
                          Read Now
                        </Button>
                      </div>
                      <div className="w-32 sm:w-36 flex items-center justify-center p-3">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                          <Image
                            src={article.imageSrc || "/placeholder.svg"}
                            alt={article.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute top-1 right-1 bg-blue-600 text-white px-1 py-0.5 rounded text-xs font-medium">
                            {article.name.split(" ")[0]}, {article.age}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Row: Most Popular and Today's Quotes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Most Popular Section - Takes 2/3 of the width */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Most Popular
              </h2>
              <div className="space-y-4">
                {mostPopularNews.map((article, index) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/news/${index + 1}`)}
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={article.imageSrc || "/placeholder.svg"}
                            alt={article.name}
                            fill
                            className="object-cover"
                          />
                          <Badge
                            className={`absolute top-2 left-2 ${getBadgeColor(
                              article.job
                            )} text-white text-xs`}
                          >
                            {article.job}
                          </Badge>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-blue-500 mb-1">
                              {new Date(article.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </p>
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {article.description}
                            </p>
                            <p className="text-xs text-blue-500">
                              {article.name}, {article.age}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Today's Quote Section - Takes 1/3 of the width */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Today&apos;s Quote
              </h2>
              <Card
                className={`overflow-hidden ${todaysQuote.background} text-white`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="text-4xl opacity-50">&ldquo;</span>
                    <p className="text-sm leading-relaxed">
                      {todaysQuote.quote}
                    </p>
                    <span className="text-4xl opacity-50">&rdquo;</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 mr-3">
                      <Image
                        src={todaysQuote.authorImage}
                        alt={todaysQuote.author}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {todaysQuote.author}
                      </p>
                      <p className="text-xs opacity-75">
                        NASA Mathematician & Space Pioneer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
