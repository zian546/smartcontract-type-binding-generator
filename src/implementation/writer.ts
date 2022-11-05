import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import IoParser from "./io-parser";
import AbiReader from "./reader";

const TS = ".ts";
export default class Writer extends IoParser {
  /**
   * @param name the contract name
   * @param abi the contracts abi in string format
   */
  public write(name: string, abi: string) {
    const abiObj = AbiReader.read(abi);
    const tree = this.parse(abiObj);
    let contract: string = "";

    for (const node of tree) {
      contract = contract.concat(node.signatureLiteral as string);
    }

    return contract;
  }
}
