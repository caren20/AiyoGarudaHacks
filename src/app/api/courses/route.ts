import { NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "../../../../types";

export async function GET() {
  try {
    // Create a query to get courses ordered by creation date (newest first)
    const coursesQuery = query(
      collection(db, "courses"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(coursesQuery);

    const courses: Course[] = querySnapshot.docs.map((doc) => {
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

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
