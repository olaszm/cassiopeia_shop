<template>
  <div>
    <stripe-elements
      :pk="publishableKey"
      :amount="amount"
      locale="en"
      @token="tokenCreated"
      @loading="loading = $event"
      :styleObject="styles"
      hidePostalCode="true"
    />
  </div>
</template>

<script>
import { StripeElements } from "vue-stripe-checkout";
export default {
  components: {
    StripeElements,
  },
  data() {
    return {
      styles: {
        base: {
          iconColor: "#595cff",
          color: "black",
          fontWeight: 600,
          backgroundColor: "transparent",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#595cff",
          },
          "::placeholder": {
            color: "#afb1bd",
            fontWeight: 600,
          },
          "::selection": {
            backgroundColor: "#f9f9fb",
          },
          ":focus": {
            iconColor: "#595cff",
          },
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE",
        },
      },
      amount: 1000,
      loading: false,
      token: null,
      charge: null,
      publishableKey:
        "pk_test_51HGQmJF3taK9EUdAS1170CzCc7bsaEh16jCnNa4Z8tMWf946mSBORTGRyklB2DxvtxzRfLfWf5noywd5cZCI81Bg00MvCyGKqh",
    };
  },
  methods: {
    tokenCreated(token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description, // optional description that will show up on stripe when looking at payments
      };
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer(charge) {
      console.log(charge);
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
</style>
