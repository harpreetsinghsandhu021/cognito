import prisma from "../utils/prisma";

async function getDocumentsWithoutHtml() {
  try {
    const allDocuments = await prisma.paper.findMany();

    const withHtml = allDocuments.filter(
      (doc) =>
        doc.hasOwnProperty("html") &&
        doc.html !== null &&
        doc.html !== undefined
    );

    const withoutHtml = allDocuments.length - withHtml.length;

    console.log(`Total documents: ${allDocuments.length}`);
    console.log(`Documents with html: ${withHtml.length}`);
    console.log(`Documents without html: ${withoutHtml}`);

    return {
      total: allDocuments.length,
      withHtml: withHtml.length,
      withoutHtml: withoutHtml,
    };
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
}

// Function to find and delete documents that don't have html field
async function deleteDocumentsWithoutHtmlField() {
  try {
    // First, get all documents
    const allDocuments = await prisma.paper.findMany();
    console.log(`Total documents found: ${allDocuments.length}`);

    // Filter documents that don't have the html field or have null/empty html
    const documentsToDelete = allDocuments.filter(
      (doc) =>
        !doc.hasOwnProperty("html") ||
        doc.html === null ||
        doc.html === undefined
    );

    console.log(`Documents without html field: ${documentsToDelete.length}`);

    if (documentsToDelete.length === 0) {
      console.log("No documents to delete");
      return { count: 0 };
    }

    // Get IDs of documents to delete
    const idsToDelete = documentsToDelete.map((doc) => doc.id);

    // Delete documents by their IDs
    const result = await prisma.paper.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });

    console.log(`Successfully deleted ${result.count} documents`);
    return result;
  } catch (error) {
    console.error("Error deleting documents:", error);
    throw error;
  }
}
async function main() {
  try {
    // Optional: First see what will be deleted
    await getDocumentsWithoutHtml();

    await deleteDocumentsWithoutHtmlField();

    // Then delete with confirmation
    // await deleteDocumentsWithConfirmation();
  } catch (error) {
    console.error("Main execution error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
