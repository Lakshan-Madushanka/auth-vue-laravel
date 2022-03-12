import axios from "axios";
import { BASE_URL } from "../router/apiRoutes/main";
//import { errorHandler } from "./errorHandler";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response && error.toJSON().message === "Network Error") {
      alert("Ooops \n Netwok Error \n Make sure your connected to internet !");
      throw new Error(error);
    }
    //const status = error.response.status;

    console.log("errors", error.response);
    //errorHandler(status, error);

    throw error;
  }
);

export default axiosInstance;
