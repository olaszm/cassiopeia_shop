<template>
  <div class="section__container">
    <slot name="section-title"></slot>
    <div class="section__content">
      <ImageCard v-for="(item, index) in items" :key="index" :item="item">
      </ImageCard>
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
.section__container {
  margin: 5rem 0;
  h3 {
    font-size: 1.7rem;
    font-weight: 500;
  }
}
.section__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 2rem 0;
}
</style>
