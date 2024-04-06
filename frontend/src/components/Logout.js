import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
/**
 * Logout component.
 * Clears the local storage, navigates to the login page, and reloads the window.
 *
 * @returns {JSX.Element} The Logout component.
 */
const Logout = () => {
  localStorage.clear();
  const history = useNavigate();

  /**
   * Handles the click event and navigates to the login page.
   */
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
