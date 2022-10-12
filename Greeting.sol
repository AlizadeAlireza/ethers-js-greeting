// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11; // any miner version up to not including 9

contract Greeting {
    // public here means that this is accessible to anybody and everyone
    string public name;
    string public greetingPrefix = "Hello ";

    // we'll set the name
    constructor(string memory initialName) {
        name = initialName;
    }

    function setName(string memory _newName) public {
        name = _newName;
    }

    // not going take any parameteres ---> just returning
    // we're going to get combination of gP and our name
    function getGreeting() public view returns (string memory) {
        return string(abi.encodePacked(greetingPrefix, name));
    }
}
