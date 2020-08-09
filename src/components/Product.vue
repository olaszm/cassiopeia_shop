<template>
  <div class="product">
    <div class="product__image">
      <img
        src="https://images.unsplash.com/photo-1446292532430-3e76f6ab6444?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt
      />
    </div>
    <div class="product__details">
      <div class="product__name">
        <h3>Product name</h3>
        <h2>
          Price
          <span class="text-strike">price</span>
        </h2>
      </div>
      <div class="product__settings">
        <div class="product__count">
          <p>Count</p>
          <div class="counter">
            <Counter />
          </div>
        </div>
        <div class="product__colors">
          <p>Color</p>
          <div class="product__colors_options">
            <div class="color"></div>
            <div class="color"></div>
            <div class="color"></div>
          </div>
        </div>
        <div class="product__buttons">
          <BaseButton class="btn-fill btn-wide">
            <span slot="button-text">Add to cart</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import Counter from "@/components/Counter";
export default {
  components: {
    BaseButton,
    Counter,
  },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";
.product {
  //   height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  // gap: 2rem;
  place-items: space-between;
}

.product__image {
  height: 550px;
  width: 550px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.product__details {
  .product__name {
    position: relative;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 28px;
      margin-bottom: 1rem;
      span {
        margin: 0 0.875rem;
        font-size: 18px;
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      height: 1px;
      width: 95%;
      margin: 0 auto;
      opacity: 0.4;
      background-color: $grey;
    }
  }

  .product__settings {
    margin: 3rem 0;
    p {
      font-size: 16px;
    }
  }
}

.product__count {
  margin: 2rem 0;
}

.product__colors {
  margin: 2rem 0;
  .product__colors_options {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;
    div {
      margin-right: 0.875rem;
      height: 36px;
      width: 36px;
      background: red;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border: 3px solid $primary;
      }
    }
  }
}

.product__buttons {
  margin: 5rem 0;
}
</style>