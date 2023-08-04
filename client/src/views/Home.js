// Home.js

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FiSend } from "react-icons/fi";
import axios from 'axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Home() {

    // Handler function for sending a message
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [botIsTyping, setBotIsTyping] = useState(false);
    const [botCurrentMessage, setBotCurrentMessage] = useState('');

    // Handler function for sending a message
    const handleSendMessage = async () => {
        console.log('handleSendMessage is called');

        // Add the new user message to the state
        setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);

        try {
            setBotIsTyping(true);

            // Send the new message to your backend server
            const response = await axios.post('http://localhost:3000/customUI/message', {
                text: newMessage,
                sender: 'user'
            });

            console.log(JSON.stringify(response.data, null, 2)); // This will log the response from the server

            if (response.data.fulfillmentText) {
                let botMessage = response.data.fulfillmentText;
                let tempMessage = '';  // temporary variable for the bot message

                // Typing animation
                for (let i = 0; i < botMessage.length; i++) {
                    await sleep(50); // adjust the delay as needed
                    tempMessage = botMessage.substring(0, i + 1);
                    setBotCurrentMessage(tempMessage);
                }

                // After bot finished "typing", add the message to messages state
                setMessages(prevMessages => [...prevMessages, { text: tempMessage, sender: 'bot' }]);
                // Clear bot current message
                setBotCurrentMessage('');
            }


            // Simulate typing delay
            await sleep(1000);  // delay for 1 second

            setBotIsTyping(false);

            // Clear the input field
            setNewMessage('');

        } catch (error) {
            console.error('Error sending message:', error);
            setBotIsTyping(false);
        }
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
                {botIsTyping && !botCurrentMessage && <div className="p-4 rounded-lg bg-blue-500 text-white self-start">
                    <p>The bot is typing...</p>
                </div>}
                {botIsTyping && botCurrentMessage && <div className="p-4 rounded-lg bg-blue-500 text-white self-start">
                    <p>{botCurrentMessage}</p>
                </div>}

            </div>

            <div className="flex justify-center mt-4">
                {/* Container for the input and send button */}
                <div className="relative w-1/2">
                    {/* Text area for user input */}
                    <TextareaAutosize
                        minRows={1}
                        className="w-full px-4 py-2 pr-10 rounded-lg border-2  border-gray-700 focus:outline-none focus:border-blue-500 resize-none bg-gray-900 text-white"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault(); // Prevents the addition of a new line
                                handleSendMessage();
                            }
                        }}
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
