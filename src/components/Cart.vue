<template>
  <transition name="slide-in">
    <div v-if="_isCartOpen" class="cart__container">
      <div class="cart__inner">
        <div class="cart__header">
          <h3>Your Cart</h3>
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
            <BaseInput placeholder="Use IAMBROKE for 10% off" v-model="promoCode" />
            <BaseButton class="btn-outline" @click.native="applyDisc">
              <h3 slot="button-text">Apply</h3>
            </BaseButton>
          </div>
          <div class="cart__price_total">
            <span>Total:</span>
            <span>£{{getCartTotalPrice}}</span>
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
    ...mapGetters(["getCartTotalPrice", "getCartLength"]),
    ...mapState(["_isCartOpen", "cart"]),
    createRandomID() {
      return Math.floor(Math.random() * 1000);
    },
  },
  methods: {
    ...mapActions(["isCartOpen", "applyDiscount"]),
    applyDisc() {
      if (this.promoCode === "IAMBROKE") {
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

<style lang='scss' scoped >
@import "@/style/_variables.scss";
.cart__container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: white;
  width: 30%;
  box-shadow: -5px 10px 50px rgba($color: black, $alpha: 0.3);
  transition: all 300ms ease-in;
}

.cart__inner {
  width: 90%;
  height: 100%;
  margin: 3rem auto;
  .cart__header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 5rem;
    h3 {
      font-size: 2rem;
    }
    i {
      font-size: 1.275rem;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -25px;
      height: 1px;
      width: 100%;
      margin: 0 auto;
      opacity: 0.4;
      background-color: $grey;
    }
  }
}

.cart__footer {
  //   display: flex;
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
  .cart__discount {
    margin: 4rem 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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