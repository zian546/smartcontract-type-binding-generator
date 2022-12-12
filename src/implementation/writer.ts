import * as fs from "fs-extra";
import * as path from "path";
import { ABI, Branch, Tree } from "./type-mapping";
import { TypescriptMethodAssembler } from "./typescript/assembler";
import { AbiReader } from "./reader";
import { TypescriptClassParser } from "./typescript/class-parser";
import { TreeBuilder } from "./tree-builder";
import { JavascriptMethodAssembler } from "./javascript/assembler";
import { JavascriptClassParser } from "./javascript/class-parser";

export type writerOtions =
  | {
      /**
       * specify what bindings to generate (default `typescript`).
       */
      lang?: "ts";
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
       *
       * default : `false`.
       */
      truffle?: boolean;
    };

export class Writer {
  typeScriptClassParser: TypescriptClassParser;
  typeScriptAssembler: TypescriptMethodAssembler;

  javaScriptClassParser: JavascriptClassParser;
  javaScriptAssembler: JavascriptMethodAssembler;

  abiReader: AbiReader;
  TreeBuilder: TreeBuilder;

  constructor() {
    this.javaScriptAssembler = new JavascriptMethodAssembler();
    this.javaScriptClassParser = new JavascriptClassParser();
    this.abiReader = new AbiReader();
    this.typeScriptAssembler = new TypescriptMethodAssembler();
    this.typeScriptClassParser = new TypescriptClassParser();
    this.TreeBuilder = new TreeBuilder();
  }

  /**
   * @param name the contract name
   * @param rawAbi the contracts abi in string format
   */
  public write(name: string, rawAbi: string, opt?: writerOtions) {
    const abi = this.inferAbi(rawAbi);
    const tree = this.buildSyntaxTree(abi);

    let bindings: string;

    if (opt === undefined || opt?.lang === undefined || opt?.lang === "ts") {
      bindings = this.buildTypescriptBinding(name, tree);
    }

    if (opt.lang === "js") {
      const generateTruffleBinds = opt.truffle ?? false;
      bindings = this.buildJavascriptBinding(name, tree, generateTruffleBinds);
    }

    return bindings;
  }

  private inferAbi(raw: string) {
    return this.abiReader.read(raw);
  }

  private buildSyntaxTree(abi: ABI) {
    return this.TreeBuilder.build(abi);
  }

  private buildBody(tree: Tree) {
    let body: string = "";

    for (const node of tree) {
      body = body.concat(node.signatureLiteral as string);
    }

    return body;
  }

  private buildTypescriptBinding(name: string, tree: Tree) {
    tree = this.typeScriptAssembler.build(tree);
    const body = this.buildBody(tree);

    const bindings = this.typeScriptClassParser.parse(name, body);
    return bindings;
  }

  private buildJavascriptBinding(
    name: string,
    tree: Tree,
    genTruffle: boolean
  ) {
    tree = this.javaScriptAssembler.build(tree, genTruffle);
    const body = this.buildBody(tree);

    const bindings = this.javaScriptClassParser.parse(name, body);
    return bindings;
  }
}
