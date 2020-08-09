<template>
  <div class="dropdown">
    <div class="title">
      <h3>Text</h3>
      <i class="fas fa-sort-down"></i>
    </div>
    <ul class="list">
      <li>Newest</li>
      <li>Oldest</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.dropdown {
  font-size: 14px;
  position: relative;
  margin-right: 2rem;
  cursor: pointer;
  &:hover {
    .list {
      opacity: 1;
      pointer-events: all;
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    i {
      margin: 0 1rem;
    }
  }
  .list {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    border-radius: 4px;
    bottom: -100%;
    left: 0;
    right: 0;
    width: 150px;
    background-color: white;
    z-index: 10;
    transition: all 300ms ease;
    transform: translate(0, 100%);
    li {
      padding: 1em 0.4em;
      height: 100%;
      width: 100%;
      cursor: pointer;
      &:hover {
        background-color: lightgrey;
      }
    }
  }
}
</style>