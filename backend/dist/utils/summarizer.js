"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aiplatform_1 = require("@google-cloud/aiplatform");
const catchAsync_1 = __importDefault(require("../lib/catchAsync"));
require("dotenv").config();
const MODEL_ID = "gemini-1.5-pro-002";
const generateSummary = (0, catchAsync_1.default)(() => {
    const client = new aiplatform_1.GenAiCacheServiceClient();
});
