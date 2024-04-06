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
import { useState, useEffect, createContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/Users.js";
import Logout from "./components/Logout.js";
import UploadItemPage from "./components/itemsForSale.js";
import ItemsWanted from "./components/itemsWanted.js";
import AcademicServicesPage from "./components/AcademicServices.js";
import ContactUsPage from "./components/ContactUs.js";
import EditProfile from "./components/EditProfile.js";
import Header from "./reusable/header.js";
import Footer from "./reusable/footer.js";
import FormComponent from "./components/SellAnItem.js";
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import MyAds from "./components/MyAds.js";
import Chats from "./components/Chats.js";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [profile, setProfile] = useState({});
  const didWsChange = useRef(false);
  const [ws, setWs] = useState(null);
  const didMount = useRef(false);
  useEffect(() => {
    if (localStorage.length > 0) {
      setisLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      setWs(new WebSocket(process.env.REACT_APP_WS_URL));
    }
  }, [isLoggedin]);

  useEffect(() => {
    if (didWsChange.current) {
      if (localStorage.length > 0) {
        const decoded = jwtDecode(localStorage.getItem("login"));
        ws.addEventListener("open", () => {
          ws.send(JSON.stringify({ my_user_id: decoded.id }));
        });
      }
    } else {
      didWsChange.current = true;
    }
  }, [ws]);

  return (
    <div className="App">
      <Router>
        {isLoggedin && <Header />}
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedin ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setisLoggedin} setProfile={setProfile} />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup setIsLoggedIn={setisLoggedin} setProfile={setProfile} />
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/all-users" element={<Users />} />
            <Route path="/ToS" element={<ToS />} />
            <Route path="/itemsForSale" element={<UploadItemPage />} />
            <Route path="/sell" element={<FormComponent />} />
            <Route path="/itemsWanted" element={<ItemsWanted />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />{" "}
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
            <Route path="/MyAds" element={<MyAds />} />
            <Route
              path="/chat"
              element={
                <UserContext.Provider value={ws}>
                  <Chats profile={profile} UserContext={UserContext} />
                </UserContext.Provider>
              }
            />
          </Routes>
        </div>
        {isLoggedin && <Footer />}
      </Router>
    </div>
  );
}

export default App;
