import axios from "axios";

const api = axios.create({
  baseURL: "https://homeaglow-staging.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
