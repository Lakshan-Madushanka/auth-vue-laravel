import { GET_ERRORS, LOADING } from "./types";

export const getters = {
  [GET_ERRORS]: (state) => {
    return state.errors;
  },

  [LOADING]: (state) => {
    return state.loading;
  },
};
