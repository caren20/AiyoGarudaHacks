import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Course } from "../../../../../types";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const courseId = params.courseId;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Get course document from Firestore
    const courseDoc = await getDoc(doc(db, "courses", courseId));

    if (!courseDoc.exists()) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const data = courseDoc.data();
    const courseData: Course = {
      id: courseDoc.id,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      imageSrc: data.imageSrc,
      sessions: data.sessions || [],
      createdAt:
        data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    };

    return NextResponse.json(courseData);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
