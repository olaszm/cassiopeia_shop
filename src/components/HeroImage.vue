<template>
  <div class="hero">
    <img
      src="https://images.unsplash.com/photo-1502920970741-47c1bafc8d49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt
    />
    <div class="hero__overlay">
      <h4>BEAUTIFUL INDOOR PLANTS</h4>
      <p>
        Cassiopeia makes it easy for you to discover & buy stunning indoor
        plants for your home & office.
      </p>
      <router-link to="/shop/plants">
        <BaseButton class="btn-fill">
          <span slot="button-text">See more</span>
        </BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.hero {
  height: 480px;
  width: 80%;
  margin: 0 auto;
  position: relative;
  @media (max-width: $mobile) {
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .hero__overlay {
    position: absolute;
    width: 350px;
    bottom: 20%;
    left: 15%;
    h4 {
      margin: 1.25rem 0;
      font-size: 2.25rem;
      font-weight: 500;
    }
    p {
      font-size: 1.25rem;
      margin: 2rem 0;
    }
    button {
      height: 40px;
      width: 150px;
    }
    @media (max-width: $mobile) {
      left: 5%;
      width: 250px;
      h4 {
        font-size: 2rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
}
</style>
