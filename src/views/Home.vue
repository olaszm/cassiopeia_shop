<template>
  <div>
    <HeroImage />
    <section class="home wrapper">
      <HomeSection v-if="newArrivals.length" :items="newArrivals">
        <h3 slot="section-title">New Arrivals</h3>
      </HomeSection>
      <HomeSection v-if="deals.length" :items="deals">
        <h3 slot="section-title">Indoor plants</h3>
      </HomeSection>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroImage from "@/components/HeroImage";
import HomeSection from "@/components/HomeSection";
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { HeroImage, HomeSection },
  computed: {
    ...mapState(["products"]),
    newArrivals() {
      return this.products.filter((item) => item.tags.includes("new"));
    },
    deals() {
      return this.products.filter((item) => item.tags.includes("indoor"));
    },
  },
  methods: {
    ...mapActions(["getProductsByTag", "getItems"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
