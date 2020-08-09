import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    _isCartOpen: false,
  },
  mutations: {
    SET_CART(state, payload) {
      state._isCartOpen = payload;
    },
  },
  actions: {
    isCartOpen({ commit }, payload) {
      commit("SET_CART", payload);
    },
  },
  modules: {},
});
