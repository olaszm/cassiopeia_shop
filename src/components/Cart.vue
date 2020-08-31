<template>
  <transition name="slide-in">
    <div v-if="_isCartOpen" class="cart__container">
      <div class="cart__inner">
        <div class="cart__header">
          <h3>Your Cart ({{ getCartLength }})</h3>
          <i @click="closeModal" class="fas fa-times icon"></i>
        </div>

        <div class="cart__content" v-if="cart.length">
          <CartProduct v-for="(item, index) in cart" :key="index" :item="item" />
        </div>
        <div v-else class="cart__content">
          <h3>Cart is empty</h3>
        </div>
        <div class="cart__footer">
          <div class="cart__discount">
            <BaseInput placeHolderText="Use IAMBROKE for 10% off" v-model="promoCode" />
            <BaseButton class="btn-outline" @click.native="applyDisc" :disabled="isDiscountUsed">
              <h3 slot="button-text">Apply</h3>
            </BaseButton>
          </div>
          <div class="cart__price">
            <div class="cart__price__delivery" v-if="getDelivery > 0">
              <span>Delivery</span>
              <span>£{{ getDelivery }}</span>
            </div>
            <div class="cart__price__discount" v-if="isDiscountUsed">
              <span>Discount</span>
              <span>-£{{ getDiscount }}</span>
            </div>
            <div class="cart__price__total">
              <span>Total:</span>
              <span>£{{ getCartTotalPrice }}</span>
            </div>
          </div>
          <div class="cart__checkout">
            <BaseButton class="btn-fill btn-wide" @click.native="checkOut">
              <h3 slot="button-text">Checkout</h3>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import CartProduct from "@/components/CartProduct.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
export default {
  components: {
    CartProduct,
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      promoCode: "",
    };
  },
  computed: {
    ...mapGetters([
      "getCartTotalPrice",
      "getCartLength",
      "getDelivery",
      "isDiscountUsed",
      "getDiscount",
    ]),
    ...mapState(["_isCartOpen", "cart"]),
    createRandomID() {
      return Math.floor(Math.random() * 1000);
    },
  },
  methods: {
    ...mapActions(["isCartOpen", "applyDiscount"]),
    applyDisc() {
      if (this.promoCode.value === "IAMBROKE") {
        this.applyDiscount(0.1);
      }
    },
    closeModal() {
      this.isCartOpen(false);
    },
    checkOut() {
      this.$router.push(`/checkout/${this.createRandomID}`);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.cart__container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background: white;
  min-width: 450px;
  width: 35%;
  box-shadow: -5px 10px 50px rgba($color: black, $alpha: 0.3);
  transition: all 300ms ease-in;

  @media (max-width: $mobile) {
    width: 100%;
    min-width: unset;
  }
}

.cart__inner {
  width: 85%;
  margin: 3rem auto;
  height: 100%;
  @media (max-width: $mobile) {
    margin: 1rem auto;
  }
  .cart__header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    h3 {
      font-size: 2rem;
    }
    i {
      font-size: 1.275rem;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      height: 1px;
      width: 100%;
      margin: 0 auto;
      opacity: 0.4;
      background-color: $grey;
    }

    @media (max-width: $mobile) {
      h3 {
        font-size: 1.2rem;
      }
      i {
        font-size: 1rem;
      }
    }
  }
  .cart__content {
    height: 300px;
    margin: 1.2rem 0;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      visibility: hidden;
    }
    @media (max-width: $mobile) {
      height: 220px;
    }
  }
}

.cart__footer {
  margin: 2rem 0;
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
    }
    .cart__price__total {
      font-size: 1.2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: -6px;
        height: 1px;
        width: 100%;
        margin: 0 auto;
        opacity: 0.4;
        background-color: $grey;
      }
    }
  }
  .cart__discount {
    margin: 1rem 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    input,
    button {
      height: 40px;
    }
    @media (min-width: $widescreen) {
      flex-wrap: nowrap;
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
