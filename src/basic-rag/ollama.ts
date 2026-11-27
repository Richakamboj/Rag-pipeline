import "dotenv/config";
import { error } from "node:console";

export type chatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
}

type ollamaResponse = {
    message?: {
        content?:string;
    }
}

export async function callOllama  (
    message: chatMessage[] ):Promise<string> {
        const baseURL = process.env.OLLAMA_URL || "http://localhost:11434";

        const model = 
        process.env.OLLAMA_MODEL || "llama3.2";

        const response = await fetch(
            `${baseURL.replace(/\/$/, "")}/api/chat`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    model,
                    messages:message,
                    stream: false,
                    options:{
                        temperature: 0.1,
                    }
                })
            }
        );
        if(!response.ok) {
            throw new Error(
                `ollama error ${response.status}: ${await response.text()}`
            )
        }
        const data = (await response.json()) as ollamaResponse;

        const content = data.message?.content?.trim();

        if(!content) {
            throw new Error("Ollama returned an empty response");
        }

        return content;
    }
    
