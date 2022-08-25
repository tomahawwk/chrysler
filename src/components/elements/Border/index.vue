<template lang='pug'>
.border(:class="theme" )
  span.border__top
  span.border__right(v-bind:class="{ activeScroll: scroll }")
    .scroll(v-if="scroll === true")
      div Scroll
    .part.part__first
    router-link(to="/gallery" class="layout")
      div GALLERY
    .part.part__second
  span.border__bottom(v-bind:class="{ hidden: scrollbar }")
  span.border__left
</template>

<script>
export default {
  name: "Border",
  props: ["scroll", "appear", "theme", "scrollbar"],
  data() {
    return {};
  },
  mounted() {
    const borders = this.$el.querySelectorAll(".border span");
    if ((this.appear == "normal")) {
      setTimeout(() => {
        for (let i = 0; i < borders.length; i++) {
          borders[i].classList.add("active");
        }
      }, 200);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.border.light
  span
    background: $grey3
  .layout
    display: none
  .part
    background: $grey3
.border
  z-index: 2
  position: fixed
  span
    background: $brown2
    position: fixed
    transition-timing-function: ease
    transition-duration: 1s
    transition-delay: 0.2s
  .active
    transform: translate3d(0px, 0, 0)
  &__top
    width: 100vw
    left: 0
    z-index: 2
    height: 1px
    top: $view-indent
    transform: translate3d(0px, -#{$view-indent}, 0)
    @media (max-width: $b-tablet)
      top: $view-indent-mobile
      transform: translate3d(0px, -#{$view-indent-mobile}, 0)
  &__bottom
    width: 100vw
    left: 0
    height: 1px
    bottom: $view-indent
    transform: translate3d(0px, #{$view-indent}, 0)
    @media (max-width: $b-tablet)
      bottom: $view-indent-mobile
      transform: translate3d(0px, #{$view-indent-mobile}, 0)
  &__left
    height: 100vh
    left: $view-indent
    align-items: center
    display: none
    width: 1px
    flex-direction: column
    top: 0
    @media (max-width: $b-tablet)
      left: $view-indent-mobile
      display: flex
  &__right
    height: 100vh
    right: $view-indent
    align-items: center
    //z-index: 3
    flex-direction: column
    display: flex
    background: none!important
    transform: translate3d(#{$view-indent}, 0, 0)
    @media (max-width: $b-tablet)
      right: $view-indent-mobile
      transform: translate3d(#{$view-indent-mobile}, 0, 0)
    &:hover
      .part
        &__first
          transform: translateY(-15vh)!important
          @media (max-width: $sm-desktop)
            transform: translateY(-20vh)!important
        &__second
          transform: translateY(15vh)!important
          @media (max-width: $sm-desktop)
            transform: translateY(20vh)!important
    .layout
      position: absolute
      color: $gold
      writing-mode: vertical-rl
      transform: rotate(180deg)
      display: flex
      transition-delay: 0s
      top: 0
      pointer-events: none
      right: -30px
      justify-content: center
      bottom: 0
      font-family: 'Baza'
      font-size: 40px
      margin: auto
      transition-duration: .5s
      opacity: 0
      div
        transition-timing-function: ease
        transition-duration: .4s
      &:hover
        div
          letter-spacing: 4px
    .part
      width: 1px
      height: 50%
      background: $brown2
      position: absolute
      left: 0
      transition-timing-function: ease
      transition-duration: .5s
      &:before, &:after
        content: ''
        width: 6px
        transition-timing-function: ease
        transition-duration: .5s
        transition-delay: .3s
        height: 2px
        background: $brown2
        position: absolute
      &__first
        transition-delay: .5s
        top: 0
        &:before
          bottom: 0px
          left: -4px
          transform: scaleX(0) rotate(45deg)
        &:after
          bottom: 0px
          right: -5px
          transform: scale(0) rotate(-45deg)
          
      &__second
        transition-delay: .5s
        bottom: 0
        &:before
          top: 0px
          left: -4px
          transform: scaleX(0) rotate(0deg)
        &:after
          top: 0px
          right: -5px
          transform: scale(0) rotate(0deg)
.border__bottom.hidden
  @media (min-width: $b-tablet + 1)
    display: none
.scroll
  color: $gold
  display: flex 
  width: 80px
  height: 100vh
  margin-right:  -#{$view-indent}
  display: flex
  +center-flex
  left: 0
  background: $brown
  position: absolute
  text-transform: uppercase
  font-size: 10px
  font-family: 'Futura Light'
  transition-duration: .5s
  transition-timing-function: ease
  @media (max-width: $b-tablet)
    display: none
  div
    //writing-mode: vertical-rl
    transform: rotate(-90deg)
    letter-spacing: 3px
.border__right.open
  transform: translateX(-60px)
  .layout
    opacity: 1
    pointer-events: auto
    letter-spacing: 1px
    transition-delay: .5s
  .part
    &__first
      transition-delay: 0s
      transform: translateY(-13vh)
      @media (max-width: $sm-desktop)
        transform: translateY(-17vh)
      &:before
        transform: scaleX(1) rotate(45deg)
      &:after
        transform: scaleX(1) rotate(-45deg)
    &__second
      transition-delay: 0s
      transform: translateY(13vh)
      @media (max-width: $sm-desktop)
        transform: translateY(17vh)
      &:before
        transform: scaleX(1) rotate(-45deg)
      &:after
        transform: scaleX(1) rotate(45deg)
.activeScroll
  @media (min-width: $b-tablet + 1)
    right: 80px
    transform: translate3d(80px, 0, 0)
    &:not(.open)
      &:hover
        .part
          &__first
            transform: translateY(0vh)!important
          &__second
            transform: translateY(0vh)!important
.hidden
  right: $view-indent
  .scroll
    opacity: 0
</style>
