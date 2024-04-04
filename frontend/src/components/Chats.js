import React, { useEffect, useState, useContext, useRef } from "react";
import "../styles/Chats.css";
import api from "../utils/api.js";
import Conversation from "./Conversation.js";
import Messages from "./Messages.js";
import { jwtDecode } from "jwt-decode";

const Chats = ({ profile, UserContext }) => {
  const decoded = jwtDecode(localStorage.getItem("login"));
  const [chat, setChat] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const didWsChange = useRef(false);

  const ws = useContext(UserContext);
  useEffect(() => {
    if (didWsChange) {
      console.log(ws);
      ws.addEventListener("message", (message) => {
        console.log(message);
      });
    } else {
      didWsChange.current = true;
    }
  }, [ws]);

  async function getChats() {
    const { data } = await api.get(`/user/${decoded.id}`);
    console.log(data);
    if (data) {
      let chatArr = [];
      // setChats(res.data.chats);
      const chatIDs = data.chats;
      console.log(chatIDs);
      for (let i = 0; i < chatIDs.length; i++) {
        const res1 = await api.get(`/chat/${chatIDs[i]}`);
        console.log(res1.data);
        if (res1.data.user_a._id === decoded.id) {
          chatArr.push({ user: res1.data.user_b, chatID: chatIDs[i] });
        } else {
          chatArr.push({ user: res1.data.user_a, chatID: chatIDs[i] });
        }
      }
      setUserData(chatArr);
    } else console.log("Wassup");
  }

  useEffect(() => {
    getChats();
  }, []);

  console.log(userData);

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <hr
            style={{
              width: "95%",
              border: "0.1px solid #414a4c",
              marginTop: "7px",
            }}
          />
          <div className="Chat-list">
            {userData.map((data) => {
              return (
                <Conversation
                  data={data}
                  setChat={setChat}
                  setUserName={setUserName}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        {chat != "" && (
          <Messages chat={chat} userName={userName} UserContext={UserContext} />
        )}
      </div>
    </div>
  );
};

export default Chats;
