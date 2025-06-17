// // Replace the require statement with dynamic import
// import prisma from "../utils/prisma.js";

// import("@xenova/transformers")
//   .then((transformers) => {
//     const { pipeline } = transformers;
//     async function reEmbedAllPapers() {
//       console.log("🚀 Starting paper re-embedding migration...");

//       try {
//         // Initialize the embedding model (this will download it first time)
//         console.log("📥 Loading embedding model...");
//         const extractor = await pipeline(
//           "feature-extraction",
//           "Xenova/nomic-embed-text-v1"
//         );
//         console.log("✅ Model loaded successfully");

//         // Get all papers from database
//         console.log("📊 Fetching papers from database...");
//         const papers = await prisma.paper.findMany({
//           select: {
//             id: true,
//             title: true,
//             abstract: true,
//             providerId: true,
//           },
//         });

//         console.log(`📄 Found ${papers.length} papers to re-embed`);

//         if (papers.length === 0) {
//           console.log("No papers found. Exiting...");
//           return;
//         }

//         // Process papers in batches to avoid memory issues
//         const batchSize = 50;
//         let totalProcessed = 0;

//         for (let i = 0; i < papers.length; i += batchSize) {
//           const batch = papers.slice(i, i + batchSize);
//           console.log(
//             `\n🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
//               papers.length / batchSize
//             )}`
//           );
//           console.log(
//             `   Papers ${i + 1} to ${Math.min(i + batchSize, papers.length)}`
//           );

//           const updates = [];

//           for (const paper of batch) {
//             try {
//               // Combine title and abstract for embedding
//               const textToEmbed = `${paper.title}\n\n${
//                 paper.abstract || ""
//               }`.trim();

//               if (!textToEmbed || textToEmbed.length < 10) {
//                 console.log(
//                   `⚠️  Skipping paper ${paper.providerId} - insufficient text`
//                 );
//                 continue;
//               }

//               // Generate new embedding
//               const output = await extractor(textToEmbed, {
//                 pooling: "mean",
//                 normalize: true,
//               });

//               const embedding = Array.from(output.data);

//               updates.push({
//                 id: paper.id,
//                 embedding: embedding,
//               });

//               totalProcessed++;
//             } catch (error: any) {
//               console.error(
//                 `❌ Error processing paper ${paper.providerId}:`,
//                 error.message
//               );
//             }
//           }

//           // Update database in batch
//           if (updates.length > 0) {
//             console.log(`💾 Updating ${updates.length} papers in database...`);

//             const updatePromises = updates.map((update) =>
//               prisma.paper.update({
//                 where: { id: update.id },
//                 data: {
//                   embeddings: update.embedding,
//                   updatedDate: new Date(),
//                 },
//               })
//             );

//             await Promise.all(updatePromises);
//             console.log(`✅ Batch update complete`);
//           }

//           // Progress update
//           console.log(
//             `📈 Progress: ${totalProcessed}/${papers.length} papers processed`
//           );

//           // Small delay between batches to be gentle on the system
//           if (i + batchSize < papers.length) {
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//           }
//         }

//         console.log(`\n🎉 Migration completed successfully!`);
//         console.log(
//           `📊 Total papers re-embedded: ${totalProcessed}/${papers.length}`
//         );
//       } catch (error) {
//         console.error("❌ Migration failed:", error);
//         throw error;
//       } finally {
//         await prisma.$disconnect();
//         console.log("🔌 Database connection closed");
//       }
//     }

//     reEmbedAllPapers()
//       .then(() => {
//         console.log("✨ Script completed successfully");
//         process.exit(0);
//       })
//       .catch((error) => {
//         console.error("💥 Script failed:", error);
//         process.exit(1);
//       });
//   })
//   .catch((error) => {
//     console.error("Error loading transformers:", error);
//   });

// // Helper function to search papers (use this after migration)
// // async function searchPapers(query, limit = 10) {
// //   console.log(`🔍 Searching for: "${query}"`);

// //   try {
// //     // Load the same model used for embedding
// //     const extractor = await pipeline(
// //       'feature-extraction',
// //       'sentence-transformers/all-MiniLM-L6-v2'
// //     );

// //     // Embed the search query
// //     const queryOutput = await extractor(query, {
// //       pooling: 'mean',
// //       normalize: true
// //     });
// //     const queryEmbedding = Array.from(queryOutput.data);

// //     // Get all papers with embeddings
// //     const papers = await prisma.paper.findMany({
// //       where: {
// //         embeddings: {
// //           not: undefined
// //         }
// //       },
// //       select: {
// //         id: true,
// //         providerId: true,
// //         title: true,
// //         abstract: true,
// //         authors: true,
// //         publishedDate: true,
// //         embeddings: true,
// //         pdfUrl: true
// //       }
// //     });

// //     if (papers.length === 0) {
// //       console.log('No papers with embeddings found. Run migration first.');
// //       return [];
// //     }

// //     // Calculate similarities
// //     const results = papers.map(paper => {
// //       const similarity = cosineSimilarity(queryEmbedding, paper.embeddings);

// //       return {
// //         ...paper,
// //         similarity,
// //         // Remove embeddings from result to keep it clean
// //         embeddings: undefined
// //       };
// //     });

// //     // Sort by similarity and return top results
// //     const topResults = results
// //       .sort((a, b) => b.similarity - a.similarity)
// //       .slice(0, limit);

// //     console.log(`📋 Found ${topResults.length} relevant papers:`);
// //     topResults.forEach((paper, index) => {
// //       console.log(`${index + 1}. ${paper.title} (similarity: ${paper.similarity.toFixed(4)})`);
// //     });

// //     return topResults;

// //   } catch (error) {
// //     console.error('❌ Search failed:', error);
// //     throw error;
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }

// // // Cosine similarity helper function
// // function cosineSimilarity(vecA, vecB) {
// //   if (vecA.length !== vecB.length) {
// //     throw new Error('Vectors must have the same length');
// //   }

// //   const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
// //   const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
// //   const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

// //   if (magnitudeA === 0 || magnitudeB === 0) {
// //     return 0;
// //   }

// //   return dotProduct / (magnitudeA * magnitudeB);
// // }

// // Export functions

// // If running this script directly
