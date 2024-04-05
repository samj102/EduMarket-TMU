import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_REQUEST_URL,
  headers: {
    Cookie: `access_token=${document.cookie}`,
  },
  withCredentials: true,
});
