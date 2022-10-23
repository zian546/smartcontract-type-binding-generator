import Writer from "./src/implementation/writer";
import * as fs from "fs";

const abi = fs.readFileSync("./abi/auctions/auction.json");
const output = new Writer().write(abi.toString());

console.log(output);
fs.writeFileSync("./output.ts", output);
