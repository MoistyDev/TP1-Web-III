const fs = require("fs");
const text = fs.readFileSync("./words.txt", "utf-8");
export const WORDS = text.split("\n");
