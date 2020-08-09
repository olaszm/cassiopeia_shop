<template>
  <input type="text" :placeholder="placeHolderText" />
</template>

<script>
export default {
  props: ["placeHolderText"],
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

input {
  height: 100%;
  width: 80%;
  background-color: none;
  border: 1px solid $light-grey;
  border-radius: 4px;
  padding: 0.5em;
  margin: 1rem 0;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  margin-right: 1.5rem;
  &:focus {
    border: 1px solid $primary;
    outline: none;
  }
}
</style>