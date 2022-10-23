import Writer from "./src/implementation/writer";
import * as fs from "fs";
import ClassParser from "./src/implementation/class-parser";

const abi = fs.readFileSync("./abi/auctions/auction.json");
const writer = new Writer();
const body = writer.write("", abi.toString());
const output = new ClassParser().parse("test", body);

console.log(output);

fs.writeFileSync("./output.ts", output);
