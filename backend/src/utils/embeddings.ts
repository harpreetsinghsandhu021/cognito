import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";

const MODEL_NAME = "gemini-embedding-001";

const clientOptions = {
  apiEndpoint: `asia-southeast1-aiplatform.googleapis.com`,
};

const client = new PredictionServiceClient(clientOptions);

/**
 * Generates embeddings for a single text string using Vertex AI
 * @param text - The input text (e.g, an abstract)
 */
export async function generateEmbedding(
  text: string
): Promise<(number | null | undefined)[]> {
  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new Error("Invalid input");
  }

  const instance = helpers.toValue({
    content: text,
  });

  if (instance === null || instance === undefined) {
    throw new Error("Failed to create instance");
  }

  const instances = [instance];
  const parameters = helpers.toValue({});

  const request = {
    endpoint: `projects/iconic-computer-358503/locations/asia-southeast1/publishers/google/models/${MODEL_NAME}`,
    instances,
    parameters,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const [response] = await client.predict(request);
      const embeddings =
        response.predictions![0].structValue?.fields?.embeddings?.structValue?.fields?.values.listValue?.values?.map(
          (val) => val.numberValue
        );

      resolve(embeddings as number[]);
    } catch (err) {
      console.error(
        `Error generating embedding for text: ${text.substring(0, 50)}...`,
        err
      );
      reject(err);
    }
  });
}
