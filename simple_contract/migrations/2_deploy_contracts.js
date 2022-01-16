const Token = artifacts.require("Token");

module.exports = function(deployer, network, accounts) {
  deployer
    .deploy(Token, 1000000)
    .then(async () => {
      const token = await Token.deployed();
      const coinbase = accounts[0];
      const value = 50000;
      await token.transfer(coinbase, accounts[1], value);
    });
};
