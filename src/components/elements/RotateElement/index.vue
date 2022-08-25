<template lang="pug">
  .rotate__layer(:class="animation")
    .rotate
      .element
      .element
</template>
<script>
export default {
  name: "RotateElement",
  props: ["animation"],
  mounted() {
    console.log(this);
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/main"
.rotate__layer
  position: fixed
  height: 100vh
  left: 0
  top: 0
  width: 100vw
  display: flex
  +center-flex
  .rotate
    display: flex
    width: 30px
    justify-content: space-between
    height: 60px
    .element
      width: 16%
      height: 100%
      transform: rotateY(90deg)
      animation: rotateAnimation 1s linear infinite
@keyframes rotateAnimation
    0%
      transform: rotateY(90deg)
      background-color: #847053
    50%
      background-color: #FFE9A6
      opacity: 1
    100%
      transform: rotateY(270deg)
      background-color: #847053
</style>