<template>
  <div class="wrapper">
    <div class="checkout__inner">
      <div class="checkout__form">
        <div class="checkout__progress"></div>

        <form action ref="form" @submit.prevent>
          <fieldset>
            <legend>Delivery method</legend>
            <BaseSelectInput
              title="DHL"
              price="Free"
              value="DHL"
              details="3-5 working days"
              v-model="activeDelivery"
              :active="activeDelivery"
              isChecked="true"
            />
            <BaseSelectInput
              title="Hermex"
              price="4.99"
              details="Next Day delivery"
              value="Hermex"
              v-model="activeDelivery"
              :active="activeDelivery"
            />
          </fieldset>
          <fieldset>
            <legend>Delivery address</legend>
            <BaseInput placeHolderText="Name" @onChange="test" name="name" isRequired />

            <BaseInput placeHolderText="Email address" @onChange="test" name="email" isRequired />
            <BaseInput placeHolderText="City" @onChange="test" name="city" isRequired />
            <BaseInput placeHolderText="Post code" @onChange="test" name="postCode" isRequired />
          </fieldset>
        </form>

        <div ref="card"></div>
        <div class="information">
          <p>
            This is a sandbox payment account, for a succesfull payment please
            use the following card number with any CVC, expiration date:
          </p>
          <p>4242 4242 4242 4242</p>
        </div>
        <div class="error-container" ref="errorEl"></div>
        <div class="checkout__buttons">
          <router-link to="/shop/plants">
            <BaseButton class="btn-outline btn-wide">
              <h3 slot="button-text">Continue Shopping</h3>
            </BaseButton>
          </router-link>

          <BaseButton
            class="btn-fill btn-wide"
            @click.native="pay"
            :disabled="this.loading || this.cart.length == 0"
          >
            <h3 slot="button-text">{{ !this.loading ? "Payment" : "..." }}</h3>
          </BaseButton>
        </div>
      </div>
      <div class="checkout__product__summary">
        <div class="checkout__product__items">
          <h3>Total items: {{ getCartLength }}</h3>
          <CartProduct v-for="(item, index) in cart" :key="index" :item="item" />
        </div>
        <div class="cart__price">
          <div class="cart__price__delivery">
            <span>Delivery</span>
            <span>£{{ activeDelivery.price }}</span>
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
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseSelectInput from "@/components/BaseSelectInput";
import axios from "axios";
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
    return {
      form: {},
      loading: false,
      clientS: "",
      stripe: "",
      activeDelivery: {
        name: "DHL",
        price: 0,
      },
      elements: "",
      card: "",
      style: {
        base: {
          color: "grey",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
  },
  watch: {
    activeDelivery(newVal) {
      this.setDelivery(newVal);
    },
  },
  methods: {
    ...mapActions(["setDelivery", "clearCart"]),
    test(e) {
      this.form[e.inputName] = e.value;
    },
    stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = this.$refs.form;
      var hiddenInput = document.createElement("input");
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", "stripeToken");
      hiddenInput.setAttribute("value", token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      this.stripe
        .confirmCardPayment(this.clientS, {
          payment_method: {
            card: this.card,
            billing_details: {
              address: {
                city: this.form.city,
                postal_code: this.form.postCode,
              },
              name: this.form.name,
              email: this.form.email,
            },
          },
        })
        .then((res) => {
          if (res.error) {
            this.sendErrorMessage(res.error.message);
            this.loading = false;
          } else {
            if (res.paymentIntent.status === "succeeded") {
              this.loading = false;
              this.clearCart();
              const { amount, created } = res.paymentIntent;
              this.$router.push(`/payment-confirm/${amount}/${created}`);
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        });
    },

    pay() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.city &&
        this.form.postCode
      ) {
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            // Inform the user if there was an error.
            this.sendErrorMessage(result.error);
          } else {
            this.sendErrorMessage("");
            this.inputErrorDisplay(false);
            // Send the token to your server.
            this.stripeTokenHandler(result.token);
            this.loading = true;
          }
        });
      } else {
        this.sendErrorMessage("Please fill out every field!");
        this.inputErrorDisplay(true);
      }
    },
    sendErrorMessage(txt) {
      let errorElement = this.$refs.errorEl;
      errorElement.textContent = txt;
    },
    inputErrorDisplay(state) {
      const inputs = document.querySelectorAll("input");

      inputs.forEach((input) => {
        if (state) {
          input.classList.add("StripeElement--invalid");
        } else {
          input.classList.remove("StripeElement--invalid");
        }
      });
    },
  },
  computed: {
    ...mapState(["cart", "delivery", "_isDiscountUsed"]),
    ...mapGetters([
      "getCartTotalPrice",
      "getCartLength",
      "getDiscount",
      "isDiscountUsed",
    ]),
  },
  created() {
    loadStripe(
      "pk_test_51HGQmJF3taK9EUdAS1170CzCc7bsaEh16jCnNa4Z8tMWf946mSBORTGRyklB2DxvtxzRfLfWf5noywd5cZCI81Bg00MvCyGKqh"
    )
      .then((result) => {
        this.stripe = result;
        this.elements = result.elements();
        this.card = this.elements.create("card", {
          style: this.style,
          hidePostalCode: true,
        });
        this.card.mount(this.$refs.card);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .post("/create-payment-intent", {
        items: this.cart,
        discount: this._isDiscountUsed,
        delivery: this.delivery,
      })
      .then((res) => {
        this.clientS = res.data.clientSecret;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.checkout__inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 5rem;
  @media (max-width: $tablet) {
    flex-direction: column;
    gap: 0;
  }
}

.checkout__form {
  flex: 1;
  order: 2;
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
      &:first-child {
        margin-right: 0;
      }
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
  padding: 1rem 1rem;
  border-radius: 4px;
  .checkout__product__items {
    padding-right: 2rem;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
  }
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

.information {
  color: $grey;
  font-size: 14px;
  p {
    &:last-child {
      margin-top: 0.5em;
    }
  }
}

.error-container {
  color: $invalid;
}

.StripeElement {
  height: 45px;
  width: 100%;
  border: 1px solid $light-grey;
  border-radius: 4px;
  padding: 0.875em 0.5em;
  margin: 1rem 0;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: $snow;
  margin-right: 1.5rem;
  position: relative;
  &:focus {
    border: 1px solid $primary;
    outline: none;
  }
  &--focus {
    border: 1px solid $primary;
    outline: none;
  }
  &--invalid {
    border: 1px solid $invalid;
  }
}
</style>
