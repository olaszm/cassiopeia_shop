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
              price="5.99"
              value="DHL"
              v-model="activeDelivery"
              :active="activeDelivery"
            />
            <BaseSelectInput
              title="Hermex"
              price="4.99"
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
          <router-link to="/shop/plants">
            <BaseButton class="btn-outline btn-wide">
              <h3 slot="button-text">Continue Shopping</h3>
            </BaseButton>
          </router-link>
          <router-link to="/">
            <BaseButton class="btn-fill btn-wide">
              <h3 slot="button-text">Payment</h3>
            </BaseButton>
          </router-link>
        </div>
      </div>
      <div class="checkout__product__summary">
        <div class="checkout__product__items">
          <h3>Total items: {{getCartLength}}</h3>
          <CartProduct v-for="(item, index) in cart" :key="index" :item="item" />
        </div>
        <div class="cart__price">
          <div class="cart__price__delivery">
            <span>Delivery</span>
            <span>£{{activeDelivery.price}}</span>
          </div>
          <div class="cart__price__discount" v-if="isDiscountUsed">
            <span>Discount</span>
            <span>-£{{getDiscount}}</span>
          </div>
          <div class="cart__price__total">
            <span>Total:</span>
            <span>£{{getCartTotalPrice}}</span>
          </div>
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
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    BaseInput,
    CartProduct,
    BaseSelectInput,
    BaseButton,
  },
  data() {
    return { activeDelivery: this.$store.state.delivery };
  },
  watch: {
    activeDelivery(newVal) {
      this.setDelivery(newVal);
    },
  },
  methods: {
    ...mapActions(["setDelivery"]),
  },
  computed: {
    ...mapState(["cart", "delivery"]),
    ...mapGetters([
      "getCartTotalPrice",
      "getCartLength",
      "getDiscount",
      "isDiscountUsed",
    ]),
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
  @media (max-width: $tablet) {
    flex-direction: column;
    gap: 0;
  }
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
  @media (max-width: $tablet) {
    order: 2;
  }
}

.checkout__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  position: relative;
  button,
  a {
    &:first-child {
      margin-right: 1rem;
    }
  }
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

  @media (max-width: $mobile) {
    flex-wrap: wrap;
    justify-content: center;
    button,
    a {
      margin: 1rem 0;
      width: 100%;
      height: 35px;
    }
  }
}

.checkout__product__summary {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid $light-grey;
  padding: 2rem 2rem;
  border-radius: 4px;
}

.cart__price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;

  font-weight: 500;
  text-align: right;
  position: relative;

  & > div {
    display: flex;
    font-size: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.5em 0;
    &:last-child {
      font-size: 1.2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: -10px;
        height: 1px;
        width: 100%;
        margin: 0 auto;
        opacity: 0.4;
        background-color: $grey;
      }
    }
  }
}
</style>