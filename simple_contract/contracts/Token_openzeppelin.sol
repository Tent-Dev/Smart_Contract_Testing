// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';

contract Token_openzeppelin is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {

  // token price for ETH
  uint256 public tokensPerEth = 100;

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfTokens, uint256 amountOfETH);

  constructor() ERC20('TestKub Token', 'TKUB') ERC20Permit('TestKubGovernanceToken') {
    _mint(msg.sender, 1e8 * 10**decimals());
  }

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

  function buyTokens() public payable returns (uint256 tokenAmount) {
    require(msg.value > 0, "Send ETH to buy some tokens");

    uint256 amountToBuy = msg.value * tokensPerEth;

    // // check if the Vendor Contract has enough amount of tokens for the transaction
    // uint256 vendorBalance = balanceOf(address(this));
    // require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

    // Transfer token to the msg.sender
    (bool sent) = transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    // emit the event
    emit BuyTokens(msg.sender, msg.value, amountToBuy);

    return amountToBuy;
  }

  function getBalance() public view onlyOwner returns(uint256)
    {
      return address(msg.sender).balance;
    }
}