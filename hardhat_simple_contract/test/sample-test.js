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

//----- End of Workshop: 4) Write testing myToken here -----




//Workshop: 5) Write testing myToken transfer here

//----- End of Workshop: 5) Write testing myToken transfer here -----




// seemore : https://hardhat.org/tutorial/testing-contracts.html

