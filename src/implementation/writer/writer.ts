import {
  ABI,
  address,
  addressMapping,
  bool,
  boolMapping,
  fallbackMapping,
  int,
  intMapping,
  iochild,
  string,
  stringMapping,
  uint,
} from "../type-mapping";
import * as fs from "fs-extra";
import * as path from "path";
import AbiReader from "../reader";
import { COLON, SPACE, OPEN_PAR, COMMA, CLOSE_PAR } from "./token";

export default class Writer {
  public write(abi: ABI) {
    console.log(this.writeInputParam(abi[1].inputs));
  }

  private buildInputLiteral(input: iochild): string {
    const inputType = this.determineType(input.type);
    const inputName = input.name;
    const inputLiteral = inputName
      .concat(COLON)
      .concat(SPACE)
      .concat(inputType);

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
  private writeInputParam(value: iochild[]) {
    const lastIndex = value.length - 1;
    let params = this.getStartingParam();
    let literal = this.parseInput(value);
    for (const i in value) {
      if (i == lastIndex.toString()) {
        params = params.concat(literal[i].concat(SPACE));
        break;
      }
      params = params.concat(literal[i].concat(COMMA).concat(SPACE));
    }

    return params.concat(CLOSE_PAR, SPACE);
  }

  private determineType(value: string): string {
    if (value.includes(int) || value.includes(uint)) return intMapping;
    else if (value === address) return addressMapping;
    else if (value === string) return stringMapping;
    else if (value === bool) return boolMapping;
    else return fallbackMapping;
  }
}
