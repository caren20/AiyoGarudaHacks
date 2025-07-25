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

// Function to find session by title within courses
function findSessionByTitle(
  courses: Course[],
  searchTerm: string,
  courseName?: string
): { course: Course; sessionIndex: number } | null {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  // If course name is provided, search only in that course
  const coursesToSearch = courseName
    ? courses.filter(
        (course) =>
          course.title.toLowerCase().includes(courseName.toLowerCase()) ||
          courseName.toLowerCase().includes(course.title.toLowerCase())
      )
    : courses;

  for (const course of coursesToSearch) {
    if (!course.sessions || course.sessions.length === 0) continue;

    for (let i = 0; i < course.sessions.length; i++) {
      const session = course.sessions[i];

      // Check session title match
      const normalizedTitle = session.sessionTitle.toLowerCase();

      // Exact match
      if (
        normalizedTitle.includes(normalizedSearch) ||
        normalizedSearch.includes(normalizedTitle)
      ) {
        return { course, sessionIndex: i };
      }

      // Word-by-word match for session title
      const searchWords = normalizedSearch.split(" ");
      const titleWords = normalizedTitle.split(" ");

      const wordMatch = searchWords.some((searchWord) =>
        titleWords.some(
          (titleWord) =>
            titleWord.includes(searchWord) || searchWord.includes(titleWord)
        )
      );

      if (wordMatch) {
        return { course, sessionIndex: i };
      }
    }
  }

  return null;
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
1. For basic navigation (home, courses, news, profile), return direct routes
2. If user mentions a course name only, return course roadmap route
3. If user mentions a session title, return session detail route
4. If user wants "course roadmap" without specifying which course, direct them to courses list
5. Be flexible with language - understand variations like "show me courses", "take me to my profile", etc.
6. Handle typos and grammar mistakes gracefully
7. For course names, try partial matching (e.g., "computer science" matches "Computer Science")
8. For session titles, try partial matching (e.g., "introduction" could match "Introduction to Computer Science")
9. If no clear match is found, provide helpful suggestions

IMPORTANT - Route Selection:
- Course only: "/courses/[courseId]/roadmap" (no sessionTitle field)
- Session title: "/courses/[courseId]/roadmap/[sessionId]" (with sessionTitle field)

Examples of when to use session routes:
- "introduction to computer science" → session route (sessionTitle="Introduction to Computer Science")
- "programming fundamentals" → session route (sessionTitle="Programming Fundamentals")
- "security research ethics" → session route (sessionTitle="Security Research & Ethics")

Examples of when to use course routes:
- "computer science course" → course route (courseName="Computer Science")
- "show me cybersecurity" → course route (courseName="Cybersecurity")

Return your response in this exact JSON format:
{
  "route": "/path/to/route",
  "message": "Navigation message for user",
  "requiresId": false,
  "type": "success|error|redirect",
  "courseName": "course name if matched",
  "sessionTitle": "session title if session search"
}

Examples:
- "go home" → {"route": "/", "message": "Navigating to Home", "requiresId": false, "type": "success"}
- "show courses" → {"route": "/courses", "message": "Navigating to Courses", "requiresId": false, "type": "success"}
- "computer science course" → {"route": "/courses/[courseId]/roadmap", "message": "Navigating to Computer Science roadmap", "requiresId": false, "type": "success", "courseName": "Computer Science"}
- "introduction to computer science" → {"route": "/courses/[courseId]/roadmap/[sessionId]", "message": "Found session", "requiresId": false, "type": "success", "sessionTitle": "Introduction to Computer Science"}
- "programming fundamentals" → {"route": "/courses/[courseId]/roadmap/[sessionId]", "message": "Found session", "requiresId": false, "type": "success", "sessionTitle": "Programming Fundamentals"}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const navigationResult = JSON.parse(jsonMatch[0]);

        // Handle course and session navigation
        if (
          navigationResult.route.includes("[courseId]") ||
          navigationResult.route.includes("[sessionId]")
        ) {
          console.log("Navigation result:", navigationResult);

          // Handle session title search first
          if (
            navigationResult.sessionTitle &&
            navigationResult.route.includes("[sessionId]")
          ) {
            console.log(
              "Searching for session with title:",
              navigationResult.sessionTitle
            );

            const sessionResult = findSessionByTitle(
              courses,
              navigationResult.sessionTitle
            );
            console.log("Session search result:", sessionResult);

            if (sessionResult) {
              const newRoute = navigationResult.route
                .replace("[courseId]", sessionResult.course.id)
                .replace(
                  "[sessionId]",
                  (sessionResult.sessionIndex + 1).toString()
                );
              console.log("Final route:", newRoute);

              navigationResult.route = newRoute;
              navigationResult.message = `Found "${
                sessionResult.course.sessions[sessionResult.sessionIndex]
                  .sessionTitle
              }" in ${sessionResult.course.title}`;
            } else {
              // Session not found, redirect to courses list
              navigationResult.route = "/courses";
              navigationResult.message = `Couldn't find session "${navigationResult.sessionTitle}". Please browse available courses.`;
              navigationResult.type = "redirect";
            }
          }
          // Handle course name search
          else if (
            navigationResult.courseName &&
            navigationResult.route.includes("[courseId]")
          ) {
            console.log("Searching for course:", navigationResult.courseName);

            const foundCourse = findCourseByName(
              courses,
              navigationResult.courseName
            );
            console.log("Found course:", foundCourse?.title);

            if (foundCourse) {
              navigationResult.route = navigationResult.route.replace(
                "[courseId]",
                foundCourse.id
              );
              navigationResult.message = `Navigating to ${foundCourse.title} roadmap`;
            } else {
              // Course not found, redirect to courses list
              navigationResult.route = "/courses";
              navigationResult.message = `I couldn't find "${navigationResult.courseName}". Please select from available courses.`;
              navigationResult.type = "redirect";
            }
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
          "I didn't understand that command. Try saying: Home, Courses, News, Profile, or a course name with topic.",
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
