## Type Bindings Generator For Smart Contract

This tool aim to ease web3 developers pains when dealing with smart contracts on the blockchain. it provides type inference
generated from contract's abi. this tool generate a contract class wrapper intended to be used alongside [ethers](https://www.npmjs.com/package/ethers). this tool also can generate `javascript` and [truffle](https://www.npmjs.com/package/truffle) bindings used for testing purposes.  

Mind you that, this tool only support inferring function return types for constant function call to solidity contracts only. That is, function call that does not change the state of the blockchain. Any non-constant function calls will have their return types inferred as `any`.

## How it works
It basically tries to infer function parameter and return types based on abi solidity types that resolve to corresponding `Javascript/Typescript` Types.

| Solidity           | Javascript/Typescript |
|--------------------|-----------------------|
| int                | ethers.BigNumber      |
| uint               | ethers.BigNumber      |
| address            | string                |
| string             | string                |
| bool               | boolean               |

Types that are not listed in the table above will be inferred as `any` types.

due to solidity having integer types that are outside of the safe range javascript/typescript `number` types operates on, any integer type regardless of the bit size will be converted to a `BigNumber` instance by ethers.

## Usage Example
```typescript
import { Writer } from "smartcontract-type-binding-generator";

const abi = fs.readFileSync("some-abi.json");
const writer = new Writer();
const options = {
  lang: "js",
  truffle: false,
}

const output = writer.write("yourCotnractName", abi.toString(),options);

fs.writeFileSync("./output.js",output);
```
## Typescript Output Example
```typescript
import * as ethers from "ethers"

export class yourCotnractName {
  private contractInstance: ethers.Contract
  public contractAddress: string

  constructor(contractAddress: string, abi: any, signerOrProvider?: ethers.ethers.Signer | ethers.ethers.providers.Provider) {
    this.contractInstance = new ethers.Contract(contractAddress, abi, signerOrProvider);
    this.contractAddress = contractAddress;
  }

  public async DEFAULT_ADMIN_ROLE(): Promise<any>  {
    const tx = await this.contractInstance.DEFAULT_ADMIN_ROLE();
    return tx;
  }

  public async MINTER_ROLE(): Promise<any>  {
    const tx = await this.contractInstance.MINTER_ROLE();
    return tx;
  }

  public async PAUSER_ROLE(): Promise<any>  {
    const tx = await this.contractInstance.PAUSER_ROLE();
    return tx;
  }

  public async balanceOf (account: string, id: number) : Promise<ethers.BigNumber>  {
    const tx = await this.contractInstance.balanceOf(account,id);
    return tx;
  }
}
```

## Javascript Output Example
```javascript
const ethers = require("ethers");

class yourCotnractName {
  contractInstance
  contractAddress

  /**
   * 
   * @param {string} contractAddress 
   * @param {any} abi 
   * @param {ethers.Signer | ethers.providers | undefined} signerOrProvider 
   */
  constructor(contractAddress, abi, signerOrProvider = undefined) {
    this.contractInstance = new ethers.Contract(contractAddress, abi, signerOrProvider);
    this.contractAddress = contractAddress;
  }
  /**
   * @returns {any}
   */
  async DEFAULT_ADMIN_ROLE() {
    const tx = await this.contractInstance.DEFAULT_ADMIN_ROLE();
    return tx;
  }

  /**
   * @returns {any}
   */
  async MINTER_ROLE() {
    const tx = await this.contractInstance.MINTER_ROLE();
    return tx;
  }

  /**
   * @returns {any}
   */
  async PAUSER_ROLE() {
    const tx = await this.contractInstance.PAUSER_ROLE();
    return tx;
  }

  /**
   * @param {string} account
   * @param {number} id
   * @returns {ethers.BigNumber}
   */
  async balanceOf(account, id) {
    const tx = await this.contractInstance.balanceOf(account, id);
    return tx;
  }
}
```

## Javascript with truffle support ouput example
With the truffle support set to `true`, it will provide a parameter to change `msg.sender` value. the parameter will be generated for all method regardless function types. 
```javascript
const ethers = require("ethers");

class yourContractName {
  contractInstance
  contractAddress

  /**
   * 
   * @param {string} contractAddress 
   * @param {any} abi 
   * @param {ethers.Signer | ethers.providers | undefined} signerOrProvider 
   */
  constructor(contractAddress, abi, signerOrProvider = undefined) {
    this.contractInstance = new ethers.Contract(contractAddress, abi, signerOrProvider);
    this.contractAddress = contractAddress;
  }
  /**
   * @returns {any}
   */
  async DEFAULT_ADMIN_ROLE(fromAddress) {
    const tx = await this.contractInstance.DEFAULT_ADMIN_ROLE({ from: fromAddress });
    return tx;
  }

  /**
   * @returns {any}
   */
  async MINTER_ROLE(fromAddress) {
    const tx = await this.contractInstance.MINTER_ROLE({ from: fromAddress });
    return tx;
  }

  /**
   * @returns {any}
   */
  async PAUSER_ROLE(fromAddress) {
    const tx = await this.contractInstance.PAUSER_ROLE({ from: fromAddress });
    return tx;
  }

  /**
   * @param {string} account
   * @param {number} id
   * @returns {ethers.BigNumber}
   */
  async balanceOf(account, id, fromAddress) {
    const tx = await this.contractInstance.balanceOf(account, id, { from: fromAddress });
    return tx;
  }

```

### There are several options available to determine what bindings to generate
```typescript
type writerOtions =
  | {
      /**
       * specify what bindings to generate (default `typescript`).
       */
      lang?: "ts";
    }
  | {
      /**
       * specify what bindings to generate (default `typescript`).
       */
      lang: "js";
      /**
       * generate `{from: address}` bindings for setting `msg.sender` value (useful building bindings for unit test using tools such as `truffle`).
       *
       * this option is only available if you specify `js` as the `bindings` lang to generate.
       *
       * default : `false`.
       */
      truffle?: boolean;
    };
```


## Important
Make sure to pass only the ABI's to the writer instance, as the `writer` instance only accepts array containing contracts abi.
```json
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```
