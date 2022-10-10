import {
  ABI,
  abiChild,
  fallbackMutabilityMapping,
  functionLiteral,
  nonpayable,
  nonpayableMapping,
  payable,
  payableMapping,
} from "./type-mapping";

export default class AbiGrouper {
  protected group(abi: ABI) {
    let fnLiteral: functionLiteral[] = [];
    for (const node of abi) {
      const parsedChild: functionLiteral = this.groupAttributes(node);

      fnLiteral.push(parsedChild);
    }
    return fnLiteral;
  }
  private determineConstant(stateMutability: string) {
    if (stateMutability === payable) return payableMapping;
    else if (stateMutability === nonpayable) return nonpayableMapping;
    else return fallbackMutabilityMapping;
  }
  private groupAttributes(node: abiChild): functionLiteral {
    return {
      name: node.name,
      constant: this.determineConstant(node.stateMutability),
      attributes: {
        inputs: {
          obj: node.inputs,
        },
        outputs: {
          obj: node.outputs,
        },
      },
    };
  }
}
