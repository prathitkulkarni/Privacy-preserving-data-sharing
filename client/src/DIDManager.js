// src/DIDManager.js
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAddress = "0xa374f2C6bBc0550e2B50cA14B1529b530EcA690d";
const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "did",
                "type": "string"
            },
            {
                "name": "didDocument",
                "type": "string"
            }
        ],
        "name": "registerDID",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "did",
                "type": "string"
            }
        ],
        "name": "resolveDID",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const DIDManager = new web3.eth.Contract(abi, contractAddress);

export default DIDManager;
