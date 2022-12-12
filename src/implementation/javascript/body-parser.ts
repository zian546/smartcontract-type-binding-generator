import {
  AWAIT_TOKEN,
  CLOSE_PAR,
  COMMA,
  CONSTANT_TOKEN,
  DEFAULT_CONTRACT_CALL,
  DEFAULT_TX_NAME,
  EQ_SIGN,
  NEWLINE,
  OPEN_PAR,
  RETURN_TOKEN,
  SEMI_COLON,
  SPACE,
  FORMAT_LINE,
  TRUFFLE_FROM_ADDRESS_TOKEN,
  TRUFFLE_FORM_ADDRESS_ARGUMENT_TOKEN,
} from "../token";
import { Branch } from "../type-mapping";

export class JavascriptBodyParser {
  public static parse(fn: Branch, truffle: boolean) {
    const txLiteral = NEWLINE.concat(
      FORMAT_LINE,
      FORMAT_LINE,
      CONSTANT_TOKEN,
      SPACE,
      DEFAULT_TX_NAME,
      SPACE,
      EQ_SIGN,
      SPACE,
      AWAIT_TOKEN,
      SPACE,
      DEFAULT_CONTRACT_CALL,
      fn.name,
      this.parseInput(fn, truffle),
      SEMI_COLON,
      NEWLINE,
      FORMAT_LINE,
      FORMAT_LINE,
      RETURN_TOKEN,
      SPACE,
      DEFAULT_TX_NAME,
      SEMI_COLON
    );

    return txLiteral;
  }

  private static parseInput(fn: Branch, truffle: boolean) {
    let literals = fn.attributes.inputs.literals;

    if (truffle) {
      literals = literals.replace(
        TRUFFLE_FROM_ADDRESS_TOKEN,
        TRUFFLE_FORM_ADDRESS_ARGUMENT_TOKEN
      );
    }

    return literals;
  }
}
