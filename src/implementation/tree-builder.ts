import {
  ABI,
  abiChild,
  fallbackMutabilityMapping,
  Branch,
  nonpayable,
  nonpayableMapping,
  payable,
  payableMapping,
} from "./type-mapping";

export class TreeBuilder {
  public build(abi: ABI) {
    let fnLiteral: Branch[] = [];
    for (const node of abi) {
      const parsedChild: Branch = this.groupAttributes(node);

      fnLiteral.push(parsedChild);
    }
    return fnLiteral;
  }
  private determineConstant(stateMutability: string) {
    if (stateMutability === payable) return payableMapping;
    else if (stateMutability === nonpayable) return nonpayableMapping;
    else return fallbackMutabilityMapping;
  }
  private groupAttributes(node: abiChild): Branch {
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
