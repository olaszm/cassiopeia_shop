<template>
  <div class="product">
    <div class="product__image">
      <img :src="product.src.fields.file.url" alt />
    </div>
    <div class="product__details">
      <div class="product__name">
        <h3>{{ product.name }}</h3>
        <h2>
          {{ product.price }}
          <span v-if="product.old_price != 0" class="text-strike">
            {{
            product.old_price
            }}
          </span>
        </h2>
      </div>
      <div class="product__settings">
        <div class="product__count">
          <p>Count</p>
          <div class="counter">
            <Counter :value="1" v-model="itemCount" />
          </div>
        </div>
        <!-- <div class="product__colors">
          <p>Color</p>
          <div class="product__colors_options">
            <div class="color"></div>
            <div class="color"></div>
            <div class="color"></div>
          </div>
        </div>-->
        <div class="product__buttons">
          <BaseButton @click.native="addToCart(product)" class="btn-fill btn-wide">
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
import { mapActions } from "vuex";
export default {
  props: ["product"],
  data() {
    return {
      itemCount: 1,
    };
  },
  components: {
    BaseButton,
    Counter,
  },
  computed: {
    getProductPicture() {
      console.log(this.$props.product.src.fields.file.url);
      return this.$props.product.src.fields.file.url;
    },
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    addToCart(item) {
      if (this.itemCount >= 1) {
        this.addProductToCart({ item, amount: this.itemCount });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.product {
  //   height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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
