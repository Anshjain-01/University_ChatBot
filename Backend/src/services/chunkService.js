const createChunks = (text, chunkSize = 1500, overlap = 200) => {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    const chunk = text
      .slice(start, end)
      .trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    start += chunkSize - overlap;
  }

  return chunks;
};

module.exports = {
  createChunks,
};