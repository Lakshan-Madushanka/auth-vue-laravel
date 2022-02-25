import axios from "axios";
import { BASE_URL } from "../router/apiRoutes/main";
import { networkErrorHandler } from "./errorHandler";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    networkErrorHandler(error);
  }
);
export default axiosInstance;
