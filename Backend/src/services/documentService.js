const path = require("path");

const Document = require("../models/Document");
const DocumentChunk = require("../models/DocumentChunk");

const { extractTextFromPDF } = require("./pdfService");
const { createChunks } = require("./chunkService");

const ingestDocument = async ({
  filePath,
  title,
  description,
  category,
  department,
  fileName,
  source,
  version,
  uploadedBy,
}) => {
  try {
    // 1. Extract text from PDF
    const text = await extractTextFromPDF(filePath);

    if (!text || !text.trim()) {
      throw new Error("No text could be extracted from the PDF");
    }

    // 2. Create document record
    const document = await Document.create({
      title,
      description,
      category,
      department,
      fileName,
      fileUrl: filePath,
      source,
      version,
      uploadedBy,
      status: "active",
      lastUpdated: new Date(),
    });

    // 3. Split extracted text into chunks
    const chunks = createChunks(text);

    // 4. Create chunk records
    const chunkDocuments = chunks.map((content, index) => ({
      documentId: document._id,
      content,
      chunkIndex: index,
      metadata: {
        fileName,
        category,
        version,
      },
    }));

    await DocumentChunk.insertMany(chunkDocuments);

    return {
      document,
      chunksCreated: chunks.length,
    };
  } catch (error) {
    console.error("Document ingestion error:", error.message);
    throw error;
  }
};

module.exports = {
  ingestDocument,
};