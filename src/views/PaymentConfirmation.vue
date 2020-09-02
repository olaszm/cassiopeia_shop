<template>
  <div class="confirmation wrapper">
    <div class="confirmation__inner">
      <h3 class="confirmation__inner__title">Succesfull payment!</h3>

      <div class="confirmation__inner__text">
        <p>Thank you for your purchase!</p>
        <p>Your payment of £{{this.$route.params.price / 100}} was succesfully completed</p>
      </div>

      <router-link to="/">
        <BaseButton class="btn-fill btn-wide">
          <h3 slot="button-text">Take me to the home page</h3>
        </BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseButton,
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.confirmation {
  &__inner {
    display: grid;
    place-items: center;
    text-align: center;
    &__title {
      font-size: 2.5rem;
      color: $primary;
      margin: 2rem 0;
    }
    &__text {
      font-size: 1.25rem;
      margin: 1em 0;
      p {
        margin: 0.25em;
      }
    }
    button {
      margin-top: 2rem;
    }
  }
}
</style>