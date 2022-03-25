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

export const resendVerificationNotice = async () => {
  try {
    await http.post(authRoutes.EMAIL_VERIFY_NOTICE);
  } catch (error) {
    const errors = error.response;
    errorHandler(errors);
  }
};

export const requestPasswordResetLink = async (email) => {
  try {
    await http.post(authRoutes.PASSWORD_FORGOT, { email });
  } catch (error) {
    const status = error.response.status;
    const errors = error.response;

    if (errors.data && errors.data.errors) {
      errorHandler(errors);
    } else if (
      status === 404 &&
      error.response.data &&
      error.response.data.message !== ""
    ) {
      error.response.data.message =
        "We don't have record associated with this email address";

      errorHandler(error.response.data);
    } else {
      errorHandler(error);
    }
    //const errors = error.response;
  }
};

export const passwordReset = async (payload) => {
  try {
    await http.post(authRoutes.PASSWORD_RESET, JSON.parse(payload));
  } catch (error) {
    const status = error.response.status;
    const errors = error.response;

    if (errors.data && errors.data.errors) {
      errorHandler(errors);
    } else if (
      status === 404 &&
      error.response.data &&
      error.response.data.message !== ""
    ) {
      error.response.data.message =
        "We don't have record associated with this email address";

      errorHandler(error.response.data);
    } else {
      errorHandler(error.response.data);
    }
    //const errors = error.response;
  }
};

const setCSRF = async () => {
  const response = await http.get(authRoutes.CSRF);
  return response;
};

const errorHandler = (response) => {
  if (response.status === 422 && response.data && response.data.errors) {
    const messages = Object.values(response.data.errors);

    throw { messages: messages, type: "danger" };
  } else if (response.message !== "") {
    throw { messages: [response.message], type: "danger" };
  } else {
    throw { messages: ["Unknown error occured"], type: "danger" };
  }
};
