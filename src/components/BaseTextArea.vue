<template>
  <textarea
    :cols="colSize"
    :placeholder="placeHolderText"
    ref="input"
    :required="isRequired"
    @input="inputChange"
  />
</template>

<script>
export default {
  props: {
    isRequired: {
      type: Boolean,
    },
    placeHolderText: {
      required: true,
    },
    name: {},
    colSize: {
      default: 30,
      type: Number,
    },
  },
  model: {
    prop: "promoCode",
    event: "onChange",
  },
  methods: {
    inputChange() {
      this.$emit("onChange", {
        value: this.$refs.input.value,
        inputName: this.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

textarea {
  height: 100%;
  width: 100%;
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
  resize: none;
  &:focus {
    border: 1px solid $primary;
    outline: none;
  }
  &::placeholder {
    color: grey;
  }
  &::invalid {
    border-color: $invalid;
    color: $invalid;
  }
}
</style>
