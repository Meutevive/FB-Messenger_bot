import React from "react";

/**
 * Represents a message component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The text of the message.
 * @param {string} props.sender - The sender of the message.
 * @return {JSX.Element} The rendered message component.
 */
function Message({ text, sender }) {
    return (
        <p className={sender}>
            {text}
        </p>
    );
}

export default Message;
