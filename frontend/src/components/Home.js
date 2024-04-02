import React from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });
function Home() {
  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);
  console.log(decoded);
  console.log(decoded.role);

  if (decoded.role === "admin") {
    return (
      <>
        <div className="parent-container">
          <div className="d-flex parts">
            <div className="part1 d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="slide-right">
                Welcome to AdVista, {decoded.email}
              </h1>
              <div className="h-50">
                <img
                  src="./advista-logo.png"
                  style={{
                    background: "transparent",
                    height: "300px",
                    width: "300px",
                  }}
                ></img>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="homepage">
          <h3
            style={{ fontFamily: "Brush Script MT", display: "inline-block" }}
          >
            Hello {decoded.email}, welcome to AdVista
          </h3> */}
        {/* 
        {data.map((dt) => (
          <div>
            <h1>{dt.email}</h1>
            <h3>{dt.role}</h3>
          </div>
        ))} */}
        {/* </div> */}
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
