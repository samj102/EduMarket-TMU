import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  localStorage.clear();
  return (
    <div>
      You have successfully logged out. Click <Link to={`/login`}>here</Link> to
      login{" "}
    </div>
  );
};

export default Logout;
