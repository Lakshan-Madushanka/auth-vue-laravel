import auth from "./modules/auth";
import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { createStore } from "vuex";
import { actions } from "./actions";

export const store = createStore({
  state: () => state,
  getters,
  mutations,
  actions,
  modules: { auth },
});
