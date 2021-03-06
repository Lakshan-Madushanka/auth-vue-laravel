// Getters
//auth
export const GET_AUTH_USER = "Auth/AUTH_USER";

//app
export const GET_ERRORS = "ERRORS/GET_ERRORS";
export const LOADING = "APP/LOADING";
export const GET_ALERT = "APP/GET_ALERT";

//Mutations
//auth
export const AUTH_SUCCESS = "Auth/AUTH_SUCCESS";
export const SET_AUTH_LOADER = "Auth/AUTH_USER_IS_LOADING";
export const AUTH_FAIL = "Auth/AUTH_FAIL";
export const RESET_AUTH_USER = "Auth/RESET_AUTH_USER";
export const PASSWORD_RESET_LINK_SENT = "Auth/PASSWORD_RESET_LINK_SENT";
export const VERIFY_EMAIL = "Auth/VERIFY_EMAIL";
export const PASSWORD_RESET_LINK_ERROR = "Auth/PASSWORD_RESET_LINK_ERROR";
export const PASSWORD_RESET_SUCCEEDED = "Auth/PASSWORD_RESET_SUCCEEDED";
export const PASSWORD_RESET_ERROR = "Auth/PASSWORD_RESET_ERROR";

//app
export const SET_ERRORS = "ERRORS/SET_ERRORS";
export const SET_APP_LOADING = "APP/SET_APP_LOADING";
export const SET_ALERT = "APP/SET_ALERT";
export const CLEAR_ALERT = "APP/CLEAR_ALERT";

//Actions
//auth
export const LOGIN = "AUTH/LOGIN";
export const SIGN_UP = "AUTH/SIGN_UP";
export const LOG_OUT = "AUTH/LOG_OUT";
export const LOAD_AUTH_USER = "AUTH/LOAD_AUTH_USER";
export const PASSWORD_FORGOT = "Auth/PASSWORD_FORGOT";
export const PASSWORD_RESET = "Auth/PASSWORD_RESET";

//app
export const LOAD_CURRENT_USER = "LOAD_CURRENT_AUTH_USER";
