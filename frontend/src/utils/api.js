import axios from "axios";

// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default axios.create({
  baseURL: process.env.REACT_APP_REQUEST_URL,
  headers: {
    Authorization: `Bearer ${getCookie("access_token")}`,
  },
  withCredentials: true,
});
