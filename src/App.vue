<template>
  <div id="app" class="app">
    <div class="main" @click.stop="closeCart">
      <Nav />
      <transition name="fade" mode="out-in">
        <router-view class="main-content" :key="$route.fullPath" />
      </transition>
      <Footer />
    </div>
    <Cart />
  </div>
</template>

<script>
// import axios from "axios";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Nav,
    Footer,
    Cart,
  },
  computed: {
    ...mapState(["_isCartOpen"]),
  },
  methods: {
    ...mapActions([
      "isCartOpen",
      "getProducts",
      "getItems",
      "getCartItemsFromLocalStorage",
    ]),
    closeCart(e) {
      if (
        !e.target.className.includes("fa-shopping-cart") &&
        this._isCartOpen
      ) {
        this.isCartOpen(false);
      }
    },
  },
  created() {
    this.getItems({ type: "product" });
    this.getCartItemsFromLocalStorage();
  },
};
</script>

<style lang="scss">
@import "@/style/main.scss";

main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 100%;
}

.main-content {
  min-height: 100vh;
  margin: 2rem auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>
