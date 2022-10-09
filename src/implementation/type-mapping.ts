export const string = "string";
export const stringMapping = "stringMapping";

export const _function = "function";

// TODO : make sure to use this with .includes() function.
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
  output: iochild[];
  payable: boolean;
  stateMutability: string;
  type: string;
};

export type iochild = {
  name: string;
  type: string;
};

export type functionLiteral = {
  name: string;
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
