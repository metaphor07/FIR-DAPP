// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// local: 0x5FbDB2315678afecb367f032d93F642f64180aa3
contract Fir {
    struct Complain {
        address owner;
        string name;
        string description;
        string imgProof;
        string vidProof;
        uint256 createdAt;
        bool solved;
    }
    mapping(uint => Complain) public complains;
    uint public complainCount = 0;

    // create a complain
    function createComplain(
        address _owner,
        string calldata _name,
        string calldata _description,
        string calldata _imgProof,
        string calldata _vidProof
    ) public {
        Complain storage comp = complains[complainCount];
        comp.owner = _owner;
        comp.name = _name;
        comp.description = _description;
        comp.imgProof = _imgProof;
        comp.vidProof = _vidProof;
        comp.createdAt = block.timestamp;

        complainCount++;
    }

    // display a complain
    function singleComplain(uint _id) public view returns (Complain memory) {
        Complain storage cmp = complains[_id];
        return cmp;
    }

    // display all campain
    function allComplain() public view returns (Complain[] memory) {
        Complain[] memory allComplains = new Complain[](complainCount);
        for (uint i = 0; i < complainCount; i++) {
            Complain storage item = complains[i];
            allComplains[i] = item;
        }
        return allComplains;
    }

    // update the solved state, only it is accessable who lodge the complain
    function solve(address _owner, uint _id) public {
        Complain storage complain = complains[_id];
        require(complain.owner == _owner, "You are not allowed");
        complain.solved = true;
    }
}
