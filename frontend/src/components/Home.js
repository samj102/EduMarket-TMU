import React, { useState, useEffect } from "react";
import { useLocation, userNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "./Animation.json";

function Home() {
  // const location = useLocation();
  // const [data, setData] = useState([]);
  // const decoded = jwtDecode(location.state.token);
  // document.body.style = "background: #B3FFCC";

  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);
  console.log(decoded);
  console.log(decoded.role);

  //Fetching users from the backend server

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  if (decoded.role == "admin") {
    return (
      <>
        <div style={{ display: "inline-block" }}>
          <img
            src={"./advista-logo.png"}
            style={{
              width: "10%",
              marginLeft: "0%",
              marginTop: "0%",
              display: "inline-block",
            }}
          ></img>
        </div>
        {/* <h1
          style={{
            fontFamily: "Copperplate, Papyrus, fantasy",
            marginLeft: "40%",
            marginTop: "0%",
          }}
        >
          welcome to the home page
        </h1> */}

        <div style={{ width: "20%", float: "right", display: "inline-block" }}>
          <Lottie animationData={Animation} />
        </div>
        <div className="homepage">
          <h3
            style={{ fontFamily: "Brush Script MT", display: "inline-block" }}
          >
            Hello {decoded.email}, welcome to AdVista
          </h3>
          {/* 
        {data.map((dt) => (
          <div>
            <h1>{dt.email}</h1>
            <h3>{dt.role}</h3>
          </div>
        ))} */}
        </div>
      </>
    );
  } else {
    return (
      <div className="homepage">
        <h1>Hello {decoded.email} and welcome to the home page</h1>
      </div>
    );
  }


}

export default Home;
