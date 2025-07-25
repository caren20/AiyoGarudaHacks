"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Course, Session } from "../../../../../../../types";

export default function SessionPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const sessionId = parseInt(params.sessionId as string);

  const [course, setCourse] = useState<Course | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Eda",
      message:
        "Hello! I'm Eda, your AI learning assistant. What can I help you with regarding this lesson?",
      isBot: true,
    },
  ]);

  // Fetch course and session data
  useEffect(() => {
    const fetchCourseAndSession = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const courseData = await response.json();
        setCourse(courseData);

        // Find the specific session
        const session = courseData.sessions?.find(
          (s: Session, index: number) => index + 1 === sessionId
        );

        if (session) {
          setCurrentSession(session);
        } else {
          setError("Session not found");
        }
      } catch (error) {
        console.error("Error fetching course and session:", error);
        setError("Failed to load session");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId && sessionId) {
      fetchCourseAndSession();
    }
  }, [courseId, sessionId]);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^#]*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSendMessage = async () => {
    if (chatMessage.trim() && !isSendingMessage && currentSession) {
      const userMessage = chatMessage.trim();
      const newUserMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: userMessage,
        isBot: false,
      };

      // Add user message immediately
      setChatMessages((prev) => [...prev, newUserMessage]);
      setChatMessage("");
      setIsSendingMessage(true);

      try {
        // Call Gemini AI API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            sessionTitle: currentSession.sessionTitle,
            videoSrc: currentSession.videoSrc,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const data = await response.json();

        // Add AI response
        const aiMessage = {
          id: chatMessages.length + 2,
          sender: "Eda",
          message: data.response,
          isBot: true,
        };

        setChatMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error sending message:", error);

        // Add error message
        const errorMessage = {
          id: chatMessages.length + 2,
          sender: "Eda",
          message:
            "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
          isBot: true,
        };

        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsSendingMessage(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Custom Header for Session - matching roadmap design */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 -mx-6 -mt-6 mb-6">
        <div className="flex items-center justify-between">
          <Link href={`/courses/${courseId}/roadmap`}>
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
          <div className="text-lg text-gray-600">Loading session...</div>
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
      {!isLoading && !error && course && currentSession && (
        <main className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content Area */}
            <div className="lg:col-span-2">
              {/* Session Header */}
              <div className="flex items-center space-x-4 mb-6">
                <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-medium">
                  SESSION {sessionId}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentSession.sessionTitle}
                </h2>
              </div>

              {/* Lesson Content */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 space-y-6">
                  {/* Topics Related */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      Topics Covered in This Session
                    </h3>
                    {currentSession.topicsRelated &&
                    currentSession.topicsRelated.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {currentSession.topicsRelated.map((topic, index) => (
                          <li key={index} className="text-gray-700">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 italic">
                        No topics listed for this session.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Video Player */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                    {currentSession.videoSrc ? (
                      (() => {
                        const videoId = getYouTubeVideoId(
                          currentSession.videoSrc
                        );
                        if (videoId) {
                          // YouTube video - use iframe embed
                          return (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                              title={`${currentSession.sessionTitle} - Video Lesson`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          );
                        } else {
                          // Regular video file
                          return (
                            <video
                              src={currentSession.videoSrc}
                              className="w-full h-full object-cover"
                              controls
                            />
                          );
                        }
                      })()
                    ) : (
                      <>
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          alt="Lesson Video"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="lg"
                            className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Empowered Digital Assistant (Eda)
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Chat Messages */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.isBot
                              ? "bg-blue-100 text-gray-800"
                              : "bg-purple-500 text-white"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder={
                        isSendingMessage
                          ? "Eda is thinking..."
                          : "Ask your question ..."
                      }
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        !isSendingMessage &&
                        handleSendMessage()
                      }
                      disabled={isSendingMessage}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={isSendingMessage || !chatMessage.trim()}
                      className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
                    >
                      {isSendingMessage ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
