<template>
  <input :type="type" :placeholder="placeHolderText" ref="input" @input="inputChange" />
</template>

<script>
export default {
  props: {
    placeHolderText: {
      required: true,
    },
    type: {
      default: "text",
    },
  },
  model: {
    prop: "promoCode",
    event: "onChange",
  },
  methods: {
    inputChange() {
      this.$emit("onChange", this.$refs.input.value);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

input {
  height: 100%;
  width: 100%;
  background-color: none;
  border: 1px solid $light-grey;
  border-radius: 4px;
  padding: 0.5em;
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
}
</style>