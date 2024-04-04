import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup({ setIsLoggedIn }) {
  const history = useNavigate();
  setIsLoggedIn(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/auth/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            localStorage.setItem("login", res.data.token);
            document.cookie = `access_token=${res.data.token}`;
            history("/home", { state: { id: email, token: res.data.token } });
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
          Resgister
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
