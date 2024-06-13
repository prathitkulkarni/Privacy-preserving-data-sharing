// src/App.js
import React from 'react';
import RegisterDID from './components/RegisterDID';
import ResolveDID from './components/ResolveDID';
import './App.css'; // Import the CSS file

function App() {
    return (
        <div className="App">
            <h1>Privacy-Preserving Data Sharing Platform</h1>
            <RegisterDID />
            <ResolveDID />
        </div>
    );
}

export default App;
