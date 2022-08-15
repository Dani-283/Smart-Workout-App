import axios from "axios";
import { QueryClient } from "react-query";
import config from "src/config";

const requestConfig = {
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const axiosInstance = axios.create(requestConfig);
axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
export { queryClient };
