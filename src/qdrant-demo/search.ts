import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

const client = new QdrantClient({
  url: process.env.QDRANT_HOST,
  apiKey: process.env.QDRANT_API_KEY,
});
// generate query embedding
const queryText = "5 Second Rule Junior";

// search for similar items
const results = await client.query("AMAZON_ESCI_PRODUCTS", {
  query: {
    text: queryText,
    model: "sentence-transformers/all-MiniLM-L6-v2",
  },
  using: "dense", 
  with_payload: true,
  limit: 5,

});

// print results
for (const result of results.points) {


    console.log(`brand: ${result.payload?.brand || 'N/A'}`);
  console.log(`Score: ${result.score}`);
  console.log(`product_id: ${result.payload?.product_id || 'N/A'}`);
  console.log(`text: ${result.payload?.text || 'N/A'}`);
  console.log(`color: ${result.payload?.color || 'N/A'}`);

  console.log('---');
 
 
}