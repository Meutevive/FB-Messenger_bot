import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';

function App() {
    return (
        <div className="App">
            <Navbar />
            <ChatWindow />
        </div>
    );
}

export default App;
