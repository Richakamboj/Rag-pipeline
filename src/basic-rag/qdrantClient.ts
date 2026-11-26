
import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";

const url = process.env.QDRANT_URL;

if (!url) {
  throw new Error("QDRANT_URL is missing in .env");
}

export const collectionName =
  process.env.QDRANT_COLLECTION || "pdf_rag_minilm";

export const qdrant = new QdrantClient({
  url,
  ...(process.env.QDRANT_API_KEY
    ? { apiKey: process.env.QDRANT_API_KEY }
    : {}),
});

export async function ensureCollection() {
  const collections = await qdrant.getCollections();

  const exists = collections.collections.some(
    (collection) => collection.name === collectionName
  );

  if (!exists) {
    await qdrant.createCollection(collectionName, {
      vectors: {
        dense: {
          size: 384,
          distance: "Cosine",
        },
      },
    });

    console.log("Collection created:", collectionName);
  } else {
    console.log("Using existing collection:", collectionName);
  }
}
