import { store } from "../store/index";

export const adminGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;
  const emailVerified = store.state.auth.emailVerified;

  if (authStatus && emailVerified) {
    next();
  } else if (authStatus && !emailVerified) {
    next({ name: "resentVerficationNotice" });
  } else {
    next({ name: "signIn" });
  }
};

export const guestGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;

  if (!authStatus) {
    next();
  } else {
    next({ name: "home" });
  }
};

export const authGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;

  if (authStatus) {
    next();
  } else {
    next({ name: "signIn" });
  }
};

export const passwordResetGuard = (to, from, next) => {
  const authStatus = store.state.auth;
  if (authStatus.resetLink && authStatus.resetLink.status === "sent") {
    next();
  } else {
    next({ name: "passwordForgot" });
  }
};

export const verifiedGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;
  const emailVerified = store.state.auth.emailVerified;

  if (authStatus && !emailVerified) {
    next();
  } else {
    next({ name: "home" });
  }
};
