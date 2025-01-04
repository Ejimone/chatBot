import React, { useState } from "react";
import axios from "axios";
const ChatInput = ({ pdfText, onNewMessage, onResponse }) => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSend = async () => {
    if (!question) return;
    setLoading(true);
    onNewMessage(question);
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        text: pdfText,
        question: question,
        image: image,
      });
      onResponse(response.data.response);
    } catch (error) {
      console.error("Error sending message", error);
      alert("Error sending message");
    }
    setLoading(false);
    setQuestion("");
  };

  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={handleInputChange}
        placeholder="Ask a question"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSend} disabled={loading}>
        {" "}
        {loading ? "Loading..." : "Send"}{" "}
      </button>
    </div>
  );
};

export default ChatInput;
