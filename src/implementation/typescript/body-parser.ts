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
} from "../token";
import { Tree } from "../type-mapping";

export class TypescriptBodyParser {
  public static parse(fn: Tree) {
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
      this.parseInput(fn),
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

  private static parseInput(fn: Tree) {
    let input = OPEN_PAR;
    const lastIndex = fn.attributes.inputs.obj.length;
    for (const i in fn.attributes.inputs.obj) {
      input = input.concat(fn.attributes.inputs.obj[i].name);
      if (parseInt(i) !== lastIndex - 1) {
        input = input.concat(COMMA);
      }
    }
    input = input.concat(CLOSE_PAR);
    return input;
  }
}
