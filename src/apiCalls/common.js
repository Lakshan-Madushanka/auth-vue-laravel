import http from "../http/axiosGeneric";
import { AUTH_USER } from "../router/apiRoutes/auth";

export const checkAuthStatus = async () => {
  const data = await http.get(AUTH_USER);

  return data;
};
