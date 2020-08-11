<template>
  <div class="counter">
    <span class="count-btn" @click="decrementCounter">-</span>
    <span>{{counter}}</span>
    <span class="count-btn" @click="incrementCounter">+</span>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      counter: this.$props.value,
    };
  },
  methods: {
    decrementCounter() {
      if (this.counter >= 1) {
        this.counter--;
        this.$emit("updateItemCount", this.counter);
      }
    },
    incrementCounter() {
      this.counter++;
      this.$emit("updateItemCount", this.counter);
    },
  },
  model: {
    prop: "itemCount",
    event: "updateItemCount",
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";
.counter {
  margin: 1rem 0;
  .count-btn {
    cursor: pointer;
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