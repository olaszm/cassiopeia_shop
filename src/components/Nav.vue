<template>
  <header>
    <nav class="wrapper">
      <ul class="nav">
        <li><i class="fas fa-map-marker-alt"></i>London</li>
        <router-link class="title" to="/">cassiopeia</router-link>
        <div class="nav__icons">
          <li>
            <i
              @click="openCart"
              class="fas fa-shopping-cart icon cart-icon"
              :data-cartItems="getCartLength"
            ></i>
          </li>
        </div>
      </ul>
    </nav>
    <div class="nav__categories-container">
      <div class="nav__categories-inner">
        <ul>
          <router-link class="title" to="/shop/plants">Shop</router-link>
          <router-link class="title" to="/about">About</router-link>
          <router-link class="title" to="/find-us">Find Us</router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Nav",
  props: {},
  computed: {
    ...mapGetters(["getCartLength"]),
  },
  methods: {
    ...mapActions(["isCartOpen"]),
    openCart() {
      this.isCartOpen(true);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/style/_variables.scss";

// .router-link {

// }

.router-link-exact-active {
  font-weight: 500;
  text-shadow: $box-shadow;
  transition: all 300ms ease;
  transform: scale(1.2);
  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 1px;
    width: 100%;
    margin: 0 auto;
    background-color: $black;
    transition: transform 300ms ease;
  }
}

.nav,
.nav__icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav {
  margin-top: 2rem;
  font-weight: bold;
  i {
    margin-right: 0.875rem;
  }
  .title {
    font-size: 1.2rem;
    text-transform: uppercase;
  }
}

.nav__icons {
  i {
    margin: 0 1rem;
  }
}

.cart-icon {
  position: relative;
  &::after {
    content: attr(data-cartItems);
    position: absolute;
    bottom: -50%;
    right: -50%;
    transform-origin: center center;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    font-weight: 400;
    font-size: 8px;
    background-color: $primary;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0.25em;
  }
}

.nav__categories-inner {
  // background-color: black;
  height: 100px;
  display: grid;
  place-items: center;
  ul {
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    li,
    a {
      margin: 0 0.5em;
      cursor: pointer;
      &:hover {
        color: $grey;
      }
    }
  }
}
</style>
