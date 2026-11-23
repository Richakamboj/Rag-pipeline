
import { loadDocument } from "./documentLoader";


const filePath = "./src/docs/PLCProgramming.pdf";
const data = await loadDocument(filePath)

console.log("Loaded document content:", data);