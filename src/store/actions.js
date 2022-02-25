import {
  LOAD_CURRENT_USER,
  SET_APP_LOADING,
  RESET_AUTH_USER,
  AUTH_SUCCESS,
} from "./types";
import { checkAuthStatus } from "../apiCalls/common";

export const actions = {
  [LOAD_CURRENT_USER]: async ({ commit }) => {
    commit(SET_APP_LOADING, true);
    try {
      const data = await checkAuthStatus();

      commit(AUTH_SUCCESS, data);
    } catch (err) {
      commit(RESET_AUTH_USER);
      commit(SET_APP_LOADING, false);
    } finally {
      commit(SET_APP_LOADING, false);
    }
  },
};
