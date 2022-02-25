import { store } from "../store/index";

export const adminGuard = (to, from, next) => {
  const authStatus = store.state.auth.isAuthenticated;

  if (authStatus) {
    next();
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
