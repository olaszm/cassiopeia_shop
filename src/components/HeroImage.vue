<template>
  <div class="hero">
    <img
      src="https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt
    />
    <div class="hero__overlay">
      <h4>Title</h4>
      <p>Description</p>
      <BaseButton class="btn-fill">
        <span slot="button-text">Buy</span>
      </BaseButton>
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

<style lang='scss' scoped>
.hero {
  height: 480px;
  width: 100%;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .hero__overlay {
    position: absolute;
    bottom: 20%;
    left: 10%;
    h4 {
      margin: 1.25rem 0;
      font-size: 2rem;
      font-weight: 500;
    }
    p {
      margin: 2rem 0;
    }
    button {
      height: 40px;
      width: 150px;
    }
  }
}
</style>