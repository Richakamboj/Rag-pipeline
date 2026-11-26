export  function createContext(chunks: any){
   
return chunks.map((chunk: any,index: number)=>{
     
   const { text, source, chunkIndex } = chunk.payload;

    return `
[Source ${index + 1}]
File: ${source}
Chunk: ${chunkIndex}
Content: ${text}
`;
}).join("\n\n");

}