import {
  ABI,
  abiChild,
  fallbackMutabilityMapping,
  Tree,
  nonpayable,
  nonpayableMapping,
  payable,
  payableMapping,
} from "./type-mapping";

export class TreeBuilder {
  public build(abi: ABI) {
    let fnLiteral: Tree[] = [];
    for (const node of abi) {
      const parsedChild: Tree = this.groupAttributes(node);

      fnLiteral.push(parsedChild);
    }
    return fnLiteral;
  }
  private determineConstant(stateMutability: string) {
    if (stateMutability === payable) return payableMapping;
    else if (stateMutability === nonpayable) return nonpayableMapping;
    else return fallbackMutabilityMapping;
  }
  private groupAttributes(node: abiChild): Tree {
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
