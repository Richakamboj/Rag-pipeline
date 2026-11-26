
// import { chunkDocument } from "./chunkDocument.ts";
import { loadDocument } from "./documentLoader.ts";
import {
  qdrant,
  collectionName,
  ensureCollection,
} from "./qdrantClient.ts";
import { chunkDocument } from "./chunkPdf.ts";

import {generateEmbedding} from "./generateEmbeddings.ts";
import { resolve, basename } from "node:path";
import { randomUUID } from "node:crypto";
const filePath = "./src/docs/PLCProgramming.pdf";
const data = await loadDocument(filePath)

console.log("Loaded document content:", data);


//-----------chunking using chunkDocument.ts---------------
// const chunks = chunkDocument(data, 1000, 200);
// console.log("total chunks:", chunks.length);
// console.log("First chunk:", chunks[0])

// ---------------chunking using chunkPDF.ts--------------
 // Step 2: Split text into chunks
  const chunks = await chunkDocument(data);

  console.log("Total chunks:", chunks.length);


  // Step 3: Prepare Qdrant collection
  await ensureCollection();
    // Step 4: Generate embeddings and upsert
    const batchSize = 20; // Adjust based on your needs
    let stored  =0;

    for (let start = 0; start < chunks.length; start += batchSize) {
        const batch = chunks.slice(start, start + batchSize);
        const points =[];

        for(let index = 0; index < batch.length; index++){
             const chunkIndex = start + index;
             const chunk = batch[index];
                 const embedding = await generateEmbedding(chunk);

                 points.push({
                    id: randomUUID(),
                    vector:{
                        dense:embedding
                    },
                    payload:{
                        text:chunk,
                        source:basename(filePath),
                        chunkIndex,
                        embeddingModel: "all-MiniLM-L6-v2",

                    }
                 })

        }
        await qdrant.upsert(collectionName, { wait: true,points });

         stored += points.length;
          console.log(`Stored ${stored}/${chunks.length} chunks`);
console.log("PDF indexing completed!");
    }
  

 
