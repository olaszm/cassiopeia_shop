import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import client from "@/plugins/contentful";

export default new Vuex.Store({
  state: {
    _isCartOpen: false,
    products: [],
    cart: [],
    totalProducts: 0,
    discount: 0,
    filters: {
      // priceOrder: "",
      place: "",
      size: "medium",
      // isCactus: "cactus",
    },
  },
  mutations: {
    SET_CART(state, payload) {
      state._isCartOpen = payload;
    },

    SET_DISCOUNT(state, payload) {
      state.discount = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_TOTAL_PRODUCT(state, payload) {
      state.totalProducts = payload;
    },
    ADD_TO_CART(state, payload) {
      state.cart.push(payload);
    },
    REMOVE_CART_ITEM(state, index) {
      state.cart.splice(index, 1);
    },
  },

  actions: {
    applyDiscount({ commit }, discount) {
      commit("SET_DISCOUNT", discount);
    },
    isCartOpen({ commit }, payload) {
      commit("SET_CART", payload);
    },
    getProducts({ commit }, payload) {
      commit("SET_PRODUCTS", payload);
    },
    getProductByName({ state }, name) {
      return state.products.filter((item) => item.name == name);
    },
    addProductToCart({ commit, state }, payload) {
      const isExisting = state.cart.find(
        (cartItem) => cartItem.item.name == payload.item.name
      );
      if (!isExisting) {
        commit("ADD_TO_CART", payload);
        payload.item.isInCart = true;
      } else {
        isExisting.amount += payload.amount;
      }
    },
    deleteCartItem({ state, commit }, payload) {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.item.name == payload.item.name
      );
      const item = state.cart.find(
        (cartItem) => cartItem.item.name == payload.item.name
      );
      item.item.isInCart = false;
      commit("REMOVE_CART_ITEM", index);
    },
    removeProductFromCart({ commit }, payload) {
      commit;
      console.log(payload);
    },
    async getItems({ commit }) {
      const resp = await client.getEntries({
        content_type: "product",
      });

      commit("SET_TOTAL_PRODUCT", resp.total);
      const products = resp.items.map((item) => {
        return { item: item.fields, id: item.sys.id };
      });
      commit("SET_PRODUCTS", products);
    },
    async getProductById({ state }, id) {
      const resp = await client.getEntry(id);
      // console.log(resp);
      state;
      return resp.fields;
    },
  },
  getters: {
    getCartTotalPrice(state) {
      const total = state.cart.reduce((acc, curr) => {
        return (acc += curr.item.price * curr.amount);
      }, 0);

      return (total - total * state.discount).toFixed(2);
    },
    getCartLength(state) {
      return state.cart.length;
    },
    filteredProducts(state) {
      return state.products;
    },
    getDeals(state) {
      return state.products.filter(({ item }) => item.tags.includes("indoor"));
    },
  },
  modules: {},
});
