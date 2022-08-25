<template lang='pug'>
  .cursor(:class="theme")
    .circle-cursor.circle-cursor--inner
    .circle-cursor.circle-cursor--outer
</template>

<script>
import Demo3 from "./scripts/init";

export default {
  name: "CursorCustom",
  props: ["theme"],
  data() {
    return {};
  },
  mounted() {
    const demo3 = new Demo3();
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.cursor 
  z-index: 100000
  position: fixed
  left: 0
  width: 100vw
  height: 100vh
  top: 0
  pointer-events: none
  @media (max-width: 900px)
    display: none

.cursor--small 
  width: 5px
  height: 5px
  left: -2.5px
  top: -2.5px
  border-radius: 50%
  z-index: 11000
  background: var(--color-text)

.cursor--canvas 
  width: 100vw
  height: 100vh
  z-index: 12000
.circle-cursor
  border-radius: 100%
  position: fixed
  mix-blenmode: difference
  &--inner
    background: $gold
    width: 7px
    height: 7px
    
    left: -4.5px
    top: -4.5px
    z-index: 11000
  &--outer 
    width: 37px
    height: 37px
    mix-blenmode: difference
    border: 1px solid $gold!important
    z-index: 12000
    opacity: 0.3
.cursor.light
  .circle-cursor
    &--inner
      background: $dark
      // background-color: white
      // backface-visibility: hidden
      // mix-blend-mode: difference
    &--outer
      opacity: .6!important
      border: 1px solid $dark!important
.cursor.right
  .circle-cursor
    &--inner
      top: 0px
      left: 0px
      background: url(./icons/arrow.svg)
      width: 20px
      background-size: 100%
      background-repeat: no-repeat
      opacity: 1!important
      height: 20px
    &--outer
      border: 1px solid white!important
      opacity: 1!important
      width: 50px!important
      height: 50px!important
.cursor.left
  .circle-cursor
    &--inner
      top: 0px
      left: 0px
      background: url(./icons/arrow-reverse.svg)
      width: 20px
      background-size: 100%
      background-repeat: no-repeat
      opacity: 1!important
      height: 20px
    &--outer
      border: 1px solid white!important
      opacity: 1!important
      width: 50px!important
      height: 50px!important
.cursor.zoom
  .circle-cursor
    &--inner
      top: 0px
      left: 0px
      background: transparent
      width: 15px
      height: 15px
      &:before
        content: ''
        width: 100%
        height: 2px
        position: absolute
        +center
        background: white
      &:after
        content: ''
        width: 2px
        height: 100%
        position: absolute
        +center
        background: white
    &--outer
      border: 1px solid white!important
      opacity: 1!important
      width: 50px!important
      height: 50px!important
.cursor.zoom-out
  .circle-cursor
    &--inner
      top: 0px
      left: 0px
      background: transparent
      width: 15px
      height: 15px
      &:before
        content: ''
        width: 100%
        height: 2px
        position: absolute
        +center
        background: white
    &--outer
      border: 1px solid white!important
      opacity: 1!important
      width: 50px!important
      height: 50px!important
</style>
