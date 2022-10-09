import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import IoParser from "./io_parser";

export default class Writer extends IoParser {
  public write(abi: ABI) {
    const parse = this.parse(abi);
    console.log(parse[5]);
  }
}
