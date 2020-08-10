<template>
  <div class="wrapper">
    <Product :product="product" />
    <!-- <HomeSection>
      <h3 slot="section-title">Items you might like</h3>
    </HomeSection> -->
  </div>
</template>

<script>
import Product from "@/components/Product";
// import HomeSection from "@/components/HomeSection";
import { mapActions } from "vuex";
export default {
  components: {
    Product,
    // HomeSection,
  },
  data() {
    return {
      product: "",
    };
  },
  methods: {
    ...mapActions(["getProductById"]),
  },
  async created() {
    const { id } = this.$route.params;
    this.product = await this.getProductById(id);
  },
};
</script>

<style lang="scss" scoped></style>
