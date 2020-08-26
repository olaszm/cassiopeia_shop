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
    _isDiscountUsed: false,
    priceOrder: "",
    delivery: {
      title: "",
      price: 0,
    },
    skip: 0,
  },
  mutations: {
    SET_CART(state, payload) {
      state._isCartOpen = payload;
    },

    SET_DISCOUNT(state, payload) {
      state.discount = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = [...state.products, ...payload];
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
    SET_PRICE_ORDER(state, payload) {
      state.priceOrder = payload;
    },
    SET_DELIVERY(state, payload) {
      state.delivery = payload;
    },
    SET_IS_DISCOUNT_USED(state, payload) {
      state._isDiscountUsed = payload;
    },
  },

  actions: {
    changeProductAmount({ commit, state }, payload) {
      const index = state.cart.findIndex((item) => item.id == payload.id);
      commit("SET_CART_PRODUCT_AMOUNT", { index, amount: payload.amount });
    },
    applyDiscount({ commit }, discount) {
      commit("SET_IS_DISCOUNT_USED", true);
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
    setDelivery({ commit }, payload) {
      commit("SET_DELIVERY", payload);
    },
    deleteCartItem({ state, commit }, id) {
      const index = state.cart.findIndex((cartItem) => cartItem.id == id);
      commit("REMOVE_CART_ITEM", index);
    },
    async getItems(
      { commit, state },
      { type = "product", order = "sys.createdAt" }
    ) {
      const resp = await client.getEntries({
        content_type: type,
        order: order,
        skip: state.products.length,
        limit: 5,
      });

      commit("SET_PRICE_ORDER", "");
      commit("SET_TOTAL_PRODUCT", resp.total);
      const products = resp.items.map((item) => {
        item.fields.createdAt = new Date(item.sys.createdAt);
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
        item.fields.createdAt = new Date(item.sys.createdAt);
        resp.fields.id = resp.sys.id;
        commit("SET_PRODUCT", resp.fields);
        return resp.fields;
      }
    },
    changePriceOrder({ commit }, payload) {
      commit("SET_PRICE_ORDER", payload);
    },
  },
  getters: {
    getCartTotalPrice: (state) => {
      const total = state.cart.reduce((acc, curr) => {
        return (acc += curr.price * curr.amount);
      }, 0);
      return (
        total +
        Number(state.delivery.price) -
        total * state.discount
      ).toFixed(2);
    },
    getCartLength(state) {
      return state.cart.length;
    },
    filteredProducts: (state) => {
      switch (state.priceOrder) {
        case "lowToHigh":
          return state.products.sort((a, b) => a.price - b.price);
        case "highToLow":
          return state.products.sort((a, b) => b.price - a.price);
        case "newest":
          return state.products.sort((a, b) => b.createdAt - a.createdAt);
        case "oldest":
          return state.products.sort((a, b) => a.createdAt - b.createdAt);
        default:
          return state.products;
      }
    },
    getDelivery: (state) => {
      return Number(state.delivery.price);
    },
    getDiscount: (state, getters) => {
      return (getters.getCartTotalPrice * state.discount).toFixed(2);
    },
    getDeals: (state) => (query) => {
      return state.products
        .filter((item) => item.tags.includes(query))
        .slice(0, 3);
    },
    getProductById: (state) => (id) => {
      return state.products.find((item) => item.id === id);
    },
    isInCart: (state) => (id) => {
      const prod = state.cart.find((item) => item.id === id);
      return prod ? true : false;
    },
    getProductAmount: (state) => (id) => {
      const prod = state.cart.find((item) => item.id === id);

      return prod.amount;
    },
    isDiscountUsed: (state) => {
      return state._isDiscountUsed;
    },
  },
  modules: {},
});
