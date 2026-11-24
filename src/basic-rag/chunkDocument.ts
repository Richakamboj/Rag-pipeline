export function chunkDocument(documentContent: string, chunkSize: number, overlap: number): string[] {
    if(chunkSize <=0 || overlap < 0 || overlap >= chunkSize) {
        throw new Error("Invalid chunksize or overlap")
    }

    const chunks =[];
    const steps = chunkSize - overlap;

    for(let start = 0; start < documentContent.length; start+=steps) {
        const chunk = documentContent.slice(start, start + chunkSize);
        chunks.push(chunk);

        if(start + chunkSize >= documentContent.length) break;

    }

    return chunks;
}