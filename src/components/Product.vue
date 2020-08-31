<template>
  <div class="product">
    <div class="product__image">
      <img loading="lazy" :src="product.src.fields.file.url" alt />
    </div>
    <div class="product__details">
      <div class="product__name">
        <h3>{{ product.name }}</h3>
        <h2>
          £{{ product.price }}
          <span
            v-if="product.old_price != 0"
            class="text-strike"
          >£{{ product.old_price }}</span>
        </h2>
      </div>
      <div class="product__settings">
        <div class="product__count">
          <p>Count</p>
          <div class="counter">
            <Counter :value="1" v-model="itemCount" />
          </div>
        </div>
        <div class="product__colors" v-if="product.details">
          <p>Details</p>
          <span>{{ product.details }}</span>
        </div>
        <div class="product__buttons">
          <BaseButton
            :disabled="isInCart(this.$route.params.id)"
            @click.native="addToCart(product)"
            class="btn-fill btn-wide"
          >
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
import { mapActions, mapGetters } from "vuex";
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
      return this.$props.product.src.fields.file.url;
    },
    ...mapGetters(["isInCart"]),
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    addToCart(item) {
      if (this.itemCount >= 1) {
        item.amount = this.itemCount;
        this.addProductToCart(item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.product {
  // height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 5rem;
  place-items: space-between;
  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
}

.product__image {
  max-height: 550px;
  max-width: 550px;
  overflow: hidden;
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
      font-weight: 500;
      font-size: 16px;
    }
    span {
      display: inline-flex;
      margin: 1rem 0;
      line-height: 125%;
      word-spacing: 0.3em;
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
