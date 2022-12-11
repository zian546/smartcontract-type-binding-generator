import { FORMAT_LINE } from "../token";
import { Branch, iochild } from "../type-mapping";

export class DocGen {
  private generateParam(fragment: iochild) {
    return `${FORMAT_LINE}* @param {${fragment.inferredTypes}} ${fragment.name}\n`;
  }

  private generateOutput(fragments: string[]) {
    return `${FORMAT_LINE}* @returns {${fragments}}\n`;
  }

  // TODO : make method to concat multiple jsdoc literals into 1 for that tree branch
  public generateJsDoc(branch: Branch) {
    this.buildInputJsDocs(branch);
    this.buildOutputJsDoc(branch);
    this.buildJsDoc(branch);
  }

  private buildInputJsDocs(branch: Branch) {
    let doc = "";

    for (const nodeChild of branch.attributes.inputs.obj) {
      nodeChild.jsDoc = this.generateParam(nodeChild);

      doc = doc.concat(nodeChild.jsDoc);
    }

    branch.attributes.inputs.jsDoc = doc;
  }

  private buildOutputJsDoc(branch: Branch) {
    let outputs = [];

    branch.attributes.outputs.obj.forEach((val, i) =>
      outputs.push(val.inferredTypes)
    );

    branch.attributes.outputs.jsDoc = this.generateOutput(outputs);
  }

  private buildJsDoc(branch: Branch) {
    branch.jsDoc = `/**\n ${branch.attributes.inputs.jsDoc} ${branch.attributes.outputs.jsDoc} ${FORMAT_LINE}*/\n`;
  }
}
