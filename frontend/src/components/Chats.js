import React, { useState } from "react";
import "../styles/Chats.css";

const Chats = () => {
  const [chats, setChats] = useState([]);
  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">Conversations</div>
        </div>
      </div>

      <div className="Right-side-chat">Right Side</div>
    </div>
  );
};

export default Chats;
