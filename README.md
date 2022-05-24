# Smart_Contract_Testing

### Step 5 Write transfer contract testing

In sample-test.js. Try to test your transfer token function from solidity.

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

### Step 6 Deploy contract

Deploy contract and go to index.js to change contract address.

`npx hardhat run scripts/sample-script.js --network ropsten`

After deploy had successful. Go to index page and change contract address.

```javascript
const dev_contractAddress = framework == 'truffle' ? <YOUR_CONTRACT_ADDRESS_WITH_TRUFFLE> : <YOUR_CONTRACT_ADDRESS_WITH_HARDHAT>;
```

### Step 7 Add Token and Test Greet function

Add new token in MetaMask by current contract address, test greet function again and see token balance.

### Step 8 Write transfer function

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
