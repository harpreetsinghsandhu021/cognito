import { Response, Request } from "express";
import catchAsync from "../lib/catchAsync";
import prisma from "../utils/prisma";
import { generateEmbedding } from "../utils/embeddings";
import pdf2html from "pdf2html";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
require("dotenv").config();

export const getSearchResults = catchAsync(
  async (req: Request, res: Response) => {
    const { limit, size, query } = req.query;

    const queryVector = await generateEmbedding(query as string);

    const results = await prisma.$runCommandRaw({
      aggregate: "Paper",
      pipeline: [
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embeddings",
            queryVector: queryVector as number[],
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
      data: (results.cursor as any).firstBatch,
    });
  }
);

export const getSummary = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const paper = await prisma.paper.findFirst({
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

export const getPaper = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const paper = await prisma.paper.findUnique({
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

export const getHTML = catchAsync(async (req: Request, res: Response) => {
  const { pdfUrl } = req.query;
  console.log(pdfUrl);

  const pdfBuffer = await axios.get(pdfUrl as string, {
    responseType: "arraybuffer",
  });

  extractHTMLFromPdf(pdfBuffer.data, res);
});

export const extractHTMLFromPdf = async (pdf: Buffer, res: Response) => {
  const data = await pdf2html.html(pdf);

  console.log("data done");

  sanitizeHTML(data!, res);
};

const sanitizeHTML = async (html: string, response: Response) => {
  console.log("runnngi");
  let isClientDisconnected = false;

  const disconnectHandler = () => {
    console.log(
      "Client disconnected or aborted. Signaling backend to stop processing."
    );
    isClientDisconnected = true;
  };

  response.on("close", disconnectHandler);
  response.on("error", (err) => {
    console.log("Response stream error:", err);
    isClientDisconnected = true;
  });

  try {
    const ai = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: "global",
    });

    const prompt =
      "You're an expert HTML processor. Your job is to take raw, potentially unsanitized HTML content and perform several critical operations:\n\n" +
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
      "    * Remove the **title** of the document, **authors** of the document, **abstract** and **keywords**.\n" +
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
      "* **General Structure:** Use `<div>` and `<span>` sparingly, only when necessary for grouping or inline styling hooks after semantic tags have been applied. For streaming responses, ensure no newline character (`\n`)** are used.\n\n" +
      "---" +
      "\n\n" +
      "**Input HTML Content:**\n\n" +
      html +
      "\n";

    const generationConfig = {
      model: "gemini-2.5-pro-preview-06-05",
      contents: [{ role: "user", parts: [{ text: prompt }] }],

      maxOutputTokens: 40000,
      temperature: 0.7, // Add temperature for more controlled output
      topP: 0.95,
      topK: 40,
      thinkingConfig: {
        thinkingBudget: 25000,
      },
    };

    const res = await ai.models.generateContentStream({
      model: "gemini-2.5-pro-preview-06-05",
      contents: generationConfig.contents,
      config: {
        maxOutputTokens: generationConfig.maxOutputTokens,
        temperature: generationConfig.temperature,
        topP: generationConfig.topP,
        topK: generationConfig.topK,
        thinkingConfig: generationConfig.thinkingConfig,
      },
    });

    for await (const chunk of res) {
      if (isClientDisconnected || response.writableEnded) {
        console.log(
          "Client disconnected or response stream ended. Stopping stream"
        );
        break;
      }

      const text = chunk.candidates![0].content?.parts![0].text;

      if (text) {
        response.write(JSON.stringify(text));
        console.log("sending chunk", text.slice(0, 10), ".....");
      }

      if (!isClientDisconnected && !response.writableEnded) {
        response.end();
        console.log("Vertex AI stream completed and sent to client.");
      } else {
        console.log(
          "Vertex AI stream completed, but response was already handled (client disconnected or stream ended)."
        );
      }
    }
  } catch (error) {
    if (!response.headersSent) {
      // Check if headers have been sent before sending status
      response.status(500).send("An error occurred during content processing.");
    } else if (!response.writableEnded) {
      response.end(); // If headers sent but stream not ended, close it gracefully
    }
  } finally {
    response.off("close", disconnectHandler);
    response.off("error", disconnectHandler);
  }
};
