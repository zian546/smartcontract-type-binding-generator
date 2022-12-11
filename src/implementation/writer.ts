import * as fs from "fs-extra";
import * as path from "path";
import { ABI, Branch } from "./type-mapping";
import { TypescriptParser } from "./typescript/io-parser";
import { AbiReader } from "./reader";
import { TypescriptClassParser } from "./typescript/class-parser";
import { BranchBuilder } from "./grouper";

export type writerOtions =
  | {
      /**
       * specify what bindings to generate (default `typescript`).
       */
      lang?: "js" | "ts";
    }
  | {
      /**
       * specify what bindings to generate (default `typescript`).
       */
      lang: "js";
      /**
       * generate `{from: address}` bindings for setting `msg.sender` value (useful building bindings for unit test using tools such as `truffle`).
       *
       * this option is only available if you specify `js` as the `bindings` lang to generate.
       */
      truffle: boolean;
    };

export class Writer {
  typeScriptTypescriptBodyParser: TypescriptParser;
  typeScriptClassParser: TypescriptClassParser;
  abiReader: AbiReader;
  BranchBuilder: BranchBuilder;

  constructor() {
    this.abiReader = new AbiReader();
    this.typeScriptTypescriptBodyParser = new TypescriptParser();
    this.typeScriptClassParser = new TypescriptClassParser();
    this.BranchBuilder = new BranchBuilder();
  }

  /**
   * @param name the contract name
   * @param rawAbi the contracts abi in string format
   */
  public write(name: string, rawAbi: string, opt?: writerOtions) {
    const abiObj = AbiReader.read(rawAbi);
    const Branch = this.parse(abiObj);
    let contract: string = "";

    for (const node of Branch) {
      contract = contract.concat(node.signatureLiteral as string);
    }

    return contract;
  }

  private inferAbi(raw: string) {
    return this.abiReader.read(raw);
  }

  private buildSyntaxBranch(abi: ABI) {
    return this.BranchBuilder.build(abi);
  }

  private buildTypescriptBinding(Branch: Branch) {
    for (const node of Branch) {
      contract = contract.concat(node.signatureLiteral as string);
    }
  }
}
