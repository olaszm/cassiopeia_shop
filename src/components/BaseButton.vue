<template>
  <button class="btn">
    <slot name="button-text"></slot>
    <slot name="button-icon"></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

button {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-template-columns: 1fr;
  padding: 0.8em 2.5em;
  outline: none;
  border: none;
  border-radius: 4px;
  transition: all 250ms ease;
  white-space: nowrap;
  cursor: pointer;
  &:focus {
    box-shadow: 3px 7px 15px rgba(0, 0, 0, 0.3);
    color: none;
    background-color: none;
    outline: none;
  }
  &:hover {
    box-shadow: 3px 7px 15px rgba(0, 0, 0, 0.3);
  }
  &:disabled {
    cursor: unset;
    background-color: $grey;
    box-shadow: none;
  }
}

.btn {
  &-fill {
    color: $white;
    background-color: $primary;
  }
  &-outline {
    color: $primary;
    background-color: $white;
    border: 1px solid $primary;
  }
  &-wide {
    padding-left: 3em;
    padding-right: 3em;
  }
  &-circle {
    color: white;
    padding: 0;
    border-radius: 50%;
  }
  &-invalid {
    background-color: $invalid;
  }
}
</style>
