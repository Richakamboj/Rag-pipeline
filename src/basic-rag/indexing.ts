
import { chunkDocument } from "./chunkDocument.ts";
import { loadDocument } from "./documentLoader.ts";


const filePath = "./src/docs/PLCProgramming.pdf";
const data = await loadDocument(filePath)

console.log("Loaded document content:", data);

const chunks = chunkDocument(data, 1000, 200);
console.log("total chunks:", chunks.length);
console.log("First chunk:", chunks[0])