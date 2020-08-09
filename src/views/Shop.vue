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
          <p>22 Items</p>
        </div>
      </div>
      <div class="products_gallery">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
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
export default {
  components: { ImageCard, BaseButton, BaseDropdown },
};
</script>

<style lang='scss' scoped>
@import "@/style/_variables.scss";

.products_gallery {
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