import ToS from "./components/ToS.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/Users.js";
import Logout from "./components/Logout.js";
import AboutUsPage from "./components/AboutUs.js";
import UploadItemPage from "./components/itemsForSale.js";
import ItemsWanted from "./components/itemsWanted.js";
import AcademicServicesPage from "./components/AcademicServices.js";
import ContactUsPage from "./components/ContactUs.js";
import EditProfile from "./components/EditProfile.js";
import Header from "./reusable/header.js";
import Footer from "./reusable/footer.js";
import FormComponent from "./components/SellAnItem.js";


function App() {
  const [isLoggedin, setisLoggedin] = useState("false");
  const [profile, setProfile] = useState({});
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
        {/* {isLoggedin === "true" && <Navbar />} */}
        {isLoggedin === "true" && <Header />}
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setisLoggedin} setProfile={setProfile} />
              }
            />
            <Route
              path="/signup"
              element={<Signup setIsLoggedIn={setisLoggedin} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/all-users" element={<Users />} />
            <Route path="/ToS" element={<ToS />} />
            <Route path="/About_Us" element={<AboutUsPage />} />
            <Route path="/itemsForSale" element={<UploadItemPage />} />
            <Route path="/sell" element={<FormComponent />} />
            <Route path="/itemsWanted" element={<ItemsWanted />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />{" "}
            {/*Change this once Provacy Policy pg is up*/}
            <Route
              path="/AcademicServices"
              element={<AcademicServicesPage />}
            />
            <Route path="/ContactUs" element={<ContactUsPage />} />
            <Route
              path="/edit-profile"
              element={
                <EditProfile profile={profile} setProfile={setProfile} />
              }
            />
            <Route path="/chat" element={<Chats />} />
          </Routes>
        </div>
        {isLoggedin === "true" && <Footer />}
      </Router>
    </div>
  );
}

export default App;
