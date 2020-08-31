<template>
  <div class="wrapper">
    <div class="inner">
      <div class="about__section">
        <h3>Who we are</h3>
        <p>
          Cassiopeia is an independent houseplant shop based on John Doe Street
          in JohnDoe and we opened our doors in June 2017. We love to stock
          exotic and exciting houseplants, our cute little shop has quickly
          become the place to go for all your indoor plant needs. At Wild you
          can pick up plant related gifts alongside your plants and pots as well
          as lots of locally made products. Raising a plant is a joy and we
          would love to share this with everyone,drop by and we can help you
          choose a new green friend.
        </p>
      </div>
      <div class="img__section">
        <img src="https://source.unsplash.com/random/800x800" alt="" />
      </div>
      <div class="about__section">
        <h3>Our Houseplant Stock</h3>
        <p>
          We sell a huge variety of indoor plants in our little shop, from
          Monstera Deliciosa, Begonia Maculata, Pilea Peperomioides and Yucca
          Plants to Variegated Cacti, Calathea Ornata, Fittonia and Bird of
          Paradise. We can also do our best to order plants in for you, just
          drop us an email at cassiopeia@plantshop.com
        </p>
      </div>
      <div class="img__section">
        <img src="https://source.unsplash.com/random/800x800" alt="" />
      </div>
      <div class="about__section">
        <h3>
          Recycle & Reuse
        </h3>

        <p>
          If you live in the JohnDoe are, we offer a great plastic pot recycle
          and reuse scheme. Take a plastic pot for free or drop your plastic
          pots in to be reused. We do our very best to be as responsible as
          possible with our plastic use.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.inner {
  margin-top: 5rem;
}

.about__section {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: 1.5rem, 0;
    font-size: 2.5rem;
    color: $primary;
    font-weight: 600;
    margin-right: 4rem;
    min-width: 150px;
  }
  p {
    max-width: 550px;
    margin: 1rem 0;
    font-size: 1.175rem;
    font-weight: 400;
    line-height: 1.35;
  }

  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.img__section {
  width: 100%;
  overflow: hidden;
  height: 400px;
  margin: 4.5rem 0;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center center;
  }
}
</style>
