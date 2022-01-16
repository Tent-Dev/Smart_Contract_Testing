const TokenOpenzeppelin = artifacts.require("Token_openzeppelin");

module.exports = function(deployer, network, accounts) {
  deployer
    .deploy(TokenOpenzeppelin);
};
