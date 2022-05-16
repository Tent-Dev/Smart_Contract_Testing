const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

//Workshop: 4) Write testing myToken here
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
//----- End of Workshop: 4) Write testing myToken here -----
// seemore : https://hardhat.org/tutorial/testing-contracts.html

//Workshop: 5) Write testing myToken transfer here
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
//----- End of Workshop: 5) Write testing myToken transfer here -----

//Workshop: 6) deploy contract and go to index.js to change contract address
//Workshop: 7) add new token in MetaMask by current contract address ,test greet function again and see token balance
//Workshop: 8) create function to connect your contract in "transterHardhat" function
//Workshop: 9) Test transfer function finshed!

