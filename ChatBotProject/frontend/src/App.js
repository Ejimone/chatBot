import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChatInput from "./components/ChatInput";
import ChatDisplay from "./components/ChatDisplay";
import "./App.css";

function App() {
  const [pdfText, setPdfText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const handleTextExtracted = (text) => {
    setPdfText(text);
  };

  const handleNewMessage = (message) => {
    setChatMessages((oldMessages) => [
      ...oldMessages,
      { text: message, from: "user" },
    ]);
  };
  const handleResponse = (response) => {
    setChatMessages((oldMessages) => [
      ...oldMessages,
      { text: response, from: "bot" },
    ]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatBot</h1>
      </header>
      <main className="App-main">
        <FileUpload onTextExtracted={handleTextExtracted} />
        <ChatDisplay messages={chatMessages} />
        <ChatInput
          pdfText={pdfText}
          onNewMessage={handleNewMessage}
          onResponse={handleResponse}
        />
      </main>
    </div>
  );
}
export default App;
