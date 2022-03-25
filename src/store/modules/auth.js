import {
  GET_AUTH_USER,
  AUTH_SUCCESS,
  LOGIN,
  SIGN_UP,
  LOG_OUT,
  SET_ERRORS,
  SET_AUTH_LOADER,
  SET_APP_LOADING,
  RESET_AUTH_USER,
  LOAD_CURRENT_USER,
  VERIFY_EMAIL,
  PASSWORD_FORGOT,
  PASSWORD_RESET,
  PASSWORD_RESET_LINK_SENT,
  PASSWORD_RESET_LINK_ERROR,
  PASSWORD_RESET_SUCCEEDED,
  PASSWORD_RESET_ERROR,
  SET_ALERT,
} from "../types";

import * as apiCalls from "../../apiCalls/auth";
import $router from "../../router/index";

export const initialState = {
  isAuthenticated: false,
  emailVerified: null,

  user: {
    email: "",
    userName: "",
  },

  isLoading: false,
};

const state = {
  ...initialState,
};

const getters = {
  [GET_AUTH_USER]: (state) => {
    return state;
  },
};

const mutations = {
  [SET_AUTH_LOADER]: (state, isLoading) => {
    state.isLoading = isLoading;
  },

  [RESET_AUTH_USER]: (state) => {
    Object.assign(state, initialState);
  },

  [PASSWORD_RESET_LINK_SENT]: (state, email) => {
    Object.assign(state, {
      ...state,
      resetLink: { status: "sent", at: new Date().getTime() },
    });

    $router.push({
      name: "passwordReset",
      params: { email: email },
    });
  },

  [PASSWORD_RESET_SUCCEEDED]: (state) => {
    state.resetLink && delete state.resetLink;
    state.resetStatus && delete state.resetStatus;
    Object.assign(state);

    if (state.isAuthenticated) {
      $router.replace({ name: "userProfile" });
    } else {
      $router.replace({ name: "signIn" });
    }
  },

  [PASSWORD_RESET_ERROR]: (state, status) => {
    //state = delete state.resetLink;
    state.resetLink && delete state.resetLink;
    state.resetStatus = status;
    Object.assign(state);
  },

  [PASSWORD_RESET_LINK_ERROR]: (state) => {
    Object.assign(state, {
      ...state,
      resetLink: { status: "error", at: new Date().getTime() },
    });
  },
  [AUTH_SUCCESS]: (state, user) => {
    Object.assign(state, {
      ...state,
      isAuthenticated: true,
      emailVerified: user.email_verified_at,

      user: {
        userName: user.name,
        email: user.email,
      },
    });

    const currentRoute = $router.currentRoute._value.name;

    if (currentRoute === "signIn" || currentRoute === "signUp") {
      $router.replace({ name: "home" });
    }
  },
};

const actions = {
  [LOGIN]: async ({ commit, dispatch }, payload) => {
    commit(SET_AUTH_LOADER, true);

    try {
      await apiCalls.logIn(payload);

      dispatch(LOAD_CURRENT_USER);
    } catch (errorsData) {
      commit(SET_ERRORS, errorsData);
    } finally {
      commit(SET_AUTH_LOADER, false);
    }
  },

  [SIGN_UP]: async ({ commit, dispatch }, payload) => {
    commit(SET_AUTH_LOADER, true);

    try {
      await apiCalls.signUp(payload);

      dispatch(LOAD_CURRENT_USER);
    } catch (errorsData) {
      commit(SET_ERRORS, errorsData);
    } finally {
      commit(SET_AUTH_LOADER, false);
    }
  },

  [LOG_OUT]: async ({ commit }) => {
    commit(SET_APP_LOADING, true);

    try {
      await apiCalls.logOut();
      commit(RESET_AUTH_USER);
      $router.go();
    } catch (errorsData) {
      //commit(SET_APP_LOADING, false);
    } finally {
      commit(SET_APP_LOADING, false);
    }
  },

  [VERIFY_EMAIL]: async ({ commit }) => {
    commit(SET_AUTH_LOADER, true);
    try {
      await apiCalls.resendVerificationNotice();
    } catch (errorsData) {
      commit(SET_ERRORS, errorsData);
    } finally {
      commit(SET_AUTH_LOADER, false);
    }
  },

  [PASSWORD_FORGOT]: async ({ commit }, email) => {
    commit(SET_AUTH_LOADER, true);
    try {
      await apiCalls.requestPasswordResetLink(email);
      commit(PASSWORD_RESET_LINK_SENT, email);
    } catch (errorsData) {
      commit(SET_ERRORS, errorsData);
      commit(PASSWORD_RESET_LINK_ERROR);
    } finally {
      commit(SET_AUTH_LOADER, false);
    }
  },

  [PASSWORD_RESET]: async ({ commit }, payload) => {
    commit(SET_AUTH_LOADER, true);
    try {
      await apiCalls.passwordReset(JSON.stringify(payload));
      commit(PASSWORD_RESET_SUCCEEDED);
      commit(SET_ALERT, {
        message: "Password reset successful !",
        type: "primary",
      });
    } catch (errorsData) {
      let originalErrors = errorsData;

      if (originalErrors.messages) {
        if (originalErrors.messages[0][0].indexOf("Max") >= 0) {
          commit(PASSWORD_RESET_ERROR, "exceeded");
        }
        if (originalErrors.messages[0][0].indexOf("Time") >= 0) {
          commit(PASSWORD_RESET_ERROR, "expired");
        }

        commit(PASSWORD_RESET_ERROR, "unknown");
      }
      commit(SET_ERRORS, errorsData);
    } finally {
      commit(SET_AUTH_LOADER, false);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
