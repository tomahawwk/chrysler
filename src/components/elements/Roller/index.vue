<template lang='pug'>
.roller.observe(:class="`roller-${ type }`")
  div(
    v-for="i in count"
  )
    .rotation
</template>

<script>
export default {
  props: ["count", "type"],
  name: "Roller",
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/main"
.roller
  position: absolute
  display: flex
  @media (max-width: $s-desktop)
    display: none
  div
    display: block
    opacity: 0
    position: relative
    transition-duration: .5s
    transform: translateX(15px)
    perspective: 1000px
    @include delay(transition, 20, 0.1s)
    .rotation
      width: 100%
      transform: rotateY(90deg)
      animation: rotateAnimation 2s linear infinite
      height: 100%
    .animated
      opacity: 1
      transform: translateX(0px)
  &-1
    &>div
      &:nth-child(1)
        height: 35px
        width: 3px
        .rotation
          animation-delay: .4s
      &:nth-child(2)
        height: 35px
        width: 3px
        margin-left: 8px
        .rotation
          animation-delay: .2s
      &:nth-child(3)
        height: 55px
        margin-top: 20px
        width: 4px
        margin-left: 30px
        .rotation
          animation-delay: .3s
      &:nth-child(4)
        height: 55px
        margin-top: 20px
        width: 4px
        margin-left: 8px
        .rotation
          animation-delay: .2s
      &:nth-child(5)
        height: 55px
        margin-top: 40px
        width: 4px
        margin-left: 30px
        .rotation
          animation-delay: .1s
      &:nth-child(6)
        height: 55px
        margin-top: 40px
        width: 4px
        margin-left: 8px
        .rotation
          animation-delay: .2s
      &:nth-child(7)
        height: 55px
        margin-top: -10px
        width: 4px
        margin-left: 30px
        .rotation
          animation-delay: .4s
      &:nth-child(8)
        height: 55px
        margin-top: -10px
        width: 4px
        margin-left: 8px
        .rotation
          animation-delay: .2s
      &:nth-child(9)
        margin-left: 30px
        height: 35px
        width: 3px
        margin-top: 30px
        .rotation
          animation-delay: .1s
      &:nth-child(10)
        height: 35px
        width: 3px
        margin-top: 30px
        margin-left: 8px
        .rotation
          animation-delay: .2s
      &:nth-child(11)
        margin-left: 30px
        height: 35px
        width: 3px
        margin-top: -20px
        .rotation
          animation-delay: .3s
      &:nth-child(12)
        height: 35px
        width: 3px
        margin-top: -20px
        margin-left: 8px
        .rotation
          animation-delay: .2s
  &-2
    span
      margin: 0 12px
      &:nth-child(1)
        width: 10px
        margin-left: 20px
        margin-top: -20px
        height: 30px
      &:nth-child(2)
        width: 10px
        margin-top: 40px
        height: 30px
      &:nth-child(3)
        width: 15px
        margin-left: 20px
        margin-top: 0px
        height: 45px
      &:nth-child(4)
        width: 15px
        margin-left: 20px
        margin-top: 50px
        height: 45px
      &:nth-child(5)
        width: 15px
        margin-left: 20px
        margin-top: 10px
        height: 45px

      
.animated
  div
    opacity: 1
    transform: translateX(0)
    
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
