const path = require("path");

const { extractTextFromPDF } = require("./services/pdfService");
const { createChunks } = require("./services/chunkService");

const pdfPath = path.join(
  __dirname,
  "../data/university/examination/Exam Conduction Manual 2024-25.pdf"
);

const testChunks = async () => {
  try {
    const text = await extractTextFromPDF(pdfPath);

    const chunks = createChunks(text);

    console.log("PDF extracted successfully.");
    console.log("Total characters:", text.length);
    console.log("Total chunks:", chunks.length);

    chunks.forEach((chunk, index) => {
      console.log(`\n========== CHUNK ${index} ==========\n`);
      console.log(chunk);
    });
  } catch (error) {
    console.error("Chunk test failed:", error.message);
  }
};

testChunks();