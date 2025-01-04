import React from "react";

const ChatDisplay = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            textAlign: message.from === "user" ? "right" : "left",
            padding: "10px",
            margin: "5px",
            backgroundColor: message.from === "user" ? "#DCF8C6" : "#ECECEC",
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
