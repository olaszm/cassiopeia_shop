<template>
  <div class="app">
    <div class="main" @click.stop="closeCart">
      <Nav />
      <router-view class="main-content" :key="$route.fullPath" />
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
    ...mapActions(["isCartOpen", "getProducts", "getItems"]),
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
    // axios.get("./items.json").then((res) => {
    //   const { items } = res.data;
    //   this.getProducts(items);
    // });
    this.getItems();
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
  height: 100vh;
  margin: 2rem auto;
}
</style>
