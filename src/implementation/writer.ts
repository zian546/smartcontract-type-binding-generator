import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import { TypescriptParser } from "./io-parser";
import { AbiReader } from "./reader";
import { TypescriptClassParser } from "./class-parser";
import { TreeBuilder } from "./grouper";

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

export class Writer {
  typeScriptTypescriptBodyParser: TypescriptParser;
  typeScriptClassParser: TypescriptClassParser;
  abiReader: AbiReader;
  treeBuilder: TreeBuilder;

  constructor() {
    this.abiReader = new AbiReader();
    this.typeScriptTypescriptBodyParser = new TypescriptParser();
    this.typeScriptClassParser = new TypescriptClassParser();
    this.treeBuilder = new TreeBuilder();
  }

  /**
   * @param name the contract name
   * @param rawAbi the contracts abi in string format
   */
  public write(name: string, rawAbi: string, opt?: writerOtions) {
    const abiObj = AbiReader.read(rawAbi);
    const tree = this.parse(abiObj);
    let contract: string = "";

    for (const node of tree) {
      contract = contract.concat(node.signatureLiteral as string);
    }

    return contract;
  }

  private inferAbi(raw: string) {
    return this.abiReader.read(raw);
  }

  private buildSyntaxTree(abi: ABI) {
    return this.treeBuilder.build(abi);
  }

  private buildTypescriptBinding(rawAbi: string) {
    const abi = this.inferAbi(rawAbi);
  }

  private buildBody();
}
