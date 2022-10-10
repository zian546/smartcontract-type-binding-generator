import * as fs from "fs-extra";
import * as path from "path";
import { ABI } from "./type-mapping";
import IoParser from "./io_parser";

const TS = ".ts";
export default class Writer extends IoParser {
  /**
   * @param contractName The contract name (duh)
   * @param abi the contracts function abi
   * @param dirPath if provided, will write to this path using contract name parameter
   * as filename.
   */
  public write(contractName: string, abi: ABI, dirPath?: string) {
    const fn = this.parse(abi);
    const paths = this.suffixts(path.resolve(dirPath as string, contractName));

    for (const node of fn) {
      fs.appendFileSync(paths, node.signatureLiteral as string);
    }

    return fn;
  }

  /**
   *
   * make sure ```.ts``` is appended to the filename
   */
  private suffixts(name: string): string {
    if (name.includes(TS)) return name;
    else return name.concat(TS);
  }
}
