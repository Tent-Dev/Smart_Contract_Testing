// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
contract Token {
    mapping (address => uint256) public balanceOf;

    string private hello;

    constructor(uint256 initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
        hello = "Hello World";
    }

    function transfer(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the sender has enough
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        return true;
    }

    function getBalance() public view returns(string memory){
        return hello;   
    }
}