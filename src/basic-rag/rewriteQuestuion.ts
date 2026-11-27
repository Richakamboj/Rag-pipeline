import { callOllama, type chatMessage } from "./ollama.ts";

export async function rewriteQuestion(
    userQuery: string,
    chatHistory:chatMessage[]) : Promise<string> {
        if(chatHistory.length === 0){
            return userQuery;
        }
        const messages: chatMessage[] = [
            {
            role:"system",
            content: `
            You rewrite follow-up questions for document retrieval.

Your job:
1. Read the recent conversation.
2. Rewrite the latest user question as a standalone question.
3. Resolve references such as "it", "this", "that", and "they".
4. Preserve the original meaning and technical terms.
5. If the question is already standalone, return it unchanged.
6. Do not answer the question.
7. Do not invent facts or topics.
8. Return only the rewritten question.
`,
               
    },
    ...chatHistory,
    {
        role:"user",
        content:`Rewrite this question for document search:${userQuery}`,
    }
];
const rewriteQuestion = await callOllama(messages);
return rewriteQuestion.replace(/^["']|["']$/g,"").trim();
    }