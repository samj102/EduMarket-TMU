import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Cookie: `access_token=${document.cookie}`,
  },
  withCredentials: true,
});
