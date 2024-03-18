import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup({ setIsLoggedIn }) {
  const history = useNavigate();
  setIsLoggedIn("false");

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
        // .then((res) => {
        //   if (res.data == "exist") {
        //     alert("User already exists");
        //   } else if (res.data == "notexist") {
        //     history("/home", { state: { id: email } });
        //   }
        // })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            setIsLoggedIn("true");
            localStorage.setItem("login", res.data.token);
            history("/home", { state: { id: email, token: res.data.token } });
          } else if (res.status == 409) {
            alert("User already exists");
          }

          setIsLoggedIn("true");
          localStorage.setItem("login", res.data.token);
          history("/home", { state: { id: email, token: res.data.token } });
        })
        .catch((e) => {
          if (e.response.status == 409) alert("User already exists");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>

      <form action="POST">
        <input
          type="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />

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

      <Link to="/login">Login Page</Link>
    </div>
  );
}

export default Signup;
