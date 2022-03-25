import { MAIN_URL } from "./main";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const SIGN_UP = "register";
export const CSRF = MAIN_URL + "sanctum/csrf-cookie";
export const EMAIL_VERIFY_NOTICE = "email/verification-notification";
export const PASSWORD_FORGOT = "/forgot-password";
export const PASSWORD_RESET = "/reset-password";
export const AUTH_USER = "user";
