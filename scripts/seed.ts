import { courseSeeder } from "./seeders/course-seeder";
import { newsSeeder } from "./seeders/news-seeder";

// List of all seeder functions
const seeders = [
  { name: "Courses", fn: courseSeeder },
  { name: "News", fn: newsSeeder },
  // Add more seeders here as they are created
  // { name: "Users", fn: userSeeder },
];

async function runAllSeeders(): Promise<void> {
  console.log("🌱 Starting database seeding...\n");

  const startTime = Date.now();
  let successCount = 0;
  let failureCount = 0;

  for (const seeder of seeders) {
    try {
      console.log(`🚀 Running ${seeder.name} seeder...`);
      await seeder.fn();
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to seed ${seeder.name}:`, error);
      failureCount++;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log("=".repeat(50));
  console.log("🌱 Database Seeding Summary");
  console.log("=".repeat(50));
  console.log(`✅ Successful seeders: ${successCount}`);
  console.log(`❌ Failed seeders: ${failureCount}`);
  console.log(`⏱️  Total time: ${duration}s`);
  console.log("=".repeat(50));

  if (failureCount > 0) {
    console.log("⚠️  Some seeders failed. Check the logs above for details.");
    process.exit(1);
  } else {
    console.log("🎉 All seeders completed successfully!");
    process.exit(0);
  }
}

// Run all seeders
runAllSeeders();
