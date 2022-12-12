import { Writer } from "./src/implementation/writer";
import * as fs from "fs";
import { TypescriptClassParser } from "./src/implementation/typescript/class-parser";
import { ABI } from "./src/implementation/type-mapping";

const abi = fs.readFileSync("./abi/auctions/auction.json");
const writer = new Writer();
const output = writer.write("test", abi.toString("utf-8"), {
  lang: "js",
  truffle: false,
});

fs.writeFileSync("./output.js", output);
