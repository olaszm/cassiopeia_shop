<template>
  <div class="shop wrapper">
    <div class="shop-inner">
      <div class="shop_filters">
        <ul v-if="filters">
          <BaseDropdown>
            <h3 slot="title">Price</h3>
            <li slot="list-item" @click="priceOrderChange('asc')">Low to high</li>
            <li slot="list-item" @click="priceOrderChange('desc')">High to low</li>
          </BaseDropdown>
          <!-- <BaseDropdown>
            <h3 slot="title">Product type</h3>
            <li slot="list-item">Indoor</li>
            <li slot="list-item">Outdoor</li>
          </BaseDropdown>
          <BaseDropdown>
            <h3 slot="title">Price Range</h3>
            <li slot="list-item">£0-£10</li>
            <li slot="list-item">£10-£25</li>
            <li slot="list-item">£25-£50</li>
          </BaseDropdown>-->
        </ul>
        <div class="shop_total_items">
          <p>{{ totalProducts >=1 ? `${totalProducts} items` : `${totalProducts} item` }}</p>
        </div>
      </div>
      <div class="products_gallery">
        <ImageCard v-for="(item, index) in products" :key="index" :item="item" />
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
import { mapState, mapActions } from "vuex";
export default {
  components: { ImageCard, BaseButton, BaseDropdown },
  computed: {
    ...mapState(["products", "totalProducts"]),
  },
  data() {
    return {
      filters: true,
    };
  },
  methods: {
    ...mapActions(["changePriceOrder"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.products_gallery {
  height: 100%;
  margin: 5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
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
