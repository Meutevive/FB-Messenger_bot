import React, { useState } from 'react';

// This component is responsible for rendering an input area and handling the user's input

const InputArea = ({ onSendMessage }) => {
    // Use the useState hook to create a state variable called 'message' and a function to update it called 'setMessage'
    // The initial value of 'message' is an empty string
    const [message, setMessage] = useState('');

    // This function is called when the user submits the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onSendMessage(message); // Call the 'onSendMessage' prop function and pass in the 'message' value
        setMessage(''); // Reset the 'message' state to an empty string
    };

    return (
        // Render a form element with an onSubmit event handler that calls the 'handleSubmit' function
        <form onSubmit={handleSubmit}>
            {/* Render an input element of type 'text' */}
            {/* The value of the input is set to the 'message' state */}
            {/* When the input value changes, call the 'setMessage' function to update the 'message' state */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {/* Render a submit button */}
            <button type="submit">Send</button>
        </form>
    );
};

export default InputArea;
