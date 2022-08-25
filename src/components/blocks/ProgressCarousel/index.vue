<template lang="pug">
  .carousel
    .carousel__inner
      .carousel__item.zoom(
        v-for="item in items"
      )
        .image
          img(:src="item.preview" class="album__item-img album__item-img--small")
          img(:src="item.detail" class="album__item-img album__item-img--large")
        .title
          span(
            v-for="item in item.date"
          ) {{ item }}
    
        
</template>

<script>
require("../FullscreenAnimation/base.css");
import { FullscreenAnimation } from "../FullscreenAnimation/init";
export default {
  name: "ProgressCarousel",
  props: ["items"],
  methods: {
    showItems() {
      setTimeout(() => {
        const items = this.$el.querySelectorAll(".carousel__item");
        items.forEach(item => {
          item.classList.add("active");
        });
      }, 10);
    }
  },
  mounted() {
    this.showItems();
    setTimeout(() => {
      FullscreenAnimation();
    }, 20);
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.carousel__item.active
  transform: translateX(0)
.carousel
  height: 100%
  &__inner
    display: flex
    height: 100%
    margin-right: 35vw
    align-items: center
    @media (max-width: $b-tablet)
      margin: 0
      flex-wrap: wrap
      justify-content: space-between
      position: relative
      border-top: 1px solid $grey3
      padding-top: 48px
    @media (max-width: $b-mobile)
      margin: 0 5vw
  &__item
    display: flex
    flex-direction: column
    align-items: center
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
    transition-duration: 1.5s
    transform: translateX(15vw)
    margin-right: 80px
    width: 13vw
    @media (max-width: $m-desktop)
      width: 16vw
      margin-right: 40px
    @media (max-width: $b-tablet)
      width: 45%
      margin: 0 0 10vh
    @media (max-width: $b-mobile)
      width: 100%
    &:nth-child(1)
      transition-delay: .8s
    &:nth-child(2)
      transition-delay: .9s
    &:nth-child(3)
      transition-delay: 1s
    .title
      margin-top: 35px
      font-family: 'Woodland Light'
      text-transform: uppercase
      font-size: 18px
      backface-visibility: hidden
      @media (max-width: $s-desktop)
        margin-top: 20px
      @media (max-width: $b-tablet)
        margin-top: 30px
        font-size: 24px
      @media (max-width: $b-tablet)
        font-size: 16px
    .image
      width: 100%
      position: relative
      img
        +center
        width: 100%
        transition-duration: .7s
        margin: 0
        cursor: pointer
        transition-timing-function: ease
</style>