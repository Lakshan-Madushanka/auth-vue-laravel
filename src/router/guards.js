import { store } from "../store/index";
import router from "./index";

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

export const authGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;

  if (!authStatus) {
    next();
  } else {
    next({ name: "home" });
  }
};

export const verifiedGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;
  const emailVerified = store.state.auth.emailVerified;

  if (authStatus && !emailVerified) {
    next();
  } else {
    router.go(1);
    next({ name: "home" });
  }
};
