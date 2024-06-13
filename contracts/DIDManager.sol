// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDManager {
    struct DID {
        address owner;
        string didDocument;
    }

    mapping(string => DID) private didRegistry;

    event DIDRegistered(string did, address owner);

    function registerDID(string memory did, string memory didDocument) public {
        require(didRegistry[did].owner == address(0), "DID already registered");
        didRegistry[did] = DID(msg.sender, didDocument);
        emit DIDRegistered(did, msg.sender);
    }

    function resolveDID(string memory did) public view returns (string memory) {
        require(didRegistry[did].owner != address(0), "DID not registered");
        return didRegistry[did].didDocument;
    }
}
