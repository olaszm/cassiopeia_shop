<template>
  <div class="wrapper">
    <div class="checkout__inner">
      <div class="checkout__form">
        <div class="checkout__progress"></div>

        <form action>
          <fieldset>
            <legend>Delivery method</legend>
            <BaseSelectInput
              title="DHL"
              price="£5.99"
              value="DHL"
              v-model="activeDelivery"
              :active="activeDelivery"
            />
            <BaseSelectInput
              title="Hermex"
              price="£4.99"
              value="Hermex"
              v-model="activeDelivery"
              :active="activeDelivery"
            />
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <BaseInput placeholder="City" />
            <BaseInput placeholder="Street" />
            <BaseInput placeholder="House Number" />
            <BaseInput placeholder="Post code" />
          </fieldset>
        </form>
        <div class="checkout__buttons">
          <BaseButton class="btn-outline btn-wide">
            <h3 slot="button-text">Back</h3>
          </BaseButton>
          <BaseButton class="btn-fill btn-wide">
            <h3 slot="button-text">Payment</h3>
          </BaseButton>
        </div>
      </div>
      <div class="checkout__product_summary">
        <div class="checkout__product__items">
          <h3>Total items: {{getCartLength}}</h3>
          <CartProduct v-for="(item, index) in cart" :key="index" :item="item" />
        </div>
        <div class="cart__price_total">
          <span>Total:</span>
          <span>£{{getCartTotalPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
import BaseSelectInput from "@/components/BaseSelectInput";
import CartProduct from "@/components/CartProduct";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    BaseInput,
    CartProduct,
    BaseSelectInput,
    BaseButton,
  },
  data() {
    return { activeDelivery: "" };
  },
  methods: {
    onChange() {
      console.log(this.getChecked);
      // const container = e.target.parentNode.parentNode.parentNode
      // container.classList.toggle("radio__container-selected");
    },
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["getCartTotalPrice", "getCartLength"]),
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
}

.checkout__form {
  flex: 1;
  form {
    margin: 0;
    padding: 0;
    fieldset {
      margin: 0;
      padding: 0;
      border: none;
    }
    legend {
      font-weight: 500;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    input {
      height: 45px;
    }
  }
}

.checkout__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -20px;
    height: 1px;
    width: 100%;
    margin: 0 auto;
    opacity: 0.4;
    background-color: $grey;
  }
}

.checkout__product_summary {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid $light-grey;
  padding: 2rem 2rem;
  border-radius: 4px;
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