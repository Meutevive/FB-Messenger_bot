// Home.js

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FiSend } from "react-icons/fi";

function Home() {
    // State for holding all the messages
    const [messages, setMessages] = useState([
        { text: 'Bonjour!', sender: 'bot' },
        { text: 'Salut!', sender: 'user' },
    ]);

    // Handler function for sending a message
    const handleSendMessage = (message) => {
        setMessages([...messages, { text: message, sender: 'user' }]);
    };

    return (
        <div className="flex flex-col h-screen p-8 space-y-8 bg-gray-800 text-white">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">Esmeralda</h1>
                <p className="text-gray-300">The Essential AI assistant for users.</p>
            </header>
            <div className="flex flex-col flex-grow overflow-y-auto space-y-4 px-60">
                {/* Looping through each message in the state */}
                {messages.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${message.sender === 'bot' ? 'bg-blue-500 text-white self-start' : 'bg-gray-700 text-white self-end'}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                {/* Container for the input and send button */}
                <div className="relative w-1/2">
                    {/* Text area for user input */}
                    <TextareaAutosize
                        minRows={1}
                        className="w-full px-4 py-2 pr-10 rounded-lg border-2  border-gray-700 focus:outline-none focus:border-blue-500 resize-none bg-gray-900 text-white"
                        placeholder="Type your message..."
                    />

                    {/* Send button */}
                    <button onClick={handleSendMessage} className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
    