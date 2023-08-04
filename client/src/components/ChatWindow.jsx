import React from "react";
import InputArea from "./InputArea";
import ChatArea from "./ChatArea";

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
        <div className="flex flex-col h-screen justify-between">
            <div className="overflow-auto">
                <ChatArea messages={messages} />
            </div>
            <div className="mb-4">
                <InputArea />
            </div>
        </div>
    );
}


export default ChatWindow;
