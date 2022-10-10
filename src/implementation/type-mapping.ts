export const string = "string";
export const stringMapping = "string";

export const _function = "function";

export const int = "int";
export const uint = "uint";
export const intMapping = "number";

export const address = "address";
export const addressMapping = "string";

export const bool = "bool";
export const boolMapping = "boolean";

export const fallbackMapping = "any";

export type ABI = abiChild[];

export type abiChild = {
  constant: boolean;
  inputs: iochild[];
  name: string;
  outputs: iochild[];
  payable: boolean;
  stateMutability: string;
  type: string;
};

export type iochild = {
  name: string;
  type: string;
};

// TODO : make body using ethers js
export type functionLiteral = {
  name: string;
  signatureLiteral?: string;
  body?: any;
  attributes: {
    inputs: {
      obj: iochild[];
      literals?: string;
    };
    outputs: {
      obj: iochild[];
      literals?: string;
    };
  };
};
