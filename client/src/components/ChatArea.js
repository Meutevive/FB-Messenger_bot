import React from 'react';

// This component is responsible for rendering the chat area where messages are displayed

const ChatArea = ({ messages }) => {
    return (
        <div>
            {/* Render each message in the 'messages' array as a paragraph element */}
            {/* Assign a unique 'key' prop to each paragraph element */}
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
};

export default ChatArea;
