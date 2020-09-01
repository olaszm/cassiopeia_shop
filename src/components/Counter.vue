<template>
  <div class="counter" ref="el">
    <button v-if="!isAmountOne" class="count-btn" @click="decrementCounter">-</button>
    <button v-else class="count-btn" @click="decrementCounter">
      <i class="fas fa-trash trash-icon"></i>
    </button>
    <span>{{counter}}</span>
    <button class="count-btn" @click="incrementCounter">+</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["value", "id"],
  data() {
    return {
      isParentCart: false,
      counter: this.$props.value,
    };
  },
  methods: {
    ...mapActions(["deleteCartItem", "changeProductAmount"]),
    decrementCounter() {
      if (this.counter > 1) {
        this.counter--;
        this.changeProductAmount({ id: this.id, amount: this.counter });
        this.$emit("updateItemCount", this.counter);
      } else {
        this.deleteCartItem(this.id);
      }
    },
    incrementCounter() {
      this.counter++;
      this.changeProductAmount({ id: this.id, amount: this.counter });
      this.$emit("updateItemCount", this.counter);
    },
  },
  computed: {
    isAmountOne() {
      if (this.counter <= 1 && this.isParentCart) {
        return true;
      } else {
        return false;
      }
    },
  },
  model: {
    prop: "itemCount",
    event: "updateItemCount",
  },
  mounted() {
    this.isParentCart = this.$refs.el.parentNode.className.includes("cart");
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.red-bg {
  background: $invalid;
}

.counter {
  margin: 1rem 0;
  .count-btn {
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.85rem;
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
    &:focus {
      border: 1px solid $primary;
      outline: none;
    }
  }
}

.trash-icon {
  font-size: 0.95rem;
  color: $invalid;
}
</style>