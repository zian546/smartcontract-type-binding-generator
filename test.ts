import AbiReader from "./src/implementation/reader";
import Writer from "./src/implementation/writer";

const abi = AbiReader.read("./abi/standard/erc20.json");
new Writer().write(abi);
