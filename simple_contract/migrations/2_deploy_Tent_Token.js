const Tent_Token = artifacts.require("Tent_Token");

module.exports = function(deployer, network, accounts) {
  if (network == "development"){
    deployer.deploy(Tent_Token);
  }else{
    deployer.deploy(Tent_Token, {gas: 8000000});
  }
};
