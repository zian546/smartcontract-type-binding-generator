import { ABI, abiChild, functionLiteral } from "./type-mapping";

export default class AbiGrouper {
  protected group(abi: ABI) {
    let fnLiteral: functionLiteral[] = [];
    for (const node of abi) {
      const parsedChild: functionLiteral = this.groupAttributes(node);
      fnLiteral.push(parsedChild);
    }
    return fnLiteral;
  }
  private groupAttributes(node: abiChild): functionLiteral {
    return {
      name: node.name,
      attributes: {
        inputs: {
          obj: node.inputs,
        },
        outputs: {
          obj: node.output,
        },
      },
    };
  }
}
