# Example

```typescript
import Writer from "smartcontract-type-binding-generator";
import * as fs from "fs";
import Parser from "smartcontract-type-binding-generator";
import { ABI } from "smartcontract-type-binding-generator";

const abi = fs.readFileSync("./abi/auctions/auction.json");
const writer = new Writer();
const body = writer.write("", abi.toString());
const output = new Parser().parse("test", body);

fs.writeFileSync("./output.ts", output);
```
