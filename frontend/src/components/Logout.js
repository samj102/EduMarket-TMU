import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  localStorage.clear();
  const history = useNavigate();
  function onClick() {
    history("/login");
    window.location.reload();
  }
  return (
    <div>
      You have successfully logged out. Click{" "}
      <Link onClick={onClick}>here</Link> to login{" "}
    </div>
  );
};

export default Logout;
