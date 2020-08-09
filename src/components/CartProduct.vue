<template>
  <div class="cart__product">
    <div class="cart__product_image_container">
      <img
        src="https://images.unsplash.com/photo-1446292532430-3e76f6ab6444?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt
      />
    </div>
    <div class="cart__product_details">
      <div class="cart__product_details_name">
        <span>Product Name</span>
        <span>Price</span>
      </div>
      <Counter />
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Counter";
export default {
  components: {
    Counter,
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