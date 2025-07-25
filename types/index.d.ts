import { Timestamp } from "firebase/firestore";

// Session interface for course modules
export interface Session {
  sessionNumber: string;
  sessionTitle: string;
  videoSrc: string | null;
  topicsRelated: string[];
}

// Base Course interface (for API responses and general use)
export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  imageSrc: string;
  createdAt: string; // ISO string
  sessions: Session[];
}

// Course data from JSON (before conversion to Firestore) - no id needed
export type CourseJSON = Omit<Course, "id">;

// Course for Firestore (uses Timestamp instead of string)
export type CourseFirestore = Omit<Course, "id" | "createdAt"> & {
  createdAt: Timestamp;
};

// Add other interfaces here as the app grows
// export interface User { ... }
// export interface Profile { ... }

// Base News interface (for API responses and general use)
export interface News {
  id: string;
  title: string;
  description: string;
  name: string;
  age: number;
  job: string;
  imageSrc: string;
  createdAt: string; // ISO string
}

// News data from JSON (before conversion to Firestore) - no id needed
export type NewsJSON = Omit<News, "id">;

// News for Firestore (uses Timestamp instead of string)
export type NewsFirestore = Omit<News, "id" | "createdAt"> & {
  createdAt: Timestamp;
};
