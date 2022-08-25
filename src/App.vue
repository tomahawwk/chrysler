<template lang="pug">
  #app
    Preloader
    transition(appear name="fade")
      router-view 
</template>
<script>
import Preloader from "./components/elements/Preloader/index";
export default {
  name: "App",
  components: {
    Preloader
  },
  mounted() {}
};
</script>
<style lang="sass">
@import "src/sass/general/medias"
body
  margin: 0
  overflow: hidden
  @media (max-width: $b-tablet)
    overflow: auto
    -webkit-overflow-scrolling: touch
html
  box-sizing: border-box
*
  &,
  &:before,
  &:after
    box-sizing: inherit
    cursor: none!important
  &:focus
    outline: none
</style>
