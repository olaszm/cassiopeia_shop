<template>
  <div class="radio__container" :class="{'radio__container-selected' : active == title}">
    <label class="radio">
      <span class="radio__input">
        <input type="radio" name="radio" :value="title" @click="updateActiveDelivery" />
        <span class="radio__control"></span>
      </span>
      <span class="radio__label">
        <span>{{title}}</span>
        <span>{{price}}</span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: "activeDelivery",
    event: "updateDelivery",
  },

  props: ["title", "price", "value", "active"],
  data() {
    return {};
  },
  methods: {
    updateActiveDelivery() {
      this.$emit("updateDelivery", this.value);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.radio__container {
  border: 1px solid $light-grey;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  padding: 0.5em 1em;
  height: 60px;
  width: 100%;
  margin: 1rem 0;
}

.radio__container-selected {
  border: 1px solid $primary;
}

.radio {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  width: 100%;
  .radio__input {
    display: flex;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .radio__control {
      display: grid;
      place-items: center;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 0.1em solid $primary;
      transform: translateY(0.05em);
    }
    input + .radio__control::before {
      content: "";
      width: 0.45em;
      height: 0.45em;
      background-color: $primary;
      border-radius: 50%;
      transition: 180ms transform ease-in-out;
      transform: scale(0);
    }
    input:checked + .radio__control::before {
      transform: scale(1);
    }
  }
  .radio__label {
    display: flex;
    width: 100%;
    justify-content: space-between;
    line-height: 1;
  }
}
</style>