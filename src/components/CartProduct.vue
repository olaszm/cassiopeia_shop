<template>
  <transition name="slide-in">
    <div class="cart__product">
      <router-link :to="`/product/${item.id}`">
        <div class="cart__product_image_container">
          <img :src="item.src.fields.file.url" alt />
        </div>
      </router-link>
      <div class="cart__product_details">
        <div class="cart__product_details_name">
          <span>{{item.name}}</span>
          <span>{{item.price}}</span>
        </div>
        <Counter :value="getProductAmount(item.id)" :id="item.id" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Counter from "@/components/Counter";
export default {
  props: ["item"],
  components: {
    Counter,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["deleteCartItem", "changeProductAmount"]),
  },
  computed: {
    ...mapGetters(["getProductAmount"]),
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.cart__product {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  place-items: start;
  gap: 1rem;
  margin: 1.5rem 0;
  .cart__product_details {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .cart__product_details_name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      margin-bottom: 2rem;
      @media (max-width: $mobile) {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 0;
        span {
          &:last-child {
            margin: 0.5em 0;
          }
        }
      }
      span {
        display: inline-block;
      }
    }
  }
  .cart__product_image_container {
    height: 100%;
    width: 100%;
    img {
      height: 150px;
      width: 150px;
      object-fit: cover;
      @media (max-width: $mobile) {
        height: 90px;
        width: 90px;
      }
    }
  }
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}
.slide-in-enter, .slide-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>