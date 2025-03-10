import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "/api"
      : "http://localhost:5001/api",
  withCredentials: true,
});

export default axiosInstance;
