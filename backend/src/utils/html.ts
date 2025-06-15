import pdf2html from "pdf2html";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
require("dotenv").config();

export const getHTML = async (pdfUrl: string) => {
  const pdfBuffer = await axios.get(pdfUrl as string, {
    responseType: "arraybuffer",
  });

  return extractHTMLFromPdf(pdfBuffer.data);
};

export const extractHTMLFromPdf = async (pdf: Buffer) => {
  try {
    console.log("Pdf conversion to html started ...");

    const data = await pdf2html.html(pdf);
    console.log("Pdf conversion to html completed ✅");

    return sanitizeHTML(data);
  } catch (error) {}
};

const sanitizeHTML = async (html: string) => {
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

    console.log("Gemini Model generating output .....");

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 40000,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        thinkingConfig: {
          thinkingBudget: 24000,
        },
      },
    });

    console.log("Gemini Model output completed ✅ .....");

    return res.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error during sanitization:", error);
  }
};
