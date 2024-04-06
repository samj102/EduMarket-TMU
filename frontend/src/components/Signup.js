import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import validateForm from "../utils/validateForm.js";
import api from "../utils/api.js";
import { jwtDecode } from "jwt-decode";

/**
 * Signup component for user registration.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setIsLoggedIn - Function to set the login status.
 * @param {function} props.setProfile - Function to set the user profile.
 * @returns {JSX.Element} The Signup component.
 */
function Signup({ setIsLoggedIn, setProfile }) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!validateForm(email, password)) {
      return;
    }
    try {
      api
        .post("/auth/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(async (res) => {
          if (res.status === 200) {
            const token = res.data.token;
            setIsLoggedIn("true");
            localStorage.setItem("login", token);
            document.cookie = `access_token=${token}`;
            const decoded = jwtDecode(JSON.stringify(token));
            const { data } = await api.get(`/user/${decoded.id}`);
            setProfile({ email: data.email, name: data.name, id: data._id });
            history("/home", { state: { id: email, token: token } });
          } else if (res.status === 409) {
            alert("User already exists");
          }
        })
        .catch((e) => {
          if (e.response.status === 409) alert("User already exists");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login_container">
      <form action="POST" className="Form">
        <h1>Sign Up</h1>
        <div className="input_signup">
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="input_signup">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        <button type="submit" onClick={submit}>
          Register
        </button>

        <div className="register">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
