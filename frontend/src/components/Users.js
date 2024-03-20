import React, { useState, useEffect } from "react";
import { useLocation, userNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Users() {
  const location = useLocation();
  const [data, setData] = useState([]);

  //1.Get the token from history    2.Decode the token         3.Is admin?            4.If admin call server with auth as a token.

  //   history("/users", { state: { id: email, token: res.data.token } });

  //   Fetching users from the backend server
  useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  try {
    const tok = localStorage.getItem("login");
    const decoded = jwtDecode(tok);
    console.log(decoded);
    if (decoded.role == "admin") {
      return (
        <div className="homepage">
          <h1>List of Users currently signed up:</h1>

          {data.map((dt) => (
            <div>
              <h1>{dt.name}</h1>
              <h1>{dt._id}</h1>
              <h3>{dt.role}</h3>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="homepage">
          <h1>
            Sorry, you do not have the persmissions to get the list of users
          </h1>
        </div>
      );
    }
  } catch (error) {
    alert("Please login");
    window.location.href = "http://localhost:3001/login";
  }
}

export default Users;
