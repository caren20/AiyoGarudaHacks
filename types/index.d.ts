import { Timestamp } from "firebase/firestore";

// Base Course interface (for API responses and general use)
export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  imageSrc: string;
  createdAt: string; // ISO string
}

// Course data from JSON (before conversion to Firestore) - no id needed
export type CourseJSON = Omit<Course, "id">;

// Course for Firestore (uses Timestamp instead of string)
export type CourseFirestore = Omit<Course, "id" | "createdAt"> & {
  createdAt: Timestamp;
};

// Add other interfaces here as the app grows
// export interface User { ... }
// export interface News { ... }
// export interface Profile { ... }
