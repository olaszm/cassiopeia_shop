<template>
  <div class="wrapper">
    <div class="inner">
      <Product :product="product" />
      <HomeSection :items="getDeals">
        <h3 slot="section-title">Indoor plants</h3>
      </HomeSection>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import HomeSection from "@/components/HomeSection";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Product,
    HomeSection,
  },
  data() {
    return {
      product: "",
    };
  },
  computed: {
    ...mapGetters(["getDeals"]),
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

<style lang="scss" scoped>
.inner {
  height: 100%;
}
</style>
