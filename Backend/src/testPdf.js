const path = require("path");

const { extractTextFromPDF } = require("./services/pdfService");

const pdfPath = path.join(
  __dirname,
  "../data/university/examination/Exam Conduction Manual 2024-25.pdf"
);

const testPDF = async () => {
  try {
    const text = await extractTextFromPDF(pdfPath);

    console.log("PDF read successfully!");
    console.log("Characters extracted:", text.length);
    console.log("\nFirst 2000 characters:\n");
    console.log(text.substring(0, 2000));
  } catch (error) {
    console.error("Test failed:", error.message);
  }
};

testPDF();