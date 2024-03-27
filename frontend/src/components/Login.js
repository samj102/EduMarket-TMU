import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaLock } from "react-icons";

import "./Login.css";

// localStorage.clear();
function Login({ setIsLoggedIn, setProfile }) {
  setIsLoggedIn("false");
  const history = useNavigate();
  // document.body.style = "background: #B3FFCC";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    // console.log("hel");
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
      });
      const token = await res.data.token;
      console.log(token);
      if (token) {
        setIsLoggedIn("true");
        localStorage.setItem("login", token);
        document.cookie = `access_token=${token}`;
        const decoded = jwtDecode(JSON.stringify(token));
        const { data } = await api.get(`/user/${decoded.id}`);
        setProfile({ email: data.email, name: data.name, id: data._id });
        history("/home", { state: { id: email, token: token } });
      } else if (res.status == 401) {
        alert("User has not sign up");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login_container">
      <form action="" className="Form">
        <h1>Login</h1>
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

        <div className="forgot_password">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

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
  );
}

export default Login;
