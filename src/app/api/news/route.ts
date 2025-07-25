import { NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase-admin";
import { News } from "../../../../types";

export async function GET() {
  try {
    console.log("📰 Fetching news from Firestore...");

    // Create a query to get news ordered by creation date (newest first)
    const newsQuery = query(
      collection(db, "news"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(newsQuery);

    const news: News[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        name: data.name,
        age: data.age,
        job: data.job,
        imageSrc: data.imageSrc,
        createdAt: data.createdAt.toDate().toISOString(),
      };
    });

    console.log(`✅ Successfully fetched ${news.length} news articles`);

    return NextResponse.json({
      success: true,
      news,
      count: news.length,
    });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        news: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
