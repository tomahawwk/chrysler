<template lang='pug'>
.close-button(@click="active()")
  .close
    
</template>

<script>
export default {
  name: "CloseButton",
  data() {
    return {};
  },
  methods: {
    active(e) {
      this.$el.classList.toggle("active");
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/main"
.close-button
  +center-flex
  cursor: pointer
  .close
    display: flex
    width: 27px
    +center-flex
    position: relative
    height: 27px
    span
      position: absolute
      width: 100%
      height: 1px
      background: $gold
      transition-duration: .3s
      transition-timing-function: ease
      &:nth-child(1)
        margin-top: 4px
      &:nth-child(2)
        margin-top: -1px
      &:nth-child(3)
        margin-top: -6px
        
.active
  .close
    span
      &:nth-child(1)
        transform: translateY(-5px) rotate(45deg)
      &:nth-child(2)
        opacity: 0
        transform: translateX(5px)
      &:nth-child(3)
        transform: translateY(5px) rotate(-45deg)
</style>
