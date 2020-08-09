<template>
  <section class="home wrapper">
    <HeroImage />
    <HomeSection>
      <h3 slot="section-title">New Arrivals</h3>
    </HomeSection>
    <HomeSection>
      <h3 slot="section-title">Deals</h3>
    </HomeSection>
  </section>
</template>

<script>
// @ is an alias to /src
import HeroImage from "@/components/HeroImage";
import HomeSection from "@/components/HomeSection";

export default {
  name: "Home",
  components: { HeroImage, HomeSection },
};
</script>


<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>