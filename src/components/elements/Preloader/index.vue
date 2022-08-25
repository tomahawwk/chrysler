<template lang="pug">
    .preloader
      .preloader__layer
      RotateElement
</template>
<script>
import RotateElement from "../RotateElement/index";
export default {
  name: "Preloader",
  components: {
    RotateElement
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
.preloader.right
  .preloader__layer
    animation: route 2s cubic-bezier(0.77, 0, 0.175, 1) forwards
  .rotate__layer
    animation: route2 2s cubic-bezier(0.77, 0, 0.175, 1) forwards
.preloader
  position: fixed
  width: 100vw
  overflow: hidden
  height: 100vh
  z-index: 5
  visibility: hidden
  .preloader__layer
    position: absolute
    width: 110vw
    height: 100vh
    top: 0
    left: -3vw
    background: $dark
    transform-origin: left
@keyframes intro
  0%
    transform: scale3d(1,1,1)
  100%
    transform: scale3d(0,1,1)
@keyframes route
  0%
    transform: scale3d(0,1,1)
    visibility: visible
    transform-origin: right
  50%
    visibility: visible
    transform: scale3d(1,1,1)
  100%
    visibility: visible
    transform: scale3d(0,1,1)
@keyframes route2
  0%
    transform: translateX(10vw)
    visibility: visible
    opacity: 0
  50%
    transform: translateX(0vw)
    visibility: visible
    opacity: 1
  100%
    transform: translateX(-10vw)
    visibility: visible
    opacity: 0
</style>