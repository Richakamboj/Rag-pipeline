import {readFile} from "node:fs/promises";

const data = await readFile("./src/docs/PLCProgramming.pdf");
console.log(data);
