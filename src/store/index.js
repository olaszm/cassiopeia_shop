import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import client from "@/plugins/contentful";

export default new Vuex.Store({
  state: {
    product: {},
    _isCartOpen: false,
    products: [],
    cart: [],
    totalProducts: 0,
    discount: 0,
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
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_CART_PRODUCT_AMOUNT(state, { index, amount }) {
      state.cart[index] = Object.assign({}, state.cart[index], { amount });
      state.cart = [...state.cart];
    },
  },

  actions: {
    changeProductAmount({ commit, state }, payload) {
      const index = state.cart.findIndex((item) => item.id == payload.id);
      commit("SET_CART_PRODUCT_AMOUNT", { index, amount: payload.amount });
    },
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
        (cartItem) => cartItem.id == payload.id
      );

      if (!isExisting) {
        commit("ADD_TO_CART", payload);
      }
    },
    deleteCartItem({ state, commit }, payload) {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.name == payload.name
      );
      commit("REMOVE_CART_ITEM", index);
    },

    async getItems({ commit }) {
      const resp = await client.getEntries({
        content_type: "product",
      });

      commit("SET_TOTAL_PRODUCT", resp.total);
      const products = resp.items.map((item) => {
        item.fields.id = item.sys.id;
        return item.fields;
      });
      commit("SET_PRODUCTS", products);
    },
    async getProductById({ getters, commit }, id) {
      const item = getters.getProductById(id);

      if (item) {
        commit("SET_PRODUCT", item);
        return item;
      } else {
        const resp = await client.getEntry(id);
        resp.fields.id = resp.sys.id;
        commit("SET_PRODUCT", resp.fields);
        return resp.fields;
      }
    },
  },
  getters: {
    getCartTotalPrice: (state) => {
      const total = state.cart.reduce((acc, curr) => {
        return (acc += curr.price * curr.amount);
      }, 0);
      return (total - total * state.discount).toFixed(2);
    },
    getCartLength(state) {
      return state.cart.length;
    },
    getDeals(state) {
      return state.products.filter((item) => item.tags.includes("indoor"));
    },
    getProductById: (state) => (id) => {
      return state.products.find((item) => item.id === id);
    },
    isInCart: (state) => (id) => {
      const prod = state.cart.find((item) => item.id === id);
      return prod ? true : false;
    },
  },
  modules: {},
});
