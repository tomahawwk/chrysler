<template lang="pug">
  .slider__wrap
    .slider(
      ref="slider"
      )
      .slider__arrows
        .arrow.arrow_right.cursor__link
          span
        .arrow.arrow_left.cursor__link
          span
      .slider__border
        <svg>
          <line class="stroke" x1="0" y1="100%" x2="0" y2="0" />
          <line class="stroke" x1="0" y1="0" x2="100%" y2="0" />
          <line class="stroke" x1="100%" y1="0" x2="100%" y2="100%" />
          <line class="stroke" x1="100%" y1="100%" x2="0" y2="100%" />
        </svg>
      swiper(
        :options="swiperOption"
        class="slider__area"
        @slideNextTransitionStart="slideNext"
        @slidePrevTransitionStart="slidePrev"
      )
        swiper-slide.slide(
          v-for="slideItem in slideItems"
          :key="slideItem.num"
          )
          .title {{ slideItem.minutes }}
          .t-article
            .swiper-pagination(
              slot="pagination"
              )
            .way {{ slideItem.way }}
            p {{ slideItem.place }}
</template>
<script>
require("./swiper.css");
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
import { border, clearBorder } from "./scripts/border";
import { separators } from "./scripts/separators";
export default {
  name: "Slider",
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          prevEl: ".arrow_left",
          nextEl: ".arrow_right"
        },
        effect: "fade",
        noSwiping: true,
        noSwipingClass: "swiper-container",
        speed: 2000,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        breakpoints: {
          1600: {
            slidesPerView: 1
          }
        }
      },
      slideItems: [
        {
          num: "1",
          minutes: "15",
          way: "минут пешком",
          place: "до м. Площадь Мужества"
        },
        {
          num: "2",
          minutes: "25",
          way: "минут пешком",
          place: "до Пятерочки"
        },
        {
          num: "3",
          minutes: "38",
          way: "минут на автобусе",
          place: "до м. Девяткино"
        },
        {
          num: "4",
          minutes: "57",
          way: "минут пешком",
          place: "до Школы интернат 33"
        }
      ]
    };
  },
  methods: {
    slideNext() {
      clearBorder();
      setTimeout(() => {
        border();
      }, 1000);
    },
    slidePrev() {
      clearBorder();
      border();
    }
  },
  mounted() {
    border();
    separators();
  }
};
</script>
<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.slider
  z-index: 1
  width: 36em
  height: 36em
  transition-duration: .5s
  transition-timing-function: cubic-bezier(.17,.67,.67,.97)
  position: relative
  @media (max-width: $m-desktop)
    width: 32em
    height: 32em
  @media (max-width: $s-desktop)
    width: 28em
    height: 28em
  @media (max-width: $s-tablet)
    width: 25em
    height: 25em
  @media (max-width: $b-mobile)
    width: 23em
    height: 23em
  @media (max-width: $m-mobile)
    width: 17em
    height: 17em
  .title
    font-family: 'Baza'
    color: $gold
    +locationTitle
    line-height: .8
    width: 12vw
    text-align: center
    display: block
    opacity: 0
    transform: translateY(50px)
    transition-duration: .5s
    transition-timing-function: ease
    @media (max-width: $sm-desktop)
      margin-top: 20px
    @media (max-width: $s-desktop)
      margin-top: 30px
    @media (max-width: $xs-tablet)
      width: auto
  .t-article
    margin-left: 40px
    @media (max-width: $sm-desktop)
      margin-left: 50px
    @media (max-width: $s-desktop)
      margin-left: 60px
    @media (max-width: $xs-tablet)
      position: fixed
      left: 0
      margin-left: 0
      bottom: -8em
  .swiper-pagination
    position: relative
    text-align: left
    display: flex
    align-items: center
    top: -10px
    width: fit-content
    font-size: 12px
    color: $gold
  .swiper-pagination-current
    display: none
  &__wrap
    position: absolute
    width: 100vw
    opacity: 0
    transform: translateX(10vw)
    height: 100vh
    z-index: 1
    transition-delay: 1.7s
    display: flex
    transition-duration: .6s
    transition-timing-function: cubic-bezier(.17,.67,.67,.97)
    justify-content: center
    align-items: center
    @media (max-width: $b-mobile)
      height: 100%
    @media (max-width: $xs-tablet)
      top: -6em
    &--hidden
      visibility: hidden
      z-index: -1
      .slider
        opacity: 0
        transform: translateX(-30%)
        visibility: hidden
    span
      font-size: 12px
      color: #B5B5B5
      letter-spacing: 2px
    .count_from
      color: #000000
      span
        color: inherit
  &__area
    width: 120%
    height: 100%
    margin-left: 10em
    display: flex
    align-items: center
    @media (max-width: $s-desktop)
      margin-left: 8em
      width: 90%
    @media (max-width: $xs-tablet)
      margin-left: 0
      margin-bottom: 100%
      overflow: visible
      width: 100%
    .slide
      transition-duration: .5s
      transition-timing-function: ease
      margin: auto
      display: flex
      opacity: 0!important
      padding-left: 13px
      align-items: flex-end
      height: fit-content
      @media (max-width: $s-tablet)
        left: 5%
      @media (max-width: $xs-tablet)
        flex-direction: column
        width: 100%
        padding: 0
        height: 100%
        align-items: center
        justify-content: center
      p
        line-height: 1.2
        margin: 0
        font-family: 'Futura PT Book'
        &:last-child
          color: #AAAAAA
          +locationArticle
          opacity: 0
          transform: translateY(50px)
          transition-duration: .5s
          transition-timing-function: ease
      .way
        color: $gold
        opacity: 0
        +locationArticle
        font-family: 'Futura PT Book'
        transform: translateY(50px)
        transition-duration: .5s
        transition-timing-function: ease
    .swiper-slide-active
      opacity: 1!important
      .title
        opacity: 1
        transition-delay: .6s
        transform: translateY(-15px)
      p
        &:last-child
          opacity: 1
          transition-delay: .8s
          transform: translateY(0)
      .way
        opacity: 1
        transition-delay: .7s
        transform: translateY(0)
        
  &__arrows
    position: absolute
    height: 90%
    justify-content: space-between
    display: flex
    flex-direction: column
    top: 0%
    bottom: 0
    z-index: 9
    margin: auto
    width: 100%
    align-items: center
    @media (max-width: $b-mobile)
      height: 80%
    .arrow
      opacity: 1
      cursor: pointer
      span
        border-top: 1.5px solid $gold
        border-right: 1.5px solid $gold
        width: 14px
        height: 14px
      &_right
        span
          transform: rotate(45deg)
      &_left
        span
          transform: rotate(-135deg)
  &__border
    content: ''
    position: absolute
    transform: rotate(45deg)
    border: 2px solid #5E5243
    width: 73%
    height: 73%
    top: 0
    bottom: 0
    margin: auto
    left: 0
    right: 0
    @media (max-width: $b-mobile)
      width: 60%
      height: 60%
    @media (max-width: $m-mobile)
      width: 70%
      height: 70%
    &:hover
      line
    svg
      width: calc(100% + 4px)
      height: calc(100% + 4px)
      bottom: -2px
      right: -2px
      position: absolute
      transform: rotate(-90deg)
      line
        stroke-width: 5
        stroke: #CFA463
        stroke-dasharray: 100%
        stroke-dashoffset: 100%
      .stroke--active
        animation: strokeanim linear 0.6s forwards
@keyframes strokeanim
  to
    stroke-dashoffset: 0
</style>
