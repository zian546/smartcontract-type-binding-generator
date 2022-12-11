import { Branch, iochild } from "../type-mapping";

export class DocGen {
  private generateParam(fragment: iochild) {
    return `* @param {${fragment.inferredTypes}} ${fragment.name}\n`;
  }

  // TODO : make method to concat multiple jsdoc literals into 1 for that tree branch
  public generateJsDoc(branch: Branch) {
    let JsDocliteral = "";

    for (const nodeChild of branch.attributes.outputs.obj) {
      JsDocliteral = JsDocliteral.concat(nodeChild.jsDoc);
    }
    console.log(JsDocliteral);
    return JsDocliteral;
  }

  private buildInputJsDocs(branch: Branch) {
    branch.attributes.inputs.jsDoc = "";

    for (const nodeChild of branch.attributes.inputs.obj) {
      branch.attributes.inputs.jsDoc = branch.attributes.inputs.jsDoc.concat(
        nodeChild.jsDoc
      );
    }
  }
}
