import { createStore } from "vuex";
import mutations from "./mutations";

export default createStore({
  state() {
    return {
      data: {},
    };
  },
  mutations,
  actions: {},
  modules: {},
});
