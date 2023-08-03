import React from "react";
import Message from "./Message";
import InputArea from "./InputArea";

/**
 * Represents a chat window component.
 *
 * @return {JSX.Element} The rendered chat window component.
 */
function ChatWindow() {
    const messages = [
        { text: 'Bonjour!', sender: 'bot' },
        { text: 'Salut!', sender: 'user' },
    ];

    return (
        <div>
            {messages.map((message, index) => (
                <Message key={index} text={message.text} sender={message.sender} />
            ))}

            <InputArea />
        </div>
    );
}

export default ChatWindow;
