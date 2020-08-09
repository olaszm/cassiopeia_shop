<template>
  <header>
    <nav class="wrapper">
      <ul class="nav">
        <li>
          <i class="fas fa-map-marker-alt icon"></i> City
        </li>
        <router-link class="title" to="/">cassiopeia</router-link>
        <div class="nav__icons">
          <li>
            <i class="fas fa-search icon"></i>
          </li>
          <li>
            <i @click="openCart" class="fas fa-shopping-cart icon"></i>
          </li>
        </div>
      </ul>
    </nav>
    <div class="nav__categories-container">
      <div class="nav__categories-inner">
        <ul>
          <router-link class="title" to="/shop">Shop</router-link>
          <router-link class="title" to="/product/valami">singleproduct</router-link>
          <li>Cactuses</li>
          <li>Accessories</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Nav",
  props: {},
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
      &:hover,
      &:focus {
        color: $grey;
      }
    }
  }
}
</style>
