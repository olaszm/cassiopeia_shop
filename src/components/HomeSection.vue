<template>
  <div class="section__container">
    <slot name="section-title"></slot>
    <div class="section__content">
      <ImageCard v-for="(item, index) in items" :key="index" :item="item"></ImageCard>
    </div>
  </div>
</template>

<script>
import ImageCard from "@/components/ImageCard";
export default {
  props: ["items"],
  components: { ImageCard },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.section__container {
  margin: 5rem 0;
  height: 100%;
  h3 {
    font-size: 1.7rem;
    font-weight: 500;
  }
}
.section__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  align-items: center;
  justify-items: stretch;
  gap: 2rem;
  margin: 2rem 0;
}
</style>
