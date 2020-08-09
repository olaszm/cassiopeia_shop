<template>
  <div class="wrapper">
    <Product />
    <HomeSection>
      <h3 slot="section-title">Items you might like</h3>
    </HomeSection>
  </div>
</template>

<script>
import Product from "@/components/Product";
import HomeSection from "@/components/HomeSection";
export default {
  components: {
    Product,
    HomeSection,
  },
};
</script>

<style lang='scss' scoped>
</style>