import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  setIsLoggedIn("false");
  const history = useNavigate();
  document.body.style = "background: #B3FFCC";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  localStorage.clear();
  function submit(e) {
    e.preventDefault();
    // console.log("hel");
    try {
      axios
        .post("http://localhost:8080/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            setIsLoggedIn("true");
            localStorage.setItem("login", res.data.token);
            document.cookie = `access_token=${res.data.token}`;

            history("/home", { state: { id: email, token: res.data.token } });
          } else if (res.status == 401) {
            alert("User has not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
