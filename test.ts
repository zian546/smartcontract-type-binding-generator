import { Writer } from "./src/implementation/writer";
import * as fs from "fs";
import Parser from "./src/implementation/class-parser";
import { ABI } from "./src/implementation/type-mapping";

const abi = fs.readFileSync("./abi/auctions/auction.json");
const writer = new Writer();
const body = writer.write("", abi.toString());
const output = new Parser().parse("test", body);

fs.writeFileSync("./output.ts", output);
