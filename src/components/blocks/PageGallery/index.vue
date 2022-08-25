<template lang="pug">
    .gallery
        slot
</template>

<script>
export default {
  name: "PageGallery",
  mounted() {
    this.$el.classList.add("show");
  }
};
</script>

<style lang="sass">
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.gallery
    display: flex
    cursor: grab
    width: 100vw
    padding-left: $head
    align-items: center
    height: 100vh
    transform: translateX(50vw)
    transition-delay: .75s
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
    transition-duration: 2s
    @media (max-width: $b-mobile)
      padding-left: 0
      overflow: hidden

.gallery.show
    transform: translateX(0vw)
    .show__slides
      opacity: 1!important
      @media (max-width: $b-tablet)
        position: absolute
        left: 0
        opacity: 0!important
        visibility: hidden
        transition-duration: .5s
        text-transform: uppercase
        right: 0
        font-size: 10px
        letter-spacing: 3px
        text-align: center
        font-family: 'Futura PT Book'
        margin: auto
        top: 25vh
.gallery__carousel.active
  .show__slides
    @media (max-width: $b-tablet)
      opacity: 1!important
      visibility: visible
</style>