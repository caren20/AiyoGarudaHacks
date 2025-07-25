import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "../../../../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Function to fetch all courses from Firebase
async function fetchCourses(): Promise<Course[]> {
  try {
    const coursesQuery = query(
      collection(db, "courses"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(coursesQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        imageSrc: data.imageSrc,
        sessions: data.sessions || [],
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Function to find course by name or partial match
function findCourseByName(
  courses: Course[],
  searchTerm: string
): Course | null {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  // First try exact match
  let foundCourse = courses.find(
    (course) => course.title.toLowerCase() === normalizedSearch
  );

  if (foundCourse) return foundCourse;

  // Then try partial match (contains)
  foundCourse = courses.find(
    (course) =>
      course.title.toLowerCase().includes(normalizedSearch) ||
      normalizedSearch.includes(course.title.toLowerCase())
  );

  if (foundCourse) return foundCourse;

  // Finally try word-by-word match
  const searchWords = normalizedSearch.split(" ");
  foundCourse = courses.find((course) => {
    const titleWords = course.title.toLowerCase().split(" ");
    return searchWords.some((searchWord) =>
      titleWords.some(
        (titleWord) =>
          titleWord.includes(searchWord) || searchWord.includes(titleWord)
      )
    );
  });

  return foundCourse || null;
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: "Command is required" },
        { status: 400 }
      );
    }

    // Fetch available courses
    const courses = await fetchCourses();
    const courseList = courses
      .map((course) => `- ${course.title} (ID: ${course.id})`)
      .join("\n");

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

Available courses in the database:
${courseList}

User command: "${command}"

Rules:
1. For basic navigation (home, courses, news, profile, settings), return direct routes
2. If user mentions a specific course name, try to match it with available courses and return the course roadmap route
3. If user wants "course roadmap" without specifying which course, direct them to courses list
4. Be flexible with language - understand variations like "show me courses", "take me to my profile", etc.
5. Handle typos and grammar mistakes gracefully
6. For course names, try partial matching (e.g., "javascript" could match "JavaScript Fundamentals")
7. If no clear match is found, provide helpful suggestions

Special handling for courses:
- If user says something like "go to javascript course" or "show me python roadmap", try to find a matching course
- Return the specific course roadmap route: "/courses/[actualCourseId]/roadmap"
- If multiple courses match, suggest going to courses list first

Return your response in this exact JSON format:
{
  "route": "/path/to/route",
  "message": "Navigation message for user",
  "requiresId": false,
  "type": "success|error|redirect",
  "courseName": "course name if matched"
}

Examples:
- "go home" -> {"route": "/", "message": "Navigating to Home", "requiresId": false, "type": "success"}
- "show courses" -> {"route": "/courses", "message": "Navigating to Courses", "requiresId": false, "type": "success"}
- "javascript course" -> {"route": "/courses/[courseId]/roadmap", "message": "Navigating to JavaScript course roadmap", "requiresId": false, "type": "success", "courseName": "JavaScript Fundamentals"}
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

        // If the AI suggested a course name, try to find the actual course
        if (
          navigationResult.courseName &&
          navigationResult.route.includes("[courseId]")
        ) {
          const foundCourse = findCourseByName(
            courses,
            navigationResult.courseName
          );
          if (foundCourse) {
            navigationResult.route = navigationResult.route.replace(
              "[courseId]",
              foundCourse.id
            );
            navigationResult.message = `Navigating to ${foundCourse.title} roadmap`;
          } else {
            // If course not found, redirect to courses list
            navigationResult.route = "/courses";
            navigationResult.message = `I couldn't find "${navigationResult.courseName}". Please select from available courses.`;
            navigationResult.type = "redirect";
          }
        }

        return NextResponse.json(navigationResult);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        route: "/",
        message:
          "I didn't understand that command. Try saying: Home, Courses, News, Profile, Settings, or a course name.",
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
