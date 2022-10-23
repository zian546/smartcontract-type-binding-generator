import Writer from "./src/implementation/writer";
import * as fs from "fs";
import ClassParser from "./src/implementation/class-parser";
import { ABI } from "./src/implementation/type-mapping";

const abi = fs.readFileSync("./abi/standard/erc1155.json");
const writer = new Writer();
const body = writer.write("", abi.toString());
const output = new ClassParser().parse("test", body);

fs.writeFileSync("./output.ts", output);
