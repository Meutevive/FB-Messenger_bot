import React, { useState } from 'react';

const InputArea = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-black border-gray-300"
            />
            <button type="submit" className="px-8 rounded-r-lg bg-blue-600 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r">
                Send
            </button>
        </form>
    );
};

export default InputArea;
