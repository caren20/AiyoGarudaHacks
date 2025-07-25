import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { message, sessionTitle, videoSrc } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create context-aware prompt with video information
    const prompt = `You are Eda (Empowered Digital Assistant), a helpful AI assistant for an educational platform. 
    You are currently helping a student with a lesson about "${
      sessionTitle || "the current topic"
    }".
    ${videoSrc ? `\nThe lesson includes a video: ${videoSrc}` : ""}
    
    Student's question: ${message}
    
    Please provide a helpful, educational response. Keep it concise but informative. If the question is about the lesson topic or video, provide relevant explanations. If it's a general question, still be helpful but try to relate it back to learning when possible.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error with Gemini AI:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
