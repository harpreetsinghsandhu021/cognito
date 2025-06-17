let extractor: any = null;

async function getExtractor() {
  if (!extractor) {
    console.log("Loading embedding model...");

    // Use Function constructor to prevent TypeScript from converting to require()
    const importTransformers = new Function(
      'return import("@xenova/transformers")'
    );
    const { pipeline } = await importTransformers();

    extractor = await pipeline(
      "feature-extraction",
      "Xenova/nomic-embed-text-v1"
    );
    console.log("Model loaded successfully");
  }
  return extractor;
}

export async function generateEmbeddingsHuggingFace(query: string) {
  const model = await getExtractor();
  const output = await model(query.trim(), {
    pooling: "mean",
    normalize: true,
  });
  const queryEmbedding = Array.from(output.data);

  return queryEmbedding;
}
