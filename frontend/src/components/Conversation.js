import React from "react";

const Conversation = ({ data }) => {
  console.log(data.name);
  return (
    <div className="follower conversation">
      <div>
        <div className="online-dot"></div>
        <img src="./default.png" style={{ width: "50px", height: "50px" }} />

        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginLeft: "15px",
          }}
        >
          {data.name}
        </span>
      </div>
    </div>
  );
};

export default Conversation;
