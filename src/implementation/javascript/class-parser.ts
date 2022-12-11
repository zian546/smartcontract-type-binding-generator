import {
  ANY_TOKEN,
  CLOSE_BRACE,
  COLON,
  COMMA,
  CONTRACT_TOKEN,
  DEFAULT_ABI_PARAM,
  DEFAULT_ADDRESS_NAME,
  DEFAULT_INSTANCE_NAME,
  NEWLINE,
  OPEN_BRACE,
  PRIVATE_IDENT,
  SPACE,
  STRING_TOKEN,
  FORMAT_LINE,
  SIGNER_OR_PROVIDER_TOKEN,
  SIGNER_OR_PROVIDER_TYPE_TOKEN,
  OPT_TOKEN,
} from "../token";

export class JavascriptClassParser {
  private defaultAbiParam: string;
  private defaultInstanceName: string;
  private defaultAddressName: string;
  private defaultSignerOrProviderName: string;

  constructor() {
    this.defaultInstanceName = DEFAULT_INSTANCE_NAME;
    this.defaultAddressName = DEFAULT_ADDRESS_NAME;
    this.defaultAbiParam = DEFAULT_ABI_PARAM;
    this.defaultSignerOrProviderName = SIGNER_OR_PROVIDER_TOKEN;
  }
  public parse(name: string, body: string) {
    const importDirective = 'const ethers = require("ethers");';
    const classSignature = `class ${name} `;
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
      CLOSE_BRACE,
      NEWLINE,
      NEWLINE,
      this.getModuleExports(name)
    );

    return contract;
  }

  private getConstructor() {
    const constructorLiteral = `/**
   * 
   * @param {string} contractAddress 
   * @param {any} abi 
   * @param {ethers.Signer | ethers.providers | undefined} signerOrProvider 
   */\n${FORMAT_LINE}constructor(${this.inputLiteral()})`;
    return FORMAT_LINE.concat(constructorLiteral, this.getConstructorBody());
  }
  private inputLiteral() {
    return this.defaultAddressName.concat(
      COMMA,
      SPACE,
      this.defaultAbiParam,
      COMMA,
      SPACE,
      SIGNER_OR_PROVIDER_TOKEN,
      " = undefined"
    );
  }
  private getConstructorBody() {
    const instanceLiteral = `this.${this.defaultInstanceName} = new ethers.Contract(${this.defaultAddressName}, ${this.defaultAbiParam}, ${this.defaultSignerOrProviderName});`;
    const addressLiteral = `this.${this.defaultAddressName} = ${this.defaultAddressName};`;

    return SPACE.concat(
      OPEN_BRACE,
      NEWLINE,
      FORMAT_LINE,
      FORMAT_LINE,
      instanceLiteral,
      NEWLINE,
      FORMAT_LINE,
      FORMAT_LINE,
      addressLiteral,
      NEWLINE,
      FORMAT_LINE,
      CLOSE_BRACE
    );
  }

  private getMemberClass() {
    const contractInstanceName = this.getContractInstanceName();
    const addressName = this.getAddressName();

    return FORMAT_LINE.concat(
      contractInstanceName,
      NEWLINE,
      FORMAT_LINE,
      addressName,
      NEWLINE
    );
  }

  private getContractInstanceName() {
    return this.defaultInstanceName;
  }

  private getAddressName() {
    return this.defaultAddressName;
  }

  private getModuleExports(name: string) {
    return `module.exports = {${name}}`;
  }
}
