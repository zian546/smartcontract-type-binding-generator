import { iochild } from "../type-mapping";

export class DocGen {
  public generateParam(fragment: iochild) {
    return `* @param {${fragment.inferredTypes}} ${fragment.name}`;
  }
  public generateOutput(fragment: iochild) {
    return `@returns {Promise<${fragment.inferredTypes}>}`;
  }
}
