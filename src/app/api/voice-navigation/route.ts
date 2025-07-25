import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: "Command is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a smart navigation assistant for an educational platform called Aiyo. 
Your job is to interpret user voice commands and return the appropriate navigation path.

Available pages and routes in the app:
- Home page: "/"
- Courses list: "/courses" 
- Course roadmap: "/courses/[courseId]/roadmap" (where courseId is dynamic)
- Session detail: "/courses/[courseId]/roadmap/[sessionId]" (where courseId and sessionId are dynamic)
- News page: "/news"
- Profile page: "/profile" 

User command: "${command}"

Rules:
1. If the user wants to go to a specific course or session but doesn't provide IDs, return a route with instructions to get the ID first
2. Be flexible with language - understand variations like "show me courses", "take me to my profile", "I want to see news", etc.
3. Handle typos and grammar mistakes gracefully
4. If the command is unclear, suggest the closest match
5. If no match is found, return an error message

Return your response in this exact JSON format:
{
  "route": "/path/to/route",
  "message": "Navigation message for user",
  "requiresId": false,
  "type": "success|error|redirect"
}

For dynamic routes that need IDs:
- If user says "show me course roadmap" without specifying which course, set requiresId to true and provide instructions
- If user mentions a specific course name, try to help them get to courses first

Examples:
- "go home" -> {"route": "/", "message": "Navigating to Home", "requiresId": false, "type": "success"}
- "show courses" -> {"route": "/courses", "message": "Navigating to Courses", "requiresId": false, "type": "success"}
- "course roadmap" -> {"route": "/courses", "message": "Please select a course first to view its roadmap", "requiresId": true, "type": "redirect"}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const navigationResult = JSON.parse(jsonMatch[0]);
        return NextResponse.json(navigationResult);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        route: "/",
        message:
          "I didn't understand that command. Try saying: Home, Courses, News, Profile, or Settings.",
        requiresId: false,
        type: "error",
      });
    }
  } catch (error) {
    console.error("Voice navigation error:", error);
    return NextResponse.json(
      {
        route: "/",
        message:
          "Sorry, I'm having trouble processing your command. Please try again.",
        requiresId: false,
        type: "error",
      },
      { status: 500 }
    );
  }
}
