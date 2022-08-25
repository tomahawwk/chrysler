<template lang='pug'>
.base
  CursorCustom(:theme="theme")
  HorizontalViewAW(
    :theme="theme"
    :appear="appear"
    :scrollbar="scrollbar"
    )
    .location
      Slider
      .location__map
        .map__overlay
        MapBox
      .category__wrap
        ul.category(
          ref="categoryList"
        )
          li.category__item.circle__link(
            :id="category.id"
            v-for="category in categoryList"
            :key="category.id"
          )
            p {{ category.name }}
              span
            .category__border
              .line
              .line
              .line
              .line 
</template>

<script>
import { Category } from "./scripts/category";
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import MapBox from "../../components/elements/LocationMap/index";
import Slider from "../../components/elements/LocationSlider/index";
import CursorCustom from "../../components/elements/Cursor/index";
export default {
  name: "Documents",
  data() {
    return {
      type: "half",
      theme: "dark",
      appear: "normal",
      scrollbar: true,
      contactsKey: 0,
      categoryList: [
        {
          id: "health",
          name: "Здоровье"
        },
        {
          id: "family",
          name: "Семейный отдых"
        },
        {
          id: "schools",
          name: "Школы/Детские сады"
        },
        {
          id: "transport",
          name: "Транспорт"
        },
        {
          id: "purchases",
          name: "Покупки"
        },
        {
          id: "restaurants",
          name: "Бары/рестораны"
        },
        {
          id: "banks",
          name: "Банки/банкоматы"
        },
        {
          id: "art",
          name: "Искусство"
        }
      ]
    };
  },
  methods: {
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    },
    showPage() {
      this.$el.classList.add("active");
    }
  },
  mounted() {
    this.showPage();
    Category(this.categoryList);
  },
  beforeDestroy() {
    this.clearCursor();
  },
  components: {
    HorizontalViewAW,
    CursorCustom,
    MapBox,
    Slider
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.base
  background: $dark
.location
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  &__map
    position: absolute
    top: inherit
    left: inherit
    pointer-events: none
    filter: blur(5px) brightness(65%)
    width: 100%
    height: 100%
    transition-duration: .7s
    .map__overlay
      content: ''
      width: 100%
      height: 100%
      position: absolute
      z-index: 5
      top: 0
      visibility: hidden
      transition-duration: .5s
      opacity: 0
      left: 0
      background: $brown
      &--active
        visibility: visible
        opacity: 1
.category
  display: flex
  margin: 0
  padding-left: $head
  height: 100%
  @media (max-width: $b-tablet)
    padding: 0
  &__wrap
    position: fixed
    bottom: 0
    height: 10vh
    max-height: 93px
    left: 0
    background: $dark
    z-index: 5
    width: 100%
    border: 1px solid $brown2
    border-left: none
    border-right: none
    transition-duration: .5s
    &--hidden
      transform: translateY(20vh)
  &__item
    background: $dark
    color: #000000
    cursor: pointer
    font-size: 12px
    padding: 0 60px
    height: 100%
    text-align: center
    display: flex
    position: relative
    justify-content: center
    align-items: center
    border: 1px solid $brown2
    border-left: none
    border-top: none
    position: relative
    transform: translateX(12vw)
    opacity: 0
    transition-duration: 1s
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
    @media (max-width: $m-desktop)
      padding: 0 40px
    &:nth-child(1)
      transition-delay: 1.4s
    &:nth-child(2)
      transition-delay: 1.45s
    &:nth-child(3)
      transition-delay: 1.5s
    &:nth-child(4)
      transition-delay: 1.55s
    &:nth-child(5)
      transition-delay: 1.6s
    &:nth-child(6)
      transition-delay: 1.65s
    &:nth-child(7)
      transition-delay: 1.7s
    &:nth-child(8)
      transition-delay: 1.75s
    &:nth-child(9)
      transition-delay: 1.8s
    &:nth-child(10)
      transition-delay: 1.85s
    .category__border
      position: absolute
      width: 100%
      height: 100%
      .line
        background: #BE9D6A
        transition-duration: .1s
        transition-timing-function: linear
        position: absolute
        &:nth-child(1)
          width: 0
          height: 1px
          top: 0
          left: 0
          transition-delay: .3s
        &:nth-child(2)
          width: 1px
          height: 0
          top: 0
          right: 0
          transition-delay: .2s
        &:nth-child(3)
          width: 0
          height: 1px
          bottom: 0
          right: 0
          transition-delay: .1s
        &:nth-child(4)
          width: 1px
          height: 0
          bottom: 0
          left: 0
          transition-delay: 0s
      &:hover
        .line
          &:nth-child(1)
            width: 100%
            transition-delay: 0s
          &:nth-child(2)
            height: 100%
            transition-delay: .1s
          &:nth-child(3)
            width: 100%
            transition-delay: .2s
          &:nth-child(4)
            height: 100%
            transition-delay: .3s
    &:last-child
      border-right: none
    &:hover
      color: #BE9D6A
    &:before
      border: 1px solid #BE9D6A
      width: 90%
      height: 80%
      position: absolute
      content: ''
      opacity: 0
      transition-duration: .5s
    p
      position: relative
      color: $gold2
      white-space: nowrap
      font-family: 'Futura PT'
      font-size: 12px
      text-transform: uppercase
      letter-spacing: 1px
      span
        font-size: 9px
        position: absolute
        top: -5px
        right: -12px
.active
  .slider__wrap
    transform: translateY(0vh)
    opacity: 1
    transition-delay: 2s
  .category__item
    transform: translateX(0)
    opacity: 1
.location.show
  .location__map
    filter: blur(0px) brightness(100%)
    pointer-events: auto
  .slider__wrap
    opacity: 0
    transition-delay: 0s
    visibility: hidden
    transform: translateY(-10vh)
  
</style>
