import {
  iochild,
  int,
  uint,
  intMapping,
  address,
  addressMapping,
  string,
  stringMapping,
  bool,
  boolMapping,
  fallbackMapping,
  ABI,
  functionLiteral,
  _function,
} from "./type-mapping";
import {
  COLON,
  SPACE,
  OPEN_PAR,
  COMMA,
  CLOSE_PAR,
  OPEN_BRACE,
  CLOSE_BRACE,
} from "./token";
import AbiGrouper from "./grouper";

export default class IoParser extends AbiGrouper {
  private buildInputLiteral(input: iochild): string {
    const inputType = this.determineType(input.type);
    const inputName = input.name;
    const inputLiteral = inputName.concat(COLON, SPACE, inputType);

    return inputLiteral;
  }

  private parseInput(value: iochild[]) {
    let literal: string[] = [];
    for (const input of value) {
      const inputLiteral = this.buildInputLiteral(input);
      literal.push(inputLiteral);
    }
    return literal;
  }

  private getStartingParam() {
    return SPACE.concat(OPEN_PAR, SPACE);
  }

  protected parse(abi: ABI) {
    const fnGroup = this.group(abi);

    for (const fn of fnGroup) {
      fn.attributes.inputs.literals = this.writeIo(fn.attributes.inputs.obj);
      fn.attributes.outputs.literals = this.writeIo(fn.attributes.outputs.obj);
    }

    return fnGroup;
  }

  private writeIo(value: iochild[]) {
    if (value.length === 0) return "";
    const lastIndex = value.length - 1;
    let params = this.getStartingParam();
    let literal = this.parseInput(value);
    for (const i in value) {
      if (i == lastIndex.toString()) {
        params = params.concat(literal[i].concat(SPACE));
        break;
      }
      params = params.concat(literal[i].concat(COMMA, SPACE));
    }

    return params.concat(CLOSE_PAR, SPACE);
  }

  private parseFnSignature(fnObj: functionLiteral) {
    const signature = _function.concat(
      SPACE,
      fnObj.name,
      SPACE,
      fnObj.attributes.inputs.literals as any,
      SPACE,
      // TODO : populate function body with ethers js
      // just put open and close brace for now
      OPEN_BRACE,
      // this space will become function implementation later
      SPACE,
      CLOSE_BRACE
    );

    return signature;
  }

  private determineType(value: string): string {
    if (value.includes(int) || value.includes(uint)) return intMapping;
    else if (value === address) return addressMapping;
    else if (value === string) return stringMapping;
    else if (value === bool) return boolMapping;
    else return fallbackMapping;
  }
}
