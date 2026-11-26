import {searchPDF} from "./retriveChunks.ts";
import {createContext} from "./createContext.ts";
import {generateResponse} from "./generateResponse.ts";

const userQuery = "what is parallel Branching"
const chunks = await searchPDF(userQuery);

//console.log(chunks)
const context = createContext(chunks);
//console.log(context);
const Response = await generateResponse(userQuery, context);
console.log("AI Response:", Response);