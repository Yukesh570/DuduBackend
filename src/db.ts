import { AppDataSource } from "./data-source";

export async function initializeDB() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("✅ DB initialized. Entities:", AppDataSource.entityMetadatas.map(e => e.name));
    }
  } catch (error) {
    console.error("❌ Unable to load the database", error);
    process.exit(1);
  }
}
