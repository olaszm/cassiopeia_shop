<template>
  <div class="wrapper">
    <div class="checkout__inner">
      <div class="checkout__form">
        <form action>
          <fieldset>
            <legend>Delivery method</legend>
            <label for>Amazon</label>
            <input type="radio" name="amazon" id="amazon" />
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <BaseInput placeholder="City" />
            <BaseInput placeholder="Street" />
            <BaseInput placeholder="House Number" />
            <BaseInput placeholder="Post code" />
          </fieldset>
        </form>
      </div>
      <div class="checkout__product_summary">
        <h3>Order Total: 2</h3>
        <CartProduct />
        <div class="cart__price_total">
          <span>Total:</span>
          <span>£150</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import CartProduct from "@/components/CartProduct";
export default {
  components: {
    BaseInput,
    CartProduct,
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.checkout__inner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 5rem;
  .checkout__form {
    width: 50%;
  }
}

.cart__price_total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: right;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    //   bottom: -25px;
    left: 0;
    top: -15px;
    height: 1px;
    width: 100%;
    margin: 0 auto;
    opacity: 0.4;
    background-color: $grey;
  }
}
</style>