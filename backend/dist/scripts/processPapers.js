"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const embeddings_1 = require("../utils/embeddings");
const prisma_1 = __importDefault(require("../utils/prisma"));
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const BATCH_SIZE = 100;
const TARGET_TOTAL_PAPERS = 500;
const CATEGORIES = [
    "AI",
    "CE",
    "CL",
    "CC",
    "CG",
    "DS",
    "DB",
    "CV",
    "CR",
    "LG",
    "MS",
    "CY",
];
async function fetchAndProcessPapers(start) {
    const res = await axios_1.default.get(`http://export.arxiv.org/api/query?search_query=all:${CATEGORIES[11]}&start=${start}&max_results=${BATCH_SIZE}`);
    const xml = res.data;
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            const totalResults = parseInt(result.feed["opensearch:totalResults"]?._ || "0", 10);
            const startIndex = parseInt(result.feed["opensearch:startIndex"]?._ || "0", 10);
            const itemsPerPage = parseInt(result.feed["opensearch:itemsPerPage"]?._ || "0", 10);
            const entries = Array.isArray(result.feed.entry)
                ? result.feed.entry
                : result.feed.entry
                    ? [result.feed.entry]
                    : [];
            resolve({
                entries: entries,
                pagination: {
                    totalResults,
                    startIndex,
                    itemsPerPage,
                },
            });
        });
    });
}
async function runIngestion() {
    let startIndex = 0;
    let fetchCount = 0;
    let totalAvailablePapers = TARGET_TOTAL_PAPERS;
    while (fetchCount < totalAvailablePapers) {
        const { entries, pagination } = await fetchAndProcessPapers(startIndex);
        if (fetchCount == 0 && pagination.totalResults > 0) {
            totalAvailablePapers = Math.min(TARGET_TOTAL_PAPERS, pagination.totalResults);
        }
        if (entries.length === 0) {
            console.log("No more papers to fetch or an error occurred");
            break;
        }
        const entriesToProcess = entries.slice(0, Math.max(0, totalAvailablePapers - fetchCount));
        for (const entry of entriesToProcess) {
            await processAndIngestPaper(entry);
        }
        fetchCount += entriesToProcess.length;
        startIndex += entries.length;
        console.log("\x1b[35m%s\x1b[0m", `[Ingestion] Processed ${fetchCount} papers so far starting from ${startIndex - fetchCount}.`);
        if (fetchCount < totalAvailablePapers) {
            console.log(`[Ingestion] Pausing for 10000 seconds...`);
            await new Promise((r) => setTimeout(r, 10000));
        }
    }
    console.log(`\n--- Ingestion Loop Complete ---`);
    console.log(`Total papers processed: ${fetchCount}.`);
    await prisma_1.default.$disconnect();
}
async function processAndIngestPaper(entry) {
    try {
        const providerId = entry.id[0];
        if (!providerId) {
            console.warn("Skipping entry due to missing provider Id:", entry);
            return;
        }
        const authors = entry.author.length > 1
            ? entry.author.map((a) => ({
                name: a.name[0],
                affiliation: null,
            }))
            : [{ name: entry.author[0].name[0], affiliation: null }];
        const abstractText = entry.summary[0] || "";
        console.log("Currently processing:", entry.title[0]);
        const paper = {
            providerId: providerId,
            title: entry.title[0] || "No Title",
            abstract: abstractText,
            authors: authors,
            publishedDate: new Date(entry.published[0]),
            updatedDate: new Date(entry.updated[0]),
            primaryCategory: entry["arxiv:primary_category"][0].$.term || null,
            categories: entry.category.length > 1
                ? entry.category.map((c) => c.$.term)
                : [entry.category[0].$.term].filter(Boolean),
            journalRef: null,
            doi: null,
            pdfUrl: entry.link.find((l) => l.$.type == "application/pdf")?.$.href || null,
            doiUrl: entry.link.find((l) => l.$.title == "doi")?.$.href || null,
            comment: entry["arxiv:comment"] ? entry["arxiv:comment"][0].$[0] : [""],
            embeddings: [],
        };
        if (paper.abstract.length > 0) {
            const embeddings = await (0, embeddings_1.generateEmbedding)(paper.abstract);
            paper.embeddings = embeddings;
        }
        else {
            console.log(`No abstract found for ${providerId}, skipping embedding.`);
            return;
        }
        await prisma_1.default.paper.upsert({
            where: { providerId: providerId },
            update: paper,
            create: paper,
        });
    }
    catch (err) {
        console.log(err);
    }
}
runIngestion().catch((e) => {
    console.error("Ingestion failed unexpectedly", e);
    prisma_1.default.$disconnect();
    process.exit(1);
});
