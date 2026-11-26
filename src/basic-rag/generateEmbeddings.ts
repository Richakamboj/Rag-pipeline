import {pipeline} from "@huggingface/transformers";
const MODEL_NAME = "onnx-community/all-MiniLM-L6-v2-ONNX";

const extractorPromise = pipeline("feature-extraction", MODEL_NAME);
export async function generateEmbedding(text: string): Promise<number[]> {
    const extractor = await extractorPromise;
    const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
        
    });

    const vector  =Array.from(output.data)
    if (vector.length !== 384) {
        throw new Error(
        `Expected 384 dimensions, got ${vector.length}`
        );
    }

    return vector;
}