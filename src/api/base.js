import axios from "axios";
import config from "config";

const requestConfig = {
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosInstance = axios.create(requestConfig);

export default axiosInstance;
