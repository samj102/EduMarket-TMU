import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Messages = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  console.log(chat);

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
  return (
    <>
      {messages.map((msg) => {
        return <div>{msg.message}</div>;
      })}
    </>
  );
};

export default Messages;
