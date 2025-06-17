import prisma from "../utils/prisma";

async function createEmbeddingsIndex() {
  const collectionName = "Paper";
  const indexName = "vector_index";
  const vectorField = "embeddings";
  const dimensions = 768;
  const similarityMetric = "cosine";

  try {
    const res = await prisma.$runCommandRaw({
      createSearchIndexes: collectionName,
      indexes: [
        {
          definition: {
            fields: [
              {
                type: "vector",
                path: vectorField,
                numDimensions: dimensions,
                similarity: similarityMetric,
              },
            ],
          },
          name: indexName,
          type: "vectorSearch",
        },
      ],
    });

    console.log(`Vector index creation initiated:`, res);
    console.log("It may take some time for the index to become active");
    console.log(
      "You can check its status in MongoDB atlas under your collection's 'Search Indexes' tab."
    );
  } catch (err) {
    console.error("Error creating vector index:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createEmbeddingsIndex();
