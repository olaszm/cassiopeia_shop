<template>
  <div>
    <HeroImage />
    <section class="home wrapper">
      <HomeSection :items="getDeals('new')">
        <h3 slot="section-title">New Arrivals</h3>
      </HomeSection>
      <HomeSection :items="getDeals('medium')">
        <h3 slot="section-title">Medium Size Plants</h3>
      </HomeSection>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroImage from "@/components/HeroImage";
import HomeSection from "@/components/HomeSection";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { HeroImage, HomeSection },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["getDeals"]),
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
