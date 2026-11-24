import fs from "node:fs";
import { PDFParse } from "pdf-parse";

const pdfBuffer = fs.readFileSync("./src/docs/PLCProgramming.pdf");
const parser = new PDFParse({ data: pdfBuffer });
export async function loadDocument(filePath: string): Promise<string> {
    try {
    const result = await parser.getText();
    
    
    console.log(result.text);
        return result.text;
} finally {
  await parser.destroy();
}
}