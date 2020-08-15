<template>
  <div class="dropdown">
    <div class="title">
      <slot name="title"></slot>
      <i class="fas fa-sort-down"></i>
    </div>
    <ul class="list">
      <slot name="list-item"></slot>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.dropdown {
  font-size: 14px;
  position: relative;
  margin-right: 2rem;
  cursor: pointer;
  height: 100%;
  width: 100%;
  &:hover,
  &:focus,
  &:focus-within {
    .list {
      opacity: 1;
      pointer-events: all;
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    h3 {
      width: 100%;
      white-space: nowrap;
    }
    i {
      margin: 0 1rem;
    }
  }
  .list {
    padding: 0.5rem 0;
    pointer-events: none;
    opacity: 0;
    position: absolute;
    border-radius: 4px;
    top: calc(100% - 0.1rem);
    left: 0;
    right: 0;
    width: 150px;
    background-color: $snow;
    z-index: 10;
    transition: all 300ms ease;
    box-shadow: $box-shadow;
    li {
      padding: 1em 0.2em;
      border-radius: 4px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: $light-grey;
      }
    }
  }
}
</style>
