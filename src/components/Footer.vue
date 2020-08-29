<template>
  <footer>
    <div class="wrapper">
      <div class="footer__inner">
        <div class="footer__column footer_contact">
          <h3>social</h3>
          <div class="footer__social_btns">
            <i class="fab fa-instagram icon"></i>
            <i class="fab fa-whatsapp icon"></i>
            <i class="fab fa-facebook icon"></i>
          </div>
        </div>
        <div class="footer__column footer_contact">
          <h3>site map</h3>
          <div class="footer__column__content">
            <ul>
              <router-link to="/shop/plants">Flowers</router-link>
            </ul>
          </div>
        </div>
        <div class="footer__column footer_contact">
          <h3>other</h3>
          <div class="footer__column__content">
            <ul>
              <router-link to="/">About</router-link>
              <router-link to="/">Contact</router-link>
              <router-link to="/">Terms & Conditions</router-link>
              <router-link to="/">Shipping</router-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__copy">
        <div class="footer_copy-inner">
          <p>&copy;Copyright 2020</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
footer {
  margin-top: 10rem;
  height: 100%;
  padding: 2rem 0;
  background-color: $snow;
  display: grid;
  place-items: start;
  grid-template-rows: 1fr, 1fr;
}

.footer__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: $mobile) {
    flex-direction: column;
  }
}

.footer__column {
  height: 100%;
  margin: 1rem 0;
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 1.2rem 0;
    position: relative;
    &::after {
      content: "";
      height: 1px;
      width: 100%;
      background-color: $grey;
      opacity: 0.4;
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
    }
  }
}
.footer__social_btns {
  margin-left: 0.1rem;
  i {
    margin-right: 1.25rem;
  }
}

.footer__column__content {
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    a {
      margin: 0.9rem 0;
      &:hover {
        color: $grey;
      }
    }
  }
}

.footer__copy {
  margin-top: 2.5rem;
  color: $grey;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 100%;
    background-color: $grey;
    opacity: 0.4;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
  }
}
</style>
