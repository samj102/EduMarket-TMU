import React from "react";

/**
 * Represents a conversation component.
 * @param {Object} props - The props object containing data, setChat, and setUserName.
 * @param {Object} props.data - The data object containing chatID and user.
 * @param {Function} props.setChat - The function to set the chatID.
 * @param {Function} props.setUserName - The function to set the user name.
 * @returns {JSX.Element} The conversation component.
 */
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
