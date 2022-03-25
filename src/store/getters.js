import { GET_ERRORS, LOADING, GET_ALERT } from "./types";

export const getters = {
  [GET_ERRORS]: (state) => {
    return state.errors;
  },

  [LOADING]: (state) => {
    return state.loading;
  },

  [GET_ALERT]: (state) => {
    return state.alert;
  },
};
