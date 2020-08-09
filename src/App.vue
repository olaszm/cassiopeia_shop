<template>
  <div class="app">
    <div class="main" @click.stop="closeCart">
      <Nav />
      <router-view class="main-content" />
      <Footer />
    </div>
    <Cart />
  </div>
</template>

<script>
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
    ...mapActions(["isCartOpen"]),
    closeCart(e) {
      if (!e.target.className.includes("fa-shopping-cart")) {
        this.isCartOpen(false);
      }
    },
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
