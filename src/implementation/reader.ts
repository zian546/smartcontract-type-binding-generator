import { ABI, abiChild, iochild, _function } from "./type-mapping";

export class AbiReader {
  public read(abi: string) {
    const abiString = abi;
    const abiRaw = this.parseRaw(abiString);
    const bindABI = this.bindABI(abiRaw);

    return bindABI;
  }

  private parseRaw(raw: string) {
    return JSON.parse(raw);
  }

  private bindABI(raw: any): ABI {
    let abi: ABI = [];

    for (let i = 0; i < raw.length; i++) {
      if (raw[i].type !== _function) continue;
      abi.push(this.bindChild(raw[i]));
    }
    return abi;
  }

  private bindChild(child: any): abiChild {
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

  private parseIo(input: any[]): iochild[] {
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
