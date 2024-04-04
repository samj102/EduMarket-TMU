import React, { useEffect, useState, useContext } from "react";
import { useRef } from "react";
import "../styles/Chats.css";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Messages = ({ chat, userName, UserContext }) => {
  const decoded = jwtDecode(localStorage.getItem("login"));

  const ws = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  function handleNewMessage(newMessage) {
    setNewMessage(newMessage);
  }

  async function handleMessageClick() {
    const data = { sender: decoded.id, message: newMessage };
    const res = await api.put(`/chat/${chat}`, data);
    ws.send(
      JSON.stringify({
        chat: chat,
        receiver:
          res.data.user_a === decoded.id ? res.data.user_b : res.data.user_a,
      })
    );
    getMessages();
    setNewMessage("");
  }

  useEffect(() => {
    ws.addEventListener("message", (message) => {
      if (JSON.parse(message.data).chat === chat) {
        getMessages();
      }
    });
  }, []);

  async function getMessages() {
    if (chat) {
      const { data } = await api.get(`/chat/${chat}`);
      if (data) {
        setMessages(data.messages);
      }
    }
  }
  useEffect(() => {
    getMessages();
  }, [chat]);

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
