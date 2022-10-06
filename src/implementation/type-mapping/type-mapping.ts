export const string = "string";

export const _function = "function";

// TODO : make sure to use this with .includes() function.
export const int = "int";
export const uint = "uint";

export const address = "address";

export const bool = "bool";

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
