import React, { useState, useEffect } from "react";
import { useLocation, userNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function Home() {
  // const location = useLocation();
  // const [data, setData] = useState([]);
  // const decoded = jwtDecode(location.state.token);

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
      <div className="homepage">
        <h1>Hello {decoded.email} and welcome to the home page</h1>
        {/* 
        {data.map((dt) => (
          <div>
            <h1>{dt.email}</h1>
            <h3>{dt.role}</h3>
          </div>
        ))} */}
      </div>
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
