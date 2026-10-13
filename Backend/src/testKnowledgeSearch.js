require("dotenv").config();

const mongoose = require("mongoose");
require("./models/Document");
const connectDB = require("./config/db");
const {
  searchKnowledgeBase,
} = require("./services/knowledgeSearchService");

const testSearch = async () => {
  try {
    await connectDB();

  const query = "CSE subjects syllabus";

    const results = await searchKnowledgeBase(query, 5);

    console.log("\nSearch query:", query);
    console.log("Results found:", results.length);

    results.forEach((result, index) => {
      console.log(`\n========== RESULT ${index + 1} ==========`);

      console.log("Document:", result.documentId?.title);
      console.log("Category:", result.documentId?.category);
      console.log("Version:", result.documentId?.version);
      console.log("Chunk:", result.chunkIndex);
      console.log("Score:", result.score);

      console.log("\nContent:");
      console.log(result.content);
    });

    await mongoose.connection.close();

    console.log("\nDatabase connection closed.");
  } catch (error) {
    console.error("\nSearch test failed:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

testSearch();