import {
  ANY_TOKEN,
  CLOSE_BRACE,
  COLON,
  COMMA,
  CONTRACT_TOKEN,
  NEWLINE,
  OPEN_BRACE,
  PRIVATE_IDENT,
  SPACE,
  STRING_TOKEN,
  TABLINE,
} from "./token";

export default class ClassParser {
  private defaultAbiParam: string;
  private defaultInstanceName: string;
  private defaultAddressName: string;

  constructor() {
    this.defaultInstanceName = "contractInstance";
    this.defaultAddressName = "contractAddress";
    this.defaultAbiParam = "abi";
  }
  public parse(name: string, body: string) {
    const importDirective = 'import * as ethers from "ethers"';
    const classSignature = `export default class ${name} `;
    const contract = importDirective.concat(
      NEWLINE,
      NEWLINE,
      classSignature,
      OPEN_BRACE,
      NEWLINE,
      this.getMemberClass(),
      NEWLINE,
      this.getConstructor(),
      NEWLINE,
      body,
      NEWLINE,
      CLOSE_BRACE
    );

    return contract;
  }

  private getConstructor() {
    const constructorLiteral = `constructor(${this.inputLiteral()})`;
    return TABLINE.concat(constructorLiteral, this.getConstructorBody());
  }
  private inputLiteral() {
    return this.defaultAddressName.concat(
      COLON,
      SPACE,
      STRING_TOKEN,
      COMMA,
      SPACE,
      this.defaultAbiParam,
      COLON,
      SPACE,
      ANY_TOKEN
    );
  }
  private getConstructorBody() {
    const instanceLiteral = `this.${this.defaultInstanceName} = new ethers.Contract(${this.defaultAddressName},${this.defaultAbiParam});`;
    const addressLiteral = `this.${this.defaultAddressName} = ${this.defaultAddressName};`;

    return SPACE.concat(
      OPEN_BRACE,
      NEWLINE,
      TABLINE,
      TABLINE,
      instanceLiteral,
      NEWLINE,
      TABLINE,
      TABLINE,
      addressLiteral,
      NEWLINE,
      TABLINE,
      CLOSE_BRACE
    );
  }

  private getMemberClass() {
    const contractInstanceName = this.getContractInstanceName();
    const addressName = this.getAddressName();

    return TABLINE.concat(
      contractInstanceName,
      NEWLINE,
      TABLINE,
      addressName,
      NEWLINE
    );
  }

  private getContractInstanceName() {
    return PRIVATE_IDENT.concat(
      SPACE,
      this.defaultInstanceName,
      COLON,
      SPACE,
      CONTRACT_TOKEN
    );
  }

  private getAddressName() {
    return PRIVATE_IDENT.concat(
      SPACE,
      this.defaultAddressName,
      COLON,
      SPACE,
      STRING_TOKEN
    );
  }
}
