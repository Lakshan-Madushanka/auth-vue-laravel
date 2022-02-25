import http from "../http/axios";

import * as authRoutes from "../router/apiRoutes/auth";

export const signUp = async (payload) => {
  try {
    await setCSRF();
    await http.post(authRoutes.SIGN_UP, payload);
  } catch (error) {
    const errors = error.response;
    errorHandler(errors);
  }
};

export const logIn = async (payload) => {
  try {
    await setCSRF();
    await http.post(authRoutes.LOGIN, payload);
  } catch (error) {
    const errors = error.response;
    errorHandler(errors);
  }
};

export const logOut = async () => {
  await http.post(authRoutes.LOGOUT);
};
const setCSRF = async () => {
  const response = await http.get(authRoutes.CSRF);
  return response;
};

const errorHandler = (response) => {
  if (response.status === 422 && response.data && response.data.errors) {
    const messages = Object.values(response.data.errors);
    throw { messages: messages, type: "danger" };
  } else {
    throw { messages: ["Unknown error occured"], type: "danger" };
  }
};
