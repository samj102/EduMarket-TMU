import React, { useState, useEffect } from "react";
import { useLocation, userNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Users() {
  const location = useLocation();
  const [data, setData] = useState([]);

  function deleteUser(id, name) {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch(`http://localhost:8080/user/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("http://localhost:8080/user")
            .then((res) => res.json())
            .then((val) => setData(val));
        });
    } else {
    }
  }

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
              <h1>
                {dt.name}{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteUser(dt._id, dt.name)}
                />
              </h1>
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
    window.location.href = "http://localhost:3000/login";
  }
}

export default Users;
