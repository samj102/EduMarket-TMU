import React, { useEffect, useState } from "react";
import "../styles/Chats.css";
import api from "../utils/api.js";
import Conversation from "./Conversation.js";
import Messages from "./Messages.js";

const Chats = ({ profile }) => {
  const [chat, setChat] = useState("");
  const [userData, setUserData] = useState([]);
  async function getChats() {
    const { data } = await api.get(`/user/66086232ee857d1420a320b7`);
    console.log(data);
    if (data) {
      let chatArr = [];
      // setChats(res.data.chats);
      const chatIDs = data.chats;
      console.log(chatIDs);
      for (let i = 0; i < chatIDs.length; i++) {
        const res1 = await api.get(`/chat/${chatIDs[i]}`);
        console.log(res1.data);
        if (res1.data.user_a._id === "66086232ee857d1420a320b7") {
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
          <div className="Chat-list">
            {userData.map((data) => {
              return <Conversation data={data} setChat={setChat} />;
            })}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        {chat != "" && <Messages chat={chat} />}
      </div>
    </div>
  );
};

export default Chats;
