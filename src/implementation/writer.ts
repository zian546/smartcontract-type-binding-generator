import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import { IoParser } from "./io-parser";
import AbiReader from "./reader";

export type writerOtions =
  | {
      /**
       * specify what bindings to generate (default `typescript`)
       */
      lang?: "js" | "ts";
    }
  | {
      /**
       * specify what bindings to generate (default `typescript`)
       */
      lang: "js";
      /**
       * generate `{from: address}` bindings for setting `msg.sender` value (useful building bindings for unit test using tools such as `truffle`)
       */
      truffle: boolean;
    };

export class Writer extends IoParser {
  /**
   * @param name the contract name
   * @param abi the contracts abi in string format
   */
  public write(name: string, abi: string, opt?: writerOtions) {
    const abiObj = AbiReader.read(abi);
    const tree = this.parse(abiObj);
    let contract: string = "";

    for (const node of tree) {
      contract = contract.concat(node.signatureLiteral as string);
    }

    return contract;
  }
}
