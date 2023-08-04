import React from 'react';
import Message from './Message';

// This component is responsible for rendering the chat area where messages are displayed

const ChatArea = ({ messages }) => {
    return (
        <div className="overflow-auto h-64">
            {messages.map((message, index) => (
                <Message key={index} text={message.text} sender={message.sender} />
            ))}
        </div>
    );
};


export default ChatArea;
