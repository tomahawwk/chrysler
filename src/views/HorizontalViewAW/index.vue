<template lang='pug'>
.horizontal-view
  .preloader-intro(:class="overlay")
    RotateElement(:animation="animation" )
  .page(:class="overlay")
    Header(
      :theme="theme"
      :appear="appear"
      :orientation="orientation"
      )
    Border(
      :scroll="scroll"
      :appear="appear"
      :theme="theme"
      :scrollbar="scrollbar")
    slot
</template>

<script>
import Header from "../../components/blocks/HeaderAW/index";
import RotateElement from "../../components/elements/RotateElement/index";
import Border from "../../components/elements/Border/index";
export default {
  name: "HorizontalViewAW",
  props: [
    "scroll",
    "theme",
    "appear",
    "scrollbar",
    "animation",
    "overlay",
    "orientation"
  ],
  components: {
    Header,
    Border,
    RotateElement
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.horizontal-view
  min-height: 100vh
  position: relative
  width: 100vw
  overflow: hidden
  @media (max-width: $b-tablet)
    overflow: auto
  .page
    &:not(.none)
      transition-duration: 1.8s
      overflow: hidden
      min-height: 100vh
      transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
      @media (max-width: $b-tablet)
        overflow: auto
  .none
    transform: none
.preloader-intro
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background: $dark
  z-index: 5
  transform-origin: left
  animation: intro 1.4s cubic-bezier(0.77, 0, 0.175, 1) .9s forwards
.preloader-intro.hidden
  display: none
.preloader-intro.none
  display: none
@keyframes intro
  0%
    transform: scale3d(1,1,1)
  100%
    transform: scale3d(0,1,1)
</style>
