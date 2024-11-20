import React from "react";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((msg, idx) => (
                <div key={idx}>
                    <strong>{msg.sender}:</strong> {msg.content}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
