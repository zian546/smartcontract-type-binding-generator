import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import IoParser from "./input_parser";

export default class Writer extends IoParser {
  public write(abi: ABI) {}

  public getInputParams(abi: ABI) {
    let inputs = this.parseInputs(abi);
  }
}
