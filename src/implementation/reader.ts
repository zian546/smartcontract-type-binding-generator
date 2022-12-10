import { ABI, abiChild, iochild, _function } from "./type-mapping";

export default class AbiReader {
  public static read(abi: string) {
    const abiString = abi;
    const abiRaw = this.parseRaw(abiString);
    const bindABI = this.bindABI(abiRaw);

    return bindABI;
  }

  private static parseRaw(raw: string) {
    return JSON.parse(raw);
  }

  private static bindABI(raw: any): ABI {
    let abi: ABI = [];

    for (let i = 0; i < raw.length; i++) {
      if (raw[i].type !== _function) continue;
      abi.push(this.bindChild(raw[i]));
    }
    return abi;
  }

  private static bindChild(child: any): abiChild {
    return {
      constant: child.constant,
      inputs: this.parseIo(child.inputs),
      name: child.name,
      outputs: this.parseIo(child.outputs),
      payable: child.payable,
      stateMutability: child.stateMutability,
      type: child.type,
    };
  }

  private static parseIo(input: any[]): iochild[] {
    if (input === undefined || input.length === 0) return [];
    let childs: iochild[] = [];

    for (let i = 0; i < input.length; i++) {
      childs.push({
        name: input[i].name,
        type: input[i].type,
      });
    }

    return childs;
  }
}
