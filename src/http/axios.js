import axios from "axios";
import router from "../router/index";
import { BASE_URL } from "../router/apiRoutes/main";
import { errorHandler, networkErrorHandler } from "./errorHandler";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    networkErrorHandler(error);
    const status = error.response.status;
    return errorHandler(status, error);
  }
);

export default axiosInstance;
