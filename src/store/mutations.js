import { SET_ERRORS, SET_APP_LOADING } from "./types";

export const mutations = {
  [SET_ERRORS]: (state, errors) => {
    state.errors = errors;
  },
  [SET_APP_LOADING]: (state, isLoading) => {
    state.loading = isLoading;
  },
};
