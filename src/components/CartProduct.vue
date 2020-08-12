<template>
  <div class="cart__product">
    <div class="cart__product_image_container">
      <img :src="item.item.src.fields.file.url" alt />
    </div>
    <div class="cart__product_details">
      <div class="cart__product_details_name">
        <span>{{item.item.name}}</span>
        <span>{{item.item.price}}</span>
      </div>
      <keep-alive>
        <Counter :value="item.amount" v-model="itemAmount" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Counter from "@/components/Counter";
export default {
  props: ["item"],
  components: {
    Counter,
  },
  data() {
    return {
      itemAmount: 0,
    };
  },
  methods: {
    ...mapActions(["deleteCartItem"]),
  },
  watch: {
    itemAmount(newVal) {
      this.item.amount = newVal;
      if (newVal === 0) {
        this.deleteCartItem(this.item);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
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
    }
  }
}
</style>