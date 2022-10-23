import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import IoParser from "./io_parser";

const TS = ".ts";
export default class Writer extends IoParser {
  /**
   * @param abi the contracts abi
   */
  public write(abi: ABI) {
    const fn = this.parse(abi);
    let contract: string = "";

    for (const node of fn) {
      contract = contract.concat(node.signatureLiteral as string);
    }

    return contract;
  }
}
