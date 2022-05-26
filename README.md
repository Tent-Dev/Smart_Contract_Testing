# Workshop: Create your first contract!, first token! and first dApps! 

First, Clone this repo to your project by `git clone --branch Workshop_dApps https://github.com/Tent-Dev/Smart_Contract_Testing.git` and Change the current working directory to Workshop by `cd .\Smart_Contract_Testing\`


Before starting, you must install node module by `npm install`

### Step 1: Import Openzeppelin library

Create `MyToken.sol` in `hardhat_simaple_contract/contracts` and import Openzeppelin library.

```solidity
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';
```



### Step 2: Create First your Token contract

After that. write minting token contract by openzeppelin template

```solidity
contract myToken is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {


    //Custom your token here
    constructor() ERC20('Hardhat Token', 'HHT') ERC20Permit('MyGovernanceToken'){
        _mint(msg.sender, 1e8 * 10**decimals());
    }
    //----- End of Custom your token here -----

    function _afterTokenTransfer(
        address _from,
        address _to,
        uint256 _amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(_from, _to, _amount);
    }

    function _mint(address _to, uint256 _amount) internal override(ERC20, ERC20Votes) {
        super._mint(_to, _amount);
    }

    function _burn(address _account, uint256 _amount) internal override(ERC20, ERC20Votes) {
        super._burn(_account, _amount);
    }
}
```

### Step 3: Import your minting token contract to main contract

Import MyToken.sol to `Greeter.sol`

```solidity
import "./myToken.sol";
```

### Step 4: Write Mint Token contract testing

In `sample-test.js`. Try to test your Mint token and send coin to owner function from solidity.

```javascript
describe("myToken", function () {
  it("Should send coin to owner correctly", async function () {
    const [owner] = await ethers.getSigners();

    const Mytoken = await ethers.getContractFactory("myToken");
    const mytoken = await Mytoken.deploy();
    await mytoken.deployed();

    const ownerBalance = await mytoken.balanceOf(owner.address);
    console.log('Account balance: '+ ownerBalance);
    console.log('Amount: '+ ethers.utils.formatEther(ownerBalance) + ' Token');

    expect(await mytoken.totalSupply()).to.equal(ownerBalance);

  });
});
```

Before to next step. You must change private key to your private key (In this case is Metamask Wallet) in `.secret` file

### Step 5: Write transfer contract testing and run

In `sample-test.js`. Try to test your transfer token function from solidity.

```javascript
describe("myToken", function () {
  it("Should transter token to Receiver correctly", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Mytoken = await ethers.getContractFactory("myToken");
    const mytoken = await Mytoken.deploy();
    await mytoken.deployed();

    let ownerBalance = await mytoken.balanceOf(owner.address);
    console.log('Sender balance: '+ ownerBalance);
    console.log('Sender Amount: '+ ethers.utils.formatEther(ownerBalance) + ' Token');

    await mytoken.transfer(addr1.address, 50);
    expect(await mytoken.balanceOf(addr1.address)).to.equal(50);
    ownerBalance = await mytoken.balanceOf(owner.address);
    console.log('Sender Amount: '+ ethers.utils.formatEther(ownerBalance) + ' Token');

    let receiverBalance = await mytoken.balanceOf(addr1.address);
    console.log('Receiver Amount: '+ ethers.utils.formatEther(receiverBalance) + ' Token');

  });
});
```

After you had successed on step 4-5. Change the current working directory to hardhat_simple_contract by `cd .\hardhat_simple_contract\`, run `npm install --save --dev hardhat` and try to run `npx hardhat test` for testing.

### Step 6: Deploy contract

Deploy contract and go to index.js to change contract address.

In `hardhat.config.js`. Change network url to your Infura API key url.

```javascript
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/<YOUR_INFURA_API_KEY>", //Infura url with projectId
      accounts: [mnemonic] // add the account that will deploy the contract (private key)
     },
     rinkeby: {
      url: "https://rinkeby.infura.io/v3/<YOUR_INFURA_API_KEY>", //Infura url with projectId
      accounts: [mnemonic] // add the account that will deploy the contract (private key)
     },
  }
};
```

After that. run `npx hardhat run scripts/sample-script.js --network rinkeby` and go to index page and change contract address and Infura API Key.

*If you can't deploy the contract because not enough gas fee. Please get ETH on Rinkeby network : https://rinkebyfaucet.com

- Contract address
```javascript
const dev_contractAddress = framework == 'truffle' ? <YOUR_CONTRACT_ADDRESS_WITH_TRUFFLE> : <YOUR_CONTRACT_ADDRESS_WITH_HARDHAT>;
```

- Infura API Key
```javascript
const dev_web3Connect = "wss://rinkeby.infura.io/ws/v3/<YOUR_INFURA_API_KEY_WSS>";
```

### Step 7: Add Token and Test Greet function

Start your node to run website by open new terminal and run `npm run dev`

After that. Add new token in MetaMask by current contract address, test greet function on website again and see token balance.

### Step 8: Write transfer function to call your contract

Add sendTransaction method to "transferHardhat" function by this code.

```javascript
async function transferHardhat() {
    try{
      let convertUintTransferAmount = web3.utils.toWei(transferAmount, "ether");

      console.log('My address: ', address);
      console.log('Transfer to: ', receiverAddress);
      console.log('Amount: ', convertUintTransferAmount);

      const transactionParameters = {
        from: address,
        to: contractAddress,
        data: contract.methods.transfer(receiverAddress, convertUintTransferAmount).encodeABI()
      };

      await window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]}).then((result) => {
        console.log('Sending transaction...');
        console.log(result);
      }).catch((error) => {
        console.log('Sending transaction error');
        console.log(error);
      })
    }
    catch(err){
      console.log(err.message);
      swal ( "Oops" ,  err.message,  "error" )
    }
  }
```

### Finshed! you can try to fill other wallet address and send your token! Have a nice day :D
