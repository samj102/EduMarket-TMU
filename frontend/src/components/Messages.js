import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/Chats.css";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Messages = ({ chat, userName }) => {
  const decoded = jwtDecode(localStorage.getItem("login"));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log(chat);

  function handleNewMessage(newMessage) {
    setNewMessage(newMessage);
  }

  async function handleMessageClick() {
    const data = { sender: decoded.id, message: newMessage };
    await api.put(`/chat/${chat}`, data);
    getMessages();
    setNewMessage("");
  }

  async function getMessages() {
    if (chat) {
      const { data } = await api.get(`/chat/${chat}`);
      if (data) {
        console.log(data);
        setMessages(data.messages);
      }
    }
  }
  useEffect(() => {
    getMessages();
  }, [chat]);
  console.log(messages);
  const scroll = useRef();
  return (
    <>
      <div className="ChatBox-container">
        <div className="chat-header">
          <div>
            <img
              src={"./default.png"}
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              {" "}
              {userName}
            </span>
          </div>
          <hr
            style={{
              width: "95%",
              border: "0.1px solid #414a4c",
              marginTop: "20px",
            }}
          />
        </div>
        <div className="chat-body">
          {messages.map((msg) => {
            return (
              <div
                ref={scroll}
                className={
                  decoded.id === msg.sender ? "message own" : "message opp"
                }
              >
                <span>{msg.message}</span>
                <span>{format(msg.timestamp)}</span>
              </div>
            );
          })}
        </div>
        <div className="chat-sender">
          <InputEmoji value={newMessage} onChange={handleNewMessage} />
          <button className="button" onClick={handleMessageClick}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Messages;
