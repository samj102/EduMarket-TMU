import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
const Logout = () => {
  localStorage.clear();
  const history = useNavigate();
  function onClick() {
    history("/login");
    window.location.reload();
  }
  return (
    <div className="login_container">
      <div className="Form">
      You have successfully logged out. Click{" "}
      <Link onClick={onClick}>here</Link> to login{" "}
      </div>
    </div>
  );
};

export default Logout;
