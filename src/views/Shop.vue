<template>
  <div class="shop wrapper">
    <div class="shop-inner">
      <div class="shop_filters">
        <ul v-if="filters">
          <BaseDropdown>
            <h3 slot="title">Added</h3>
            <li slot="list-item" @click="changePriceOrder('newest')">Newest</li>
            <li slot="list-item" @click="changePriceOrder('oldest')">Oldest</li>
          </BaseDropdown>

          <BaseDropdown>
            <h3 slot="title">Price</h3>
            <li slot="list-item" @click="changePriceOrder('lowToHigh')">Low to high</li>
            <li slot="list-item" @click="changePriceOrder('highToLow')">High to low</li>
          </BaseDropdown>
        </ul>
        <div class="shop_total_items">
          <p>
            {{
            totalProducts >= 1
            ? `${totalProducts} items`
            : `${totalProducts} item`
            }}
          </p>
        </div>
      </div>
      <div class="products_gallery">
        <ImageCard v-for="(item, index) in filteredProducts" :key="index" :item="item" />
      </div>
      <div class="showmore-btn-container">
        <BaseButton class="btn-fill" @click.native="loadMore" v-if="!showMoreButton">
          <h3 slot="button-text">Show more</h3>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCard from "@/components/ImageCard";
import BaseButton from "@/components/BaseButton";
import BaseDropdown from "@/components/BaseDropdown";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: { ImageCard, BaseButton, BaseDropdown },
  computed: {
    ...mapState(["totalProducts"]),
    ...mapGetters(["filteredProducts"]),
    getURLParam() {
      return this.$route.params.item == "plants" ? "product" : "pot";
    },
    showMoreButton() {
      return this.filteredProducts.length === this.totalProducts;
    },
  },
  data() {
    return {
      filters: true,
    };
  },
  methods: {
    ...mapActions(["changePriceOrder", "getItems"]),
    loadMore() {
      this.getItems({ type: this.getURLParam });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.products_gallery {
  height: 100%;
  width: 100%;
  margin: 5rem 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  display: grid;
  max-width: 1500px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  place-items: start;
}

.showmore-btn-container {
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.shop {
  height: 100%;
}

.shop_filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    li {
      margin-right: 5rem;
    }
  }
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    background-color: $grey;
    opacity: 0.4;
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
  }
}
</style>
