import {
  int,
  uint,
  intMapping,
  address,
  addressMapping,
  string,
  stringMapping,
  bool,
  boolMapping,
  fallbackMapping,
  returnsIntMapping,
  arrayExt,
} from "./type-mapping";

export class TypeInferer {
  public static infer(value: string, isReturn: boolean) {
    let val = "";

    if (isReturn && (value.includes(int) || value.includes(uint)))
      val = returnsIntMapping;
    else if (value.includes(int) || value.includes(uint)) val = intMapping;
    else if (value === address) val = addressMapping;
    else if (value === string) val = stringMapping;
    else if (value === bool) val = boolMapping;
    else val = fallbackMapping;

    val = value.includes(arrayExt) ? val.concat(arrayExt) : val;

    return val;
  }
}
