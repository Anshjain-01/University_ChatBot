const mongoose = require("mongoose");

const documentChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    embedding: {
      type: [Number],
      default:undefined
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
documentChunkSchema.index({
  content: "text",
});
const DocumentChunk = mongoose.model(
  "DocumentChunk",
  documentChunkSchema
);

module.exports = DocumentChunk;