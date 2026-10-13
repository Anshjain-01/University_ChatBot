
const Document = require("../models/Document");
const DocumentChunk = require("../models/DocumentChunk");

const searchKnowledgeBase = async (query, limit = 5) => {
  try {
    if (!query || !query.trim()) {
      return [];
    }

    const results = await DocumentChunk.find(
      {
        $text: {
          $search: query,
        },
      },
      {
        score: {
          $meta: "textScore",
        },
      }
    )
      .sort({
        score: {
          $meta: "textScore",
        },
      })
      .limit(limit)
      .populate({
        path: "documentId",
        model: Document,
        select: "title category source version status",
      });

    // Only return chunks belonging to active documents
    return results.filter(
      (result) =>
        result.documentId &&
        result.documentId.status === "active"
    );
  } catch (error) {
    console.error("Knowledge search error:", error.message);
    throw error;
  }
};

module.exports = {
  searchKnowledgeBase,
};

