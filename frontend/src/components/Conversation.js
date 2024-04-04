import React from "react";

const Conversation = ({ data, setChat, setUserName }) => {
  return (
    <div
      className="follower conversation"
      onClick={() => {
        setChat(data.chatID);
        setUserName(data.user.name);
      }}
    >
      <div>
        {/* <div className="online-dot"></div> */}
        <img src="./default.png" style={{ width: "50px", height: "50px" }} />

        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginLeft: "15px",
          }}
        >
          {data.user.name}
        </span>
      </div>
    </div>
  );
};

export default Conversation;
