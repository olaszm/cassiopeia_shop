<template>
  <div class="shop wrapper">
    <div class="shop-inner">
      <div class="shop_filters">
        <ul>
          <BaseDropdown />
          <BaseDropdown />
          <BaseDropdown />
        </ul>
        <div class="shop_total_items">
          <p>{{ getTotalProducts }}</p>
        </div>
      </div>
      <div class="products_gallery">
        <ImageCard
          v-for="(item, index) in products"
          :key="index"
          :item="item"
        />
      </div>
      <div class="showmore-btn-container">
        <BaseButton class="btn-fill">
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
import { mapState } from "vuex";
export default {
  components: { ImageCard, BaseButton, BaseDropdown },
  computed: {
    ...mapState(["products", "totalProducts"]),
    getTotalProducts() {
      return this.totalProducts > 1
        ? `${this.totalProducts} items`
        : `${this.totalProducts} item`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.products_gallery {
  height: 100%;
  margin: 5rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  place-items: space-between;
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
