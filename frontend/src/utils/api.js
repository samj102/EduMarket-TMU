import axios from "axios";

// Function to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`; // Get the cookie string
  const parts = value.split(`; ${name}=`); // Split the cookie string by the provided name
  if (parts.length === 2) return parts.pop().split(";").shift(); // Return the value of the cookie
}

// Create an instance of axios with custom configuration
export default axios.create({
  baseURL: process.env.REACT_APP_REQUEST_URL, // Set the base URL for API requests
  headers: {
    Authorization: `Bearer ${getCookie("access_token")}`, // Set the Authorization header with the access token from the cookie
  },
  withCredentials: true, // Include cookies in cross-origin requests
});
