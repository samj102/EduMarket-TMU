import React from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });
function Home() {
  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);
  if (decoded.role === "admin") {
    return (
      <>
        <div className="parent-container">
          <div className="d-flex parts">
            <div className="part1 d-flex flex-column justify-content-center align-items-center">
              {/* <h1 data-aos="slide-right"> */}
              <h1>Welcome to AdVista, {decoded.email}</h1>
              <div className="h-50"></div>
            </div>
          </div>
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
