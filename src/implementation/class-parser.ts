import { CLOSE_BRACE, NEWLINE, OPEN_BRACE } from "./token";

export default class ClassParser {
  public static parse(name: string, body: string) {
    const importDirective = 'import * as ethers from "ethers"';
    const classSignature = `export default class ${name} `;
    const contract = classSignature.concat(
      OPEN_BRACE,
      NEWLINE,
      NEWLINE,
      body,
      NEWLINE,
      CLOSE_BRACE
    );

    return contract;
  }

  private getConstructor() {}

  private getMemberClass() {}
}
