// src/components/ResolveDID.js
import React, { useState } from 'react';
import DIDManager from '../DIDManager';

const ResolveDID = () => {
    const [did, setDid] = useState('');
    const [didDocument, setDidDocument] = useState('');

    const handleResolve = async () => {
        try {
            const result = await DIDManager.methods.resolveDID(did).call();
            setDidDocument(result);
        } catch (error) {
            console.error('Error resolving DID:', error.message);
            alert(`Error resolving DID: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Resolve DID</h2>
            <input
                type="text"
                placeholder="DID"
                value={did}
                onChange={(e) => setDid(e.target.value)}
            />
            <button onClick={handleResolve}>Resolve</button>
            {didDocument && (
                <div>
                    <h3>DID Document</h3>
                    <pre>{didDocument}</pre>
                </div>
            )}
        </div>
    );
};

export default ResolveDID;
