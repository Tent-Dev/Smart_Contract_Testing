//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

//Workshop: 1) Import openzeppelin
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';
//----- End of Workshop: 1) Import openzeppelin -----

contract myToken is ERC20, ERC20Burnable, Ownable, ERC20Permit, ERC20Votes {


    //Workshop: 2) Custom your token here
    constructor() ERC20('Hardhat Token', 'HHT') ERC20Permit('MyGovernanceToken'){
        _mint(msg.sender, 1e8 * 10**decimals());
    }
    //----- End of Workshop: 2) Custom your token here -----

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
