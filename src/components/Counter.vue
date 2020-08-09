<template>
  <div class="counter">
    <span class="count-btn">-</span>
    <span>1</span>
    <span class="count-btn">+</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";
.counter {
  margin: 1rem 0;
  .count-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.875rem;
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    width: 24px;
    border-radius: 50%;
    background-color: $light-grey;
    color: $primary;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>