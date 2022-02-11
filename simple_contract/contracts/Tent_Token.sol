// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';

contract Tent_Token is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {

  // token price for ETH
  uint256 public tokensPerEth = 100;
  uint256 public tokensSold;

  constructor() ERC20('Tent Token', 'TENT') ERC20Permit('TentGovernanceToken') {
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

  //Get balance by token address and holder address
  function getBalance(address token, address holder) public view returns(uint) {
    IERC20 token = IERC20(token);
    return token.balanceOf(holder);
  }

  function getAirdrops() public {
     require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");
    _mint(msg.sender, airdropsAmount);

    //updates locktime 1 day from now
    lockTime[msg.sender] = block.timestamp + 1 days;
  }
}