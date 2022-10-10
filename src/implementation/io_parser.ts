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
  EXPORT,
  ASYNC,
  NEWLINE,
  FAT_ARROW,
} from "./token";
import AbiGrouper from "./grouper";

const UNNAMED_VAR = "argv";
export default class IoParser extends AbiGrouper {
  private unnamedCounter: number = 0;

  private incrementCounter() {
    this.unnamedCounter++;
  }
  private resetCounter() {
    this.unnamedCounter = 0;
  }
  private getVarCounter(): string {
    return UNNAMED_VAR.concat(this.unnamedCounter.toString());
  }
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

  // TODO : make return type in Promise<T>
  private buildOutputLiteral(input: iochild) {
    const outputType = this.determineType(input.type);
    const outputName =
      input.name.length === 0 ? this.getVarCounter() : input.name;
    this.incrementCounter();
    const outputLiteral = outputName.concat(COLON, SPACE, outputType);

    return outputLiteral;
  }
  private parseOutput(value: iochild[]) {
    let literal: string[] = [];
    for (const output of value) {
      const outputLiteral = this.buildOutputLiteral(output);
      literal.push(outputLiteral);
    }

    this.resetCounter();
    return literal;
  }
  private getStartingParam() {
    return SPACE.concat(OPEN_PAR);
  }

  protected parse(abi: ABI) {
    const fnGroup = this.group(abi);

    for (const fn of fnGroup) {
      // it is IMPORTANT that we parse signature literal AFTER parsing input and output literals.
      // because we need input and output literals to complete function signature literals.

      fn.attributes.inputs.literals = this.writeIo(
        fn.attributes.inputs.obj,
        true
      );
      fn.attributes.outputs.literals = this.writeIo(
        fn.attributes.outputs.obj,
        false
      );
      fn.signatureLiteral = this.parseFnSignature(fn);
    }

    return fnGroup;
  }

  private writeIo(value: iochild[], writeInput: boolean) {
    if (value.length === 0) return OPEN_PAR.concat(CLOSE_PAR);
    const lastIndex = value.length - 1;
    let params = this.getStartingParam();
    let literal = writeInput ? this.parseInput(value) : this.parseOutput(value);
    for (const i in value) {
      if (i == lastIndex.toString()) {
        params = params.concat(literal[i]);
        break;
      }
      params = params.concat(literal[i].concat(COMMA, SPACE));
    }

    return params.concat(CLOSE_PAR, SPACE);
  }

  private parseFnSignature(fnObj: functionLiteral) {
    const signature = EXPORT.concat(
      SPACE,
      ASYNC,
      SPACE,
      _function,
      SPACE,
      fnObj.name,
      fnObj.attributes.inputs.literals as any,
      this.determineOutput(fnObj),
      // function implementation will starts here
      SPACE,
      // TODO : populate function body with ethers js
      // just put open and close brace for now
      OPEN_BRACE,
      // this space will become function implementation later
      CLOSE_BRACE,
      NEWLINE
    );

    return signature;
  }

  private determineOutput(fnObj: functionLiteral) {
    const _eval = fnObj.attributes.outputs.obj.length;

    if (_eval === 0 || _eval === undefined || _eval === null)
      // make this Promise<T>
      return COLON.concat(SPACE, fallbackMapping);
    else
      return COLON.concat(
        SPACE,
        fnObj.attributes.outputs.literals as any,
        FAT_ARROW
      );
  }

  private determineType(value: string): string {
    if (value.includes(int) || value.includes(uint)) return intMapping;
    else if (value === address) return addressMapping;
    else if (value === string) return stringMapping;
    else if (value === bool) return boolMapping;
    else return fallbackMapping;
  }
}
