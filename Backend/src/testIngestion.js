require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const User = require("./models/User");
const { ingestDocument } = require("./services/documentService");

const testIngestion = async () => {
  try {
    await connectDB();

    // Get one existing user
    const user = await User.findOne();

    if (!user) {
      throw new Error(
        "No user found. Create an account before running ingestion."
      );
    }

    console.log("Using user:", user.email);
    console.log("User ID:", user._id);

   const filePath = path.join(
  __dirname,
  "../data/university/academics/B.Tech. CST_CS_CE and CSE Syllabus 3rd Year 2024-25_15072026.pdf"
);

const result = await ingestDocument({
  filePath,

  title: "B.Tech CSE Syllabus",

  description:
    "Official B.Tech Computer Science and Engineering syllabus",

  category: "Academics",

  department: "CSE",

  fileName: "syllabus.pdf",

  source: "ABES Engineering College",

  version: "2026-27",

  uploadedBy: user._id,
});

    console.log("\nDocument ingestion successful!");
    console.log("Document ID:", result.document._id);
    console.log("Chunks created:", result.chunksCreated);

    await mongoose.connection.close();

    console.log("\nDatabase connection closed.");
  } catch (error) {
    console.error("\nIngestion failed:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

testIngestion();