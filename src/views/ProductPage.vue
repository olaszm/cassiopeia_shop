<template>
  <div class="wrapper">
    <div class="inner">
      <Product :product="product" />
      <HomeSection :items="getDeals(getRandomTag)">
        <h3 slot="section-title">Items you might like</h3>
      </HomeSection>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import HomeSection from "@/components/HomeSection";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    Product,
    HomeSection,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getDeals"]),
    ...mapState(["product"]),
    getRandomTag() {
      let random = Math.floor(Math.random() * this.product.tags.length);
      return this.product.tags[random];
    },
  },
  methods: {
    ...mapActions(["getProductById"]),
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.getProductById(id);
  },
};
</script>

<style lang="scss" scoped>
.inner {
  height: 100%;
}
</style>
