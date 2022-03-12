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

  [AUTH_SUCCESS]: (state, user) => {
    Object.assign(state, {
      ...initialState,
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
};
export default {
  state,
  getters,
  mutations,
  actions,
};
