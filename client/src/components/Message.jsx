import React from "react";

function Message({ text, sender }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard');
    }

    return (
        <div className={`my-2 p-2 rounded-md ${sender === 'bot' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'} ${sender === 'bot' ? 'text-left' : 'text-right'}`}>
            <p>{text}</p>
            {sender === 'bot' && 
                <button onClick={copyToClipboard} className="bg-white text-blue-600 rounded p-1 text-sm">Copy</button>
            }
        </div>
    );
}

export default Message;
