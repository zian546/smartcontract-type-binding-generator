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

export const nonpayable = "nonpayable";
export const nonpayableMapping = false;

export const payable = "payable";
export const payableMapping = false;

export const fallbackMutabilityMapping = true;
export type ABI = abiChild[];

export const arrayExt = "[]";

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
  inferredTypes?: string;
  jsDoc?: string;
};

// TODO : make body using ethers js
export type Branch = {
  name: string;
  constant: boolean;
  signatureLiteral?: string;
  bodyLiteral?: string;
  jsDoc?: string;
  attributes: {
    inputs: {
      obj: iochild[];
      jsDoc?: string;
      literals?: string;
    };
    outputs: {
      obj: iochild[];
      jsDoc?: string;
      literals?: string;
    };
  };
};

export type Tree = Branch[];
