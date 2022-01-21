const Tent_Token = artifacts.require("Tent_Token");

module.exports = function(deployer, network, accounts) {
  deployer
    .deploy(Tent_Token);
};
