// Home.js

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FiSend } from "react-icons/fi";
import axios from 'axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Home() {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [botCurrentMessage, setBotCurrentMessage] = useState('');

    const handleSendMessage = async () => {
        console.log('handleSendMessage is called');

        setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);

        try {

            const response = await axios.post('http://localhost:3000/customUI/message', {
                text: newMessage,
                sender: 'user'
            });

            console.log(JSON.stringify(response.data, null, 2));

            if (response.data.fulfillmentText) {
                let botMessage = response.data.fulfillmentText;
                let tempMessage = '';

                for (let i = 0; i < botMessage.length; i++) {
                    await sleep(50);
                    tempMessage = botMessage.substring(0, i + 1);
                    setBotCurrentMessage(tempMessage);
                }

                setMessages(prevMessages => [...prevMessages, { text: tempMessage, sender: 'bot' }]);
                setBotCurrentMessage('');
            }

            await sleep(1000);

            setNewMessage('');

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen p-8 space-y-8 bg-gray-800 text-white">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">Esmeralda</h1>
                <p className="text-gray-300">The Essential AI assistant for users.</p>
            </header>
            <div className="flex flex-col flex-grow overflow-y-auto space-y-4 px-60">
                {messages.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${message.sender === 'bot' ? 'bg-blue-500 text-white self-start' : 'bg-gray-700 text-white self-end'}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
                {botCurrentMessage && <div className="p-4 rounded-lg bg-blue-500 text-white self-start">
                    <p>{botCurrentMessage}</p>
                </div>}
            </div>

            <div className="flex justify-center mt-4">
                <div className="relative w-1/2">
                    <TextareaAutosize
                        minRows={1}
                        className="w-full px-4 py-2 pr-10 rounded-lg border-2  border-gray-700 focus:outline-none focus:border-blue-500 resize-none bg-gray-900 text-white"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <button onClick={handleSendMessage} className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;