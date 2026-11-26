import { generateEmbedding } from "./generateEmbeddings.ts";
import { collectionName, qdrant } from "./qdrantClient.ts";

export async function searchPDF(Question: string){
    const queryVector = await generateEmbedding(Question);

    // step 2: retrive query using qdrant vector

    const results = await qdrant.query(collectionName, {
        query: queryVector,
        using:'dense',
        with_payload:true,
        limit:3
    })

return results.points
    // step3: print the matching result

  
}