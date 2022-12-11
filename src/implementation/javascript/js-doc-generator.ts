import { iochild } from "../type-mapping";

export class DocGen {
  public generateParam(fragment: iochild) {
    return `* @param {${fragment.inferredTypes}} ${fragment.name}`;
  }
}
