import {searchPDF} from "./retriveChunks.ts";
import {createContext} from "./createContext.ts";
import {generateResponse} from "./generateResponse.ts";
import { createInterface } from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";
import type { chatMessage } from "./ollama.ts";
import { rewriteQuestion } from "./rewriteQuestuion.ts";

const rl = createInterface({ input, output });

//store conversation in memory
const chatHistory: chatMessage[]= [];

//maximum previous question-answer exchange

const MAX_HISTORY_TURNS = 6;
async function main(){
    console.log("\n== PDF RAG CHAT ===");
    console.log("Ask questions about your PDF.");
    console.log("type: 'exit' to QuicStream.\n");

    try{
        while(true){
            const userQuery = (await rl.question("You: ")).trim();
            
            if(userQuery.toLowerCase() === "exit"){
                console.log("GoodBye!")
                break;
            }

            if(!userQuery) {
                console.log("Please enter a question.\n");
                continue;
            }
            if (userQuery.toLowerCase() === "clear"){
                chatHistory.length = 0;
                console.log("Conversation memory cleared.\n");
                continue;
            }

            try{

                // step1: Rewrite question using memory

                const standaloneQuestion = await rewriteQuestion(
                    userQuery,
                    chatHistory
                );

                console.log("\nsearch Query:", standaloneQuestion);

                //step 2: search qdrant === 
                const chunks = await searchPDF(standaloneQuestion);
                if(!chunks.length) {
                    console.log("No relevent document found.\n");
                    continue;
                }

                //step3: Build PDF contetx
                const context = createContext(chunks);

                // step4: Generate response using llama + history
                const Response = await generateResponse(
                    userQuery,
                     context,
                     chatHistory
                    );

                console.log(`\nAI: ${Response}\n`);

                // step5:save the conversation-----

                chatHistory.push(
                    {
                    role:"user",
                    content: userQuery
                },
                {
                    role:"assistant",
                    content:Response,
                }

            );
            //step6: keep only the last six exchanges.
            const maxMessages = MAX_HISTORY_TURNS * 2;

            if(chatHistory.length > maxMessages) {
                chatHistory.splice(
                0,
                chatHistory.length - maxMessages
                )              
            };
            } catch(error) {
                console.error("\n Error processing question:", error)
            }
        } 
    }finally{
            rl.close()
        }
}
main().catch(console.error)








//console.log(chunks)

//console.log(context);

//console.log("AI Response:", Response);