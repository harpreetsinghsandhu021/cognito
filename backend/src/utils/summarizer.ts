import { GenAiCacheServiceClient } from "@google-cloud/aiplatform";
import catchAsync from "../lib/catchAsync";
require("dotenv").config();

const MODEL_ID = "gemini-1.5-pro-002";

const generateSummary = catchAsync(() => {
  const client = new GenAiCacheServiceClient();
});
