import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

import "../styles/Login.css";

/**
 * Renders the Login component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setIsLoggedIn - The function to set the login status.
 * @param {Function} props.setProfile - The function to set the user profile.
 * @returns {JSX.Element} The rendered Login component.
 */
function Login({ setIsLoggedIn, setProfile }) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home if already logged in
  if (localStorage.getItem("login") !== null) {
    history("/home");
  }

  /**
   * Handles the form submission.
   *
   * @param {Event} e - The form submit event.
   */
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      const token = await res.data.token;
      if (token) {
        setIsLoggedIn("true");
        localStorage.setItem("login", token);
        document.cookie = `access_token=${token}`;
        const decoded = jwtDecode(JSON.stringify(token));
        const { data } = await api.get(`/user/${decoded.id}`);
        setProfile({ email: data.email, name: data.name, id: data._id });
        history("/home", { state: { id: email, token: token } });
      } else if (res.status === 401) {
        alert("Incorrect Email or Password");
      } else if (res.status === 500) {
        alert("Login failed");
      }
    } catch (e) {
      if (e.response.status == 401) alert("Incorrect Email or Password");
      else if (e.response.status == 500) alert("Login failed");
      console.log(e);
    }
  }

  return (
    <>
      <div className="login_container">
        <form action="" className="Form">
          <img
            src="./advista-logo.png"
            style={{
              width: "65%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="logo"
            className="profile"
          ></img>
          {/* <h1>Login</h1> */}
          <div className="input">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          {/* <div className="forgot_password">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div> */}

          <button type="submit" onClick={submit}>
            Login
          </button>

          <div className="register">
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
