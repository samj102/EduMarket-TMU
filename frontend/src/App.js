import ToS from "./components/ToS.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/Users.js";
import Logout from "./components/Logout.js";

function App() {
  const [isLoggedin, setisLoggedin] = useState("false");
  useEffect(() => {
    if (localStorage.length > 0) {
      setisLoggedin("true");
    }
  }, [isLoggedin]);
  return (
    <div className="App">
      {/* <img
        width="160"
        height="90"
        src={require("./components/advistaLogo.png")}
        alt="Logo"
      /> */}
      <Router>
        {isLoggedin === "true" && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setisLoggedin} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setisLoggedin} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/items-wanted" element={<Home />} />
          <Route path="/items-for-sale" element={<Home />} />
          <Route path="/academic-services" element={<Home />} />
          <Route path="/all-users" element={<Users />} />
          <Route path="/ToS" element={<ToS />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
