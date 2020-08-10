<template>
  <router-link :to="`/product/${item.id}`">
    <div class="card">
      <div class="card__image-container">
        <img :src="item.item.src.fields.file.url" alt />
        <BaseButton class="btn-fill btn-circle arrow">
          <i slot="button-text" class="fas fa-long-arrow-alt-right"></i>
        </BaseButton>
      </div>
      <div class="card__content">
        <h4>{{ item.item.name }}</h4>
        <p>
          <span class="caption">{{ item.item.price }}</span>
          <span v-if="item.item.old_price != 0" class="caption text-strike">{{
            item.item.old_price
          }}</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
  props: ["item"],
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 250ms ease;
  width: 260px;
  &:hover {
    box-shadow: 3px 7px 15px $light-grey;
    .arrow {
      opacity: 1;
    }
  }
}

.card__image-container {
  height: 260px;
  width: 260px;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.card__content {
  h4 {
    font-size: 1.375rem;
    font-weight: 500;
    margin: 0.875rem 0;
  }
  p {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      margin: 0 0.5rem;
    }
  }
}

.arrow {
  position: absolute;
  height: 46px;
  width: 46px;
  padding: 0.5em;
  bottom: -23px;
  right: 5%;
  opacity: 0;
  &:hover {
    box-shadow: none;
  }
}
</style>
