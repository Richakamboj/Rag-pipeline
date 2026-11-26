
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocument(text: string): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
  });

  return splitter.splitText(text);
}

