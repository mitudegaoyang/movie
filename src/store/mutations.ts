import { MutationTree } from "vuex";

const mutations: MutationTree<any> = {
  SET_DATA: (state, data: any): void => {
    state.data = data;
  },
  CLEAR_DATA: (state): void => {
    state.data = {};
  },
};

export default mutations;
