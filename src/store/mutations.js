import { SET_ERRORS, SET_APP_LOADING, SET_ALERT, CLEAR_ALERT } from "./types";

export const mutations = {
  [SET_ERRORS]: (state, errors) => {
    state.errors = errors;
  },

  [SET_APP_LOADING]: (state, isLoading) => {
    state.loading = isLoading;
  },

  [SET_ALERT]: (state, alertData) => {
    state.alert = alertData;
  },

  [CLEAR_ALERT]: (state) => {
    state.alert = {};
  },
};
