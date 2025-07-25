import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../src/lib/firebase-admin";
import { NewsFirestore, NewsJSON } from "../../types";
import newsJSON from "./news.json";

// Convert JSON news data to Firestore format
const newsData: NewsFirestore[] = (newsJSON as NewsJSON[]).map((news) => ({
  ...news,
  createdAt: Timestamp.fromDate(new Date(news.createdAt)),
}));

// Function to clear all existing news
async function clearExistingNews(): Promise<void> {
  try {
    console.log("🗑️  Clearing existing news...");

    const newsSnapshot = await getDocs(collection(db, "news"));
    const deletePromises = newsSnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "news", docSnapshot.id))
    );

    await Promise.all(deletePromises);
    console.log(`✅ Cleared ${newsSnapshot.size} existing news articles\n`);
  } catch (error) {
    console.error("❌ Error clearing existing news:", error);
    throw error;
  }
}

async function populateNews() {
  try {
    console.log("📰 === Seeding News ===");

    // Clear existing news first
    await clearExistingNews();

    for (let i = 0; i < newsData.length; i++) {
      const news = newsData[i];
      console.log(`📰 Adding news ${i + 1}/${newsData.length}: ${news.title}`);

      const docRef = await addDoc(collection(db, "news"), news);
      console.log(
        `✅ Successfully added "${news.title}" with ID: ${docRef.id}`
      );
    }

    console.log("🎉 News seeding completed!");
    console.log(`📊 Total news articles added: ${newsData.length}\n`);
  } catch (error) {
    console.error("❌ Error seeding news:", error);
    throw error;
  }
}

// Export the seeder function
export { populateNews as newsSeeder };
