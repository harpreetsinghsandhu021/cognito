"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHTMLFromPdf = exports.getHTML = exports.getPaper = exports.getSummary = exports.getSearchResults = void 0;
const catchAsync_1 = __importDefault(require("../lib/catchAsync"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const embeddings_1 = require("../utils/embeddings");
const pdf2html_1 = __importDefault(require("pdf2html"));
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
exports.getSearchResults = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, size, query } = req.query;
    const queryVector = await (0, embeddings_1.generateEmbedding)(query);
    const results = await prisma_1.default.$runCommandRaw({
        aggregate: "Paper",
        pipeline: [
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embeddings",
                    queryVector: queryVector,
                    numCandidates: Number(size),
                    limit: Number(limit),
                },
            },
            {
                $replaceWith: {
                    $unsetField: {
                        field: { $literal: "embeddings" },
                        input: "$$ROOT",
                    },
                },
            },
        ],
        cursor: {},
    });
    // console.log((results.cursor as any).firstBatch);
    res.status(200).json({
        status: "success",
        data: results.cursor.firstBatch,
    });
});
exports.getSummary = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const paper = await prisma_1.default.paper.findFirst({
        where: {
            id: id,
        },
        select: {
            abstract: true,
        },
    });
    res.status(200).json({
        status: "success",
        // data: paper,
    });
});
exports.getPaper = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const paper = await prisma_1.default.paper.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
            abstract: true,
            authors: true,
            publishedDate: true,
            updatedDate: true,
            primaryCategory: true,
            pdfUrl: true,
            categories: true,
            journalRef: true,
        },
    });
    res.status(200).json({
        status: "success",
        data: paper,
    });
});
exports.getHTML = (0, catchAsync_1.default)(async (req, res) => {
    const { pdfUrl } = req.query;
    console.log(pdfUrl);
    const pdfBuffer = await axios_1.default.get(pdfUrl, {
        responseType: "arraybuffer",
    });
    (0, exports.extractHTMLFromPdf)(pdfBuffer.data, res);
});
const extractHTMLFromPdf = async (pdf, res) => {
    const data = await pdf2html_1.default.html(pdf);
    sanitizeHTML(data, res);
};
exports.extractHTMLFromPdf = extractHTMLFromPdf;
const sanitizeHTML = async (html, response) => {
    try {
        const prompt = "You're an expert HTML processor. Your job is to take raw, potentially unsanitized HTML content and perform several critical operations:\n\n" +
            "---" +
            "\n\n" +
            "## 1. Secure HTML Sanitization\n\n" +
            "**Goal:** Remove any potentially malicious, structurally damaging, or irrelevant elements and attributes to ensure the output HTML is safe for display and focused on core content.\n\n" +
            "* **Allowed Tags:** Only permit the following HTML tags: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<p>`, `<a>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, `<blockquote>`, `<code>`, `<span>`, `<div>`, `<br>`, `<hr>`.\n" +
            "* **Allowed Attributes:** For `<a>` tags, only the `href` attribute is allowed. For any other allowed tag, no attributes are permitted unless explicitly specified otherwise.\n" +
            "* **Forbidden Content:** Absolutely remove all `<script>`, `<iframe>`, `<style>`, `<link>`, `<meta>`, `<form>`, `<img>`, `<input>`, `<button>`, and any other tag not explicitly whitelisted. Remove any `on*` event attributes (e.g., `onclick`, `onerror`). Strip out `style` attributes.\n" +
            "* **Malformed HTML:** Correct any basic malformed HTML (e.g., unclosed tags, incorrect nesting) to produce valid, well-formed HTML.\n" +
            "* **Specific Content Removal:**\n" +
            '    * Remove all information related to **"Prepared using sagej.cls"**.\n' +
            "    * Remove the **title** of the document, **authors** of the document, and **keywords**.\n" +
            '    * Remove any information explicitly stating **"about the paper"**.\n\n' +
            '    * Remove any information regarding the images along with their captions."**.\n\n' +
            "---" +
            "\n\n" +
            "## 2. Semantic HTML Tagging and Structuring\n\n" +
            "**Goal:** After sanitization, analyze the textual content and apply appropriate semantic HTML tags to enhance readability, accessibility, and SEO, ensuring content is well-structured.\n\n" +
            "* **Headings:** Identify main topics and sub-topics, applying `<h1>`, `<h2>`, `<h3>`, etc., based on perceived hierarchy. There should ideally be only one `<h1>`.\n" +
            "* **Paragraphs:** Wrap blocks of text in `<p>` tags.\n" +
            "* **Lists:** Convert bulleted or numbered text into `<ul>` or `<ol>` and `<li>` tags.\n" +
            "* **Emphasis:** Use `<strong>` for strong importance and `<em>` for emphasis.\n" +
            "* **Links:** Ensure any identified URLs are correctly wrapped in **anchor tags (`<a>`) with `href` attributes**.\n" +
            "* **Code & Mathematics:** IMPORTANT: Wrap any **coding notations** or **mathematical notations** in `<code>` tags.\n" +
            "* **Blockquotes:** Identify quoted text and wrap it in `<blockquote>`.\n" +
            "* **Important:** Make sure to convert the full document.\n" +
            "* **General Structure:** Use `<div>` and `<span>` sparingly, only when necessary for grouping or inline styling hooks after semantic tags have been applied. For streaming responses, ensure no newline character (`\n`)** are used.\n\n" +
            "---" +
            "\n\n" +
            "**Input HTML Content:**\n\n" +
            html +
            "\n";
        console.log("Vertex AI stream completed and sent to client.");
    }
    catch (error) {
        console.log(error);
    }
};
