<template>
  <div class="wrapper">
    <div class="inner">
      <div class="contact__info">
        <h2>Find us</h2>
        <div class="contact__container">
          <div class="contact__field">
            <h4>Our Plant Shop</h4>
            <p>
              Cassiopeia Plant Shop, 9 John Doe Street <br />
              John, Doe-John <br />

              United Kingdom
            </p>
          </div>
          <div class="contact__field">
            <h4>Email</h4>
            <p>
              cassiopeia@plantshop.com
            </p>
          </div>
          <div class="contact__field">
            <h4>Phone</h4>
            <p>
              +666 4242 4224
            </p>
          </div>
        </div>
      </div>
      <div class="form__container">
        <form action="">
          <fieldset>
            <h2>Plant Advice & Enquiries</h2>
            <BaseInput placeHolderText="Name" name="name" isRequired />

            <BaseInput
              placeHolderText="Email address"
              name="email"
              isRequired
            />
            <BaseInput placeHolderText="Subject" name="subject" isRequired />
            <BaseTextArea placeHolderText="Message" name="message" isRequired />
          </fieldset>
          <BaseButton class="btn-fill btn-wide">
            <h3 slot="button-text">Send</h3>
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import BaseTextArea from "@/components/BaseTextArea";
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseInput,
    BaseButton,
    BaseTextArea,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.inner {
  margin-top: 5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: $tablet) {
    flex-direction: column;
    gap: 0;
  }
}
.contact__field {
  margin: 1.25rem 0;
  h4 {
    color: $primary;
    font-size: 1.125rem;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }
  p {
    margin: 1em 0;
  }
}

.form__container {
  margin-left: 2rem;
  width: 100%;
  max-width: 500px;
  form {
    margin: 0;
    padding: 0;
    fieldset {
      margin: 0;
      padding: 0;
      border: none;
    }
    legend {
      font-weight: 500;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    input {
      height: 45px;
    }
    button {
      height: 45px;
    }
    textarea {
      height: 100px;
    }
  }
  @media (max-width: $tablet) {
    margin-top: 2rem;
    margin-left: 0;
    button,
    a {
      margin: 1rem 0;
      width: 100%;
      height: 35px;
      &:first-child {
        margin-right: 0;
      }
    }
  }
}
</style>
