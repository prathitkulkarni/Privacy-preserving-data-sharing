// src/components/RegisterDID.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DIDManager from '../DIDManager';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const RegisterDID = ({ onRegister }) => {
    const [did, setDid] = useState('');
    const [didDocument, setDidDocument] = useState('');
    const [registeredDIDs, setRegisteredDIDs] = useState([]);

    useEffect(() => {
        // Load registered DIDs from local storage or a backend if you have one
        const storedDIDs = JSON.parse(localStorage.getItem('registeredDIDs')) || [];
        setRegisteredDIDs(storedDIDs);
    }, []);

    const handleRegister = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];

                await DIDManager.methods.registerDID(did, didDocument).send({
                    from: account,
                    gas: 3000000, // Specify a gas limit
                    gasPrice: web3.utils.toWei('20', 'gwei') // Specify a gas price
                });

                const newDID = { did, didDocument };
                const updatedDIDs = [...registeredDIDs, newDID];
                setRegisteredDIDs(updatedDIDs);
                localStorage.setItem('registeredDIDs', JSON.stringify(updatedDIDs)); // Save to local storage

                alert('DID Registered!');
                setDid('');
                setDidDocument('');

                if (onRegister) {
                    onRegister(newDID);
                }
            } catch (error) {
                console.error('Error registering DID:', error.message);
                alert(`Error registering DID: ${error.message}`);
            }
        } else {
            alert('MetaMask is not installed or not connected');
        }
    };

    return (
        <div>
            <h2>Register DID</h2>
            <input
                type="text"
                placeholder="DID"
                value={did}
                onChange={(e) => setDid(e.target.value)}
            />
            <input
                type="text"
                placeholder="DID Document"
                value={didDocument}
                onChange={(e) => setDidDocument(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <h3>Registered DIDs</h3>
            <ul>
                {registeredDIDs.map((item, index) => (
                    <li key={index}>
                        {item.did}: {item.didDocument}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegisterDID;
