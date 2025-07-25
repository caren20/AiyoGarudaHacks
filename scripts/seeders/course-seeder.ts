import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../src/lib/firebase-admin";
import { CourseFirestore, CourseJSON } from "../../types";
import coursesJSON from "./course.json";

// Convert JSON course data to Firestore format
const coursesData: CourseFirestore[] = (coursesJSON as CourseJSON[]).map(
  (course) => ({
    ...course,
    createdAt: Timestamp.fromDate(new Date(course.createdAt)),
  })
);

// Function to clear all existing courses
async function clearExistingCourses(): Promise<void> {
  try {
    console.log("🗑️  Clearing existing courses...");

    const coursesSnapshot = await getDocs(collection(db, "courses"));
    const deletePromises = coursesSnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "courses", docSnapshot.id))
    );

    await Promise.all(deletePromises);
    console.log(`✅ Cleared ${coursesSnapshot.size} existing courses\n`);
  } catch (error) {
    console.error("❌ Error clearing existing courses:", error);
    throw error;
  }
}

async function populateCourses() {
  try {
    console.log("📚 === Seeding Courses ===");

    // Clear existing courses first
    await clearExistingCourses();

    for (let i = 0; i < coursesData.length; i++) {
      const course = coursesData[i];
      console.log(
        `📚 Adding course ${i + 1}/${coursesData.length}: ${course.title}`
      );

      const docRef = await addDoc(collection(db, "courses"), course);
      console.log(
        `✅ Successfully added "${course.title}" with ID: ${docRef.id}`
      );
    }

    console.log("🎉 Courses seeding completed!");
    console.log(`📊 Total courses added: ${coursesData.length}\n`);
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
    throw error;
  }
}

// Export the seeder function
export { populateCourses as courseSeeder };
