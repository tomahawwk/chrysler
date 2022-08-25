<template lang="pug">
  .apartments
    .apartments__head
      h1.title.title-4
        span A
        span p
        span a
        span r
        span t
        span m
        span e
        span n
        span t
        span s
    .apartments__content
      .mobile__controls
        .mobile__prev
          img(src="./prev.svg")
        .mobile__next
          img(src="./next.svg")
      swiper(
        :options="swiperOption"
        ref="swiper"
        class="apartments__list"
        @slideNextTransitionStart="slideNext"
        @slidePrevTransitionStart="slidePrev"
      )
        swiper-slide.item.circle-cursor(
          v-for="(item, index) in apartments"
          
        )
          .inner(
            v-on:click="open"
            :data-slide="index + 1"
            @mouseenter="checkRect"
            @mouseleave="clearRect"
            )
            img(:src="item.preview" :alt="item.type")
            .title {{ `Type ${item.type}` }}
            .area {{ `${item.totalArea}м2`}}
      .intersect
        .rect-tl
        .rect-tr
        .rect-bl
        .rect-br
    .apartments__slider
      .close.mobile-close(@click="close")
      .fade
      .slides
        .slide(
          v-for="(item, index) in apartments"
          :data-slide="index + 1"
        )
          img(
            :src="item.preview"
            )
      .mobile-properties
        .prop
          .count
            span {{ sliderOption.type }}
          .desc
            span Type
        .prop
          .count
            span {{ sliderOption.totalArea }}
          .desc
            span Total area
        .prop
          .count
            span {{ sliderOption.floor }}
          .desc
            span Floor
        .prop
          .count
            span {{ sliderOption.rooms }}
          .desc
            span Bedrooms
      .mobile-choose.select-button Choose apartments
      .optional
        .properties
          .close.cursor__link(@click="close")
          .properties__content
            .prop
              .count
                span {{ sliderOption.type }}
              .desc
                span Type
            .prop
              .count
                span {{ sliderOption.totalArea }}
              .desc
                span Total area
            .prop
              .count
                span {{ sliderOption.floor }}
              .desc
                span Floor
            .prop
              .count
                span {{ sliderOption.rooms }}
              .desc
                span Bedrooms
          .select-button.circle__link Choose apartment
        .controls
          .next.circle__link.slider-arrow(@click="next")
            img(src="./next.svg")
          .counter {{ `${(sliderOption.current)}/${apartments.length}` }}
          .prev.circle__link.slider-arrow(@click="prev")
            img(src="./prev.svg")
        .compas
          img.nord-arrow(
            src="./nord-arrow.svg" alt="Nord"
            :style="`transform: rotate(${sliderOption.azimuth}deg)`"
            )
</template>

<script>
var intersectRect = require("intersect-rect");
require("./custom-swiper.css");
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
export default {
  name: "PageApartments",
  data: () => ({
    swiperCounter: 1,
    swiperOption: {
      direction: "vertical",
      spaceBetween: 0,
      slidesPerView: "auto",
      mousewheel: true,
      slidesPerGroup: 1,
      speed: 1000,
      navigation: {
        prevEl: ".mobile__prev",
        nextEl: ".mobile__next"
      },
      breakpoints: {
        1200: {
          slidesPerView: 1,
          direction: "horizontal"
        }
      }
    },
    sliderOption: {
      azimuth: 0,
      current: 0,
      goSlider: false,
      all: 0,
      type: "0",
      totalArea: "0",
      floor: "0",
      rooms: "0"
    },
    apartments: [
      {
        type: "1-1",
        totalArea: 64,
        floor: "3-7",
        azimuth: 12,
        rooms: "2",
        preview: require("./items/1.png")
      },
      {
        type: "1-2",
        totalArea: 78,
        floor: "7-12",
        azimuth: 26,
        rooms: "3",
        preview: require("./items/1.png")
      },
      {
        type: "1-3",
        totalArea: 28,
        floor: "12-15",
        azimuth: 36,
        rooms: "1",
        preview: require("./items/1.png")
      },
      {
        type: "1-4",
        totalArea: 99,
        floor: "15-19",
        azimuth: 0,
        rooms: "4",
        preview: require("./items/1.png")
      },
      {
        type: "1-5",
        totalArea: 64,
        floor: "3-7",
        rooms: "2",
        azimuth: 69,
        preview: require("./items/1.png")
      },
      {
        type: "1-6",
        totalArea: 78,
        floor: "7-12",
        azimuth: 145,
        rooms: "3",
        preview: require("./items/1.png")
      },
      {
        type: "1-7",
        azimuth: 220,
        totalArea: 28,
        floor: "12-15",
        rooms: "1",
        preview: require("./items/1.png")
      },
      {
        type: "1-8",
        azimuth: 200,
        totalArea: 99,
        floor: "15-19",
        rooms: "4",
        preview: require("./items/1.png")
      },
      {
        type: "1-9",
        azimuth: 120,
        totalArea: 234,
        floor: "12-13",
        rooms: "6",
        preview: require("./items/1.png")
      },
      {
        type: "1-10",
        azimuth: 340,
        totalArea: 159,
        floor: "12-13",
        rooms: "7",
        preview: require("./items/1.png")
      }
    ]
  }),
  methods: {
    showPage() {
      this.$el.classList.add("active");
    },
    slideNext() {
      if (window.innerWidth > 1200) {
        this.swiperCounter++;
        if (this.swiperCounter > this.apartments.length / 2 - 2) {
          this.$refs.swiper.swiper.allowSlideNext = false;
        }
      }
    },
    slidePrev() {
      if (window.innerWidth > 1200) {
        if ((this.$refs.swiper.swiper.allowSlidePrev = true)) {
          this.swiperCounter--;
        }
        this.$refs.swiper.swiper.allowSlideNext = true;
      }
    },
    mobile() {
      setTimeout(() => {
        document
          .querySelector(".base")
          .appendChild(this.$el.querySelector(".controls"));
      }, 1000);
    },
    getSliderHeight() {
      const len = Math.ceil(this.apartments.length / 2),
        height = this.$el
          .querySelector(".apartments__list .item")
          .getBoundingClientRect().height,
        sliderHeight = len * height - height;

      // this.$el.querySelector(
      //   ".apartments__list"
      // ).style.height = `${sliderHeight}px`;
      console.log(sliderHeight - height * 2);
    },
    mobileControls() {
      document.querySelector(".controls").classList.toggle("controls--active");
    },
    checkRect() {
      const tl = this.$el.querySelector(".rect-tl").getBoundingClientRect(),
        tr = this.$el.querySelector(".rect-tr").getBoundingClientRect(),
        bl = this.$el.querySelector(".rect-bl").getBoundingClientRect(),
        br = this.$el.querySelector(".rect-br").getBoundingClientRect(),
        current = event.target.getBoundingClientRect();
      if (intersectRect(current, tl)) {
        event.target.classList.add("origin-tl");
      } else if (intersectRect(current, tr)) {
        event.target.classList.add("origin-tr");
      } else if (intersectRect(current, bl)) {
        event.target.classList.add("origin-bl");
      } else if (intersectRect(current, br)) {
        event.target.classList.add("origin-br");
      }
    },
    clearRect() {
      if (!event.target.classList.contains("active")) {
        event.target.classList.remove("origin-bl");
        event.target.classList.remove("origin-br");
        event.target.classList.remove("origin-lt");
        event.target.classList.remove("origin-lr");
      }
    },
    open(event) {
      const slides = this.$el.querySelectorAll(".apartments__slider .slide");
      this.$el.classList.add("open");
      event.target.classList.add("active");
      setTimeout(() => {
        event.target.classList.add("active-second");
      }, 500);

      this.sliderOption.current = event.target.dataset.slide;
      this.getActive();
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }
      this.mobileControls();
    },
    close() {
      const inners = this.$el.querySelectorAll(".apartments__list .inner"),
        slides = this.$el.querySelectorAll(".apartments__slider .slide");
      this.$el.querySelector(".fade").classList.add("fade--active");
      this.mobileControls();
      setTimeout(() => {
        for (let i = 0; i < inners.length; i++) {
          inners[i].classList.remove("active");
          slides[i].classList.remove("active");
          inners[i].classList.remove("active-second");
          inners[i].classList.remove("fadeout");
          this.$el.classList.remove("open");
          this.$el.querySelector(".fade").classList.remove("fade--active");
        }
      }, 500);
    },
    getActive() {
      const currentObj = this.apartments[this.sliderOption.current - 1],
        slides = this.$el.querySelectorAll(".apartments__slider .slide");
      this.sliderOption.azimuth = currentObj.azimuth;
      this.sliderOption.type = currentObj.type;
      this.sliderOption.totalArea = currentObj.totalArea;
      this.sliderOption.floor = currentObj.floor;
      this.sliderOption.rooms = currentObj.rooms;
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }
      if (this.sliderOption.goSlider == true) {
        slides[this.sliderOption.current - 1].classList.add("active");
      }
    },
    fadeInner() {
      const inners = this.$el.querySelectorAll(".apartments__list .inner");
      this.sliderOption.goSlider = true;
      for (let i = 0; i < inners.length; i++) {
        if (inners[i].classList.contains("active")) {
          inners[i].classList.add("fadeout");
          setTimeout(() => {
            inners[i].classList.remove("active");
            inners[i].classList.remove("active-second");
          }, 700);
        }
      }
    },
    next() {
      if (this.sliderOption.current < this.apartments.length) {
        this.sliderOption.current++;
        this.fadeInner();
        this.getActive();
      }
    },
    prev() {
      if (this.sliderOption.current > 1) {
        this.sliderOption.current--;
        this.sliderOption.showFirst = true;
        this.fadeInner();
        this.getActive();
      }
    },
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    }
  },
  mounted() {
    if (window.innerWidth <= 900) {
      this.mobile();
    }
    this.showPage();
    this.getSliderHeight();
  },
  beforeDestroy() {
    this.clearCursor();
  }
};
</script>

<style lang="sass">
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.apartments
  width: 100vw
  transform: translateX(50vw)
  transition-delay: .75s
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
  transition-duration: 2s
  height: 100vh
  position: relative
  padding: 0 $view-indent 0 $head
  display: flex
  @media (max-width: $b-tablet)
    display: block
    padding: 100px $view-indent-mobile 0
    overflow: hidden
  &__list
    display: flex
    position: relative
    overflow: visible
    flex-wrap: wrap
    @media (max-width: $b-tablet)
      height: 100%
    @media (max-width: $b-mobile)
      height: 80%
  .item
    width: 49.9%
    position: relative
    height: 50vh
    transition-duration: .7s
    transform: translateX(10vw)
    opacity: 0
    border-bottom: 1px solid $grey3
    @media (max-width: $sm-desktop)
      width: 100%
      border: none
      margin: 15vh 0
      height: 70vh
    @media (max-width: $b-tablet)
      margin: 0
      height: 100%
    &:nth-child(4n+1)
      top: 0
    &:nth-child(odd)
      border-right: 1px solid $grey3
      transition-delay: 1.7s
      @media (max-width: $sm-desktop)
        border-right: none
    &:nth-child(even)
      transition-delay: 1.8s
    .inner
      +center-flex
      display: flex
      width: 100%
      transition-duration: .7s
      flex-direction: column
      height: 100%
    img
      transition-duration: inherit
      width: 60%
      transition-delay: inherit
      pointer-events: none
      @media (max-width: $sm-desktop)
        width: 70%
      @media (max-width: $b-tablet)
        width: 50%
      @media (max-width: $b-mobile)
        width: 70%
    .title
      font-family: 'Woodland Light'
      text-transform: uppercase
      font-size: 20px
      transition-delay: inherit
      letter-spacing: 2px
      transition-duration: inherit
      margin-top: 35px
    .area
      font-family: 'Futura PT Book'
      font-size: 11px
      transition-delay: inherit
      transition-duration: inherit
      text-transform: uppercase
      letter-spacing: 3px
      margin-top: 12px  
  &__head
    width: 30%
    display: flex
    border-right: 1px solid $grey3
    position: relative
    transition-duration: .7s
    background: $light
    +center-flex
    @media (max-width: $sm-desktop)
      width: 50%
    @media (max-width: $b-tablet)
      width: 100%
      border: none
    @media (max-width: $b-mobile)
      border-bottom: 1px solid $grey3
    .title
      margin: 0 0 $view-indent
      span
        @include delay(transition, 8, 0.1s)
        transition-duration: .8s
        transform: translateX(70px)
        opacity: 0
        display: inline-block
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
  &__content
    width: 70%
    position: relative
    padding: 0vh 0 0
    .mobile__controls
      width: 100%
      position: absolute
      height: 100%
      display: none
      transition-duration: .6s
      flex-direction: column
      justify-content: space-between
      padding: $view-indent 0
      @media (max-width: $sm-desktop)
        display: flex
      @media (max-width: $b-tablet)
        flex-direction: row
        padding: 0
        border-top: 1px solid $grey3
      @media (max-width: $b-mobile)
        height: 70px
        bottom: 0px
        position: fixed
      & > div
        height: 70px
        display: flex
        background: $light
        z-index: 2
        +center-flex
        @media (max-width: $b-tablet)
          height: 100%
          width: 70px
        @media (max-width: $b-mobile)
          width: 50%

        &:first-child
          border-bottom: 1px solid $grey3
          @media (max-width: $b-tablet)
            border-bottom: none
            border-right: 1px solid $grey3
          @media (max-width: $b-mobile)
            border-right: none
          img
            transform: scale(-1, 1)
        &:last-child
          border-top: 1px solid $grey3
          @media (max-width: $b-tablet)
            border-top: none
            border-left: 1px solid $grey3
    @media (max-width: $sm-desktop)
      width: 50%
      overflow: hidden
    @media (max-width: $b-tablet)
      width: 100%
      display: block
      height: 75vh
.apartments.active
  transform: translateX(0)
  .item
    transform: translateX(0)
    opacity: 1
    
  .title
    span
      transform: translateX(0)
      opacity: 1
      &:nth-child(10)
        transition-delay: 2.4s
      &:nth-child(9)
        transition-delay: 2.3s
      &:nth-child(8)
        transition-delay: 2.2s
      &:nth-child(7)
        transition-delay: 2.1s
      &:nth-child(6)
        transition-delay: 2s
      &:nth-child(5)
        transition-delay: 1.9s
      &:nth-child(4)
        transition-delay: 1.8s
      &:nth-child(3)
        transition-delay: 1.7s
      &:nth-child(2)
        transition-delay: 1.6s
      &:nth-child(1)
        transition-delay: 1.5s
.origin
  &-tl
    transform-origin: top left
    @media (max-width: $sm-desktop)
      transform-origin: center right
  &-tr
    transform-origin: top right
  &-bl
    transform-origin: bottom left
  &-br
    transform-origin: bottom right
.intersect
  width: 100%
  height: 100%
  position: absolute
  top: 0
  visibility: hidden
  left: 0
  display: flex
  flex-wrap: wrap
  div
    width: 49.9%
    height: 50vh
    @media (max-width: $sm-desktop)
      width: 100%
      height: 100%
  .rect
    &-tr
      @media (max-width: $sm-desktop)
        display: none
    &-bl
      @media (max-width: $sm-desktop)
        display: none
    &-br
      @media (max-width: $sm-desktop)
        display: none
    
.apartments__slider
  width: 100%
  height: 100%
  top: 0
  left: 0
  position: absolute
  padding-left: 73px
  visibility: hidden
  @media (max-width: $b-tablet)
    padding-left: 0
    height: auto
    margin-bottom: 70px
  .mobile
    &-properties
      display: none
      @media (max-width: $b-tablet)
        border-top: 1px solid $grey3
        transition-duration: .6s
        transform: translateY(10vh)
        opacity: 0
        width: 100%
        display: flex
      @media (max-width: $b-mobile)
        flex-wrap: wrap
      .prop
        width: 25%
        border-right: 1px solid $grey3
        margin: 0
        padding: 25px 0
        @media (max-width: $m-mobile)
          width: 50%
        &:nth-child(1)
          @media (max-width: $m-mobile)
            border-bottom: 1px solid $grey3
        &:nth-child(2)
          @media (max-width: $m-mobile)
            border-bottom: 1px solid $grey3
        &:last-child
          border-right: none 
    &-choose
      display: none
      @media (max-width: $b-tablet)
        display: block
        z-index: 1
    &-close
      display: none
      position: absolute
      width: 60px
      height: 60px
      top: 60px
      right: 30px
      @media (max-width: $b-tablet)
        display: block
  .fade
    position: absolute
    top: 0
    left: 0
    width: 100%
    visibility: hidden
    opacity: 0
    height: 100%
    transition-delay: .6s
    z-index: 1
    transition-duration: .5s
    background: $light
    &--active
      visibility: visible
      opacity: 1
      transition-delay: 0s
  .slides
    position: absolute
    top: 0
    width: 70%
    height: 100%
    right: 0
    @media (max-width: $b-tablet)
      width: 100%
      position: static
      height: 600px
    @media (max-width: $b-mobile)
      height: 500px
    @media (max-width: $s-mobile)
      height: 420px
    .slide
      opacity: 0
      width: 100%
      position: absolute
      top: 0
      left: 0
      transition-duration: .7s
      transition-delay: 0s
      padding: 0 0 0% 5%
      height: 100%
      transform: translateX(4vw)
      @media (max-width: $sm-desktop)
        padding: 0 0 0% 9%
      @media (max-width: $b-tablet)
        padding: 0
        transform: translateX(0vw)
      img
        width: 66%
        top: 0px
        margin: auto
        bottom: 0
        display: block
        position: absolute
        @media (max-width: $b-tablet)
          left: 0
          right: 0
        @media (max-width: $b-mobile)
          top: -50px
        @media (max-width: $m-mobile)
          top: -200px
    .slide.active
      opacity: 1
      transition-delay: .7s
      transform: translateX(0vw)
  .optional
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    display: flex
    justify-content: space-between
    .properties
      height: 100%
      padding: $view-indent 0 $view-indent $head
      background: $light
      transform: translateX(-15vw)
      width: 16vw
      transition-timing-function: cubic-bezier(.77,0,.175,1)
      transition-duration: 1s
      transition-delay: 0s
      display: flex
      align-items: center
      flex-direction: column
      justify-content: space-between
      border-right: 1px solid $grey3
      @media (max-width: $l-desktop)
        width: 20vw
        transform: translateX(-20vw)
      @media (max-width: $sm-desktop)
        width: 28vw
        transform: translateX(-28vw)
      @media (max-width: $b-tablet)
        display: none
      &__content
      
    .compas
      position: absolute
      background: $light
      border: 1px solid $grey3
      border-radius: 100%
      width: 80px
      transition-duration: .6s
      height: 80px
      opacity: 0
      transform: translateX(9em)
      top: 4em
      transition-delay: 0s
      right: 9em
      @media (max-width: $b-tablet)
        display: none
      .nord-arrow
        +center
        transition-duration: .6s
        transition-timing-function: cubic-bezier(.77,0,.175,1)
        transition-delay: .2s
        position: absolute
.select-button
  font-family: 'Futura PT'
  text-transform: uppercase
  font-size: 11px
  letter-spacing: 3px
  width: 100%
  text-align: center
  border-top: 1px solid $grey3
  padding: 35px 0
  transition-duration: .5s
  overflow: hidden
  position: relative
  &:before
    content: ''
    transition-timing-function: cubic-bezier(.77,0,.175,1)
    transition-duration: inherit
    position: absolute
    width: 100%
    left: 0
    z-index: -1
    bottom: 0
    transform: translateY(100%)
    background: $beige
    height: 100%
  &:hover:before
    transform: translateY(0)
.prop
  display: flex
  flex-direction: column
  align-items: center
  margin-bottom: 6vh
  @media (max-width: $l-desktop)
    margin-bottom: 3vh
  .count
    font-size: 48px
    font-family: 'Baza'
    overflow: hidden
    @media (max-width: $l-desktop)
      font-size: 40px
  .desc
    font-family: 'Futura PT'
    text-transform: uppercase
    font-size: 11px
    letter-spacing: 3px
    overflow: hidden
    @media (max-width: $l-desktop)
      font-size: 10px
.controls
  height: 100%
  transform: translateX(100px)
  width: $head
  position: relative
  background: $light
  margin-right: $view-indent
  transition-timing-function: cubic-bezier(.77,0,.175,1)
  transition-duration: 1s
  transition-delay: 0s
  border-left: 1px solid $grey3
  @media (max-width: $b-tablet)
    position: fixed
    bottom: 0
    height: 70px
    width: 100%
    padding-bottom: $view-indent-mobile
    border-top: 1px solid $grey3
    display: flex
    flex-direction: row-reverse
    transform: translateX(0) translateY(78px)
  &--active
    @media (max-width: $b-tablet)
      transform: translateX(0) translateY(0px)
  .prev
    img
      transform: scale(-1, 1)
  .slider-arrow
    height: calc(50% - 35px)
    position: relative
    transition-duration: .5s
    display: flex
    +center-flex
    overflow: hidden
    @media (max-width: $b-tablet)
      height: 100%
      width: calc(50% - 35px)
    &:before
      content: ''
      transition-timing-function: cubic-bezier(.77,0,.175,1)
      transition-duration: inherit
      position: absolute
      width: 100%
      left: 0
      z-index: -1
      bottom: 0
      transform: translateX(100%)
      background: $beige
      height: 100%
      @media (max-width: $b-tablet)
        transform: translateX(0) translateY(100%)
    &:not(.disable):hover
      &:before
        transform: translateX(0%)
        @media (max-width: $b-tablet)
          transform: translateX(0) translateY(0%)
  .counter
    height: 70px
    border-top: 1px solid $grey3
    border-bottom: 1px solid $grey3
    width: 100%
    display: flex
    +center-flex
    font-family: 'Futura PT Book'
    font-size: 11px
    letter-spacing: 4px
    @media (max-width: $b-tablet)
      width: 70px
      border-top: none
      border-bottom: none
      border-right: 1px solid $grey3
      border-left: 1px solid $grey3
.apartments.open
  @media (max-width: $b-tablet)
    overflow-y: scroll
    overflow-x: hidden
  
  .mobile__controls
    opacity: 0
  .mobile-properties
    transform: translateY(0)
    opacity: 1
  .swiper-slide-prev
    @media (max-width: $sm-desktop)
      opacity: 0!important
  .apartments__content
    @media (max-width: $sm-desktop)
      overflow: visible
  .apartments__head
    opacity: 0
    //transition-delay: .6s
    
  .apartments__slider
    visibility: visible
    z-index: 1
    .properties, .controls, .compas
      transform: translateX(0)
      opacity: 1
    
    .compas
      transition-delay: 1s
  .apartments__list
    .item
      border-bottom: 1px solid transparent
      &:nth-child(odd)
        border-right: 1px solid transparent
      
      .title
        opacity: 0
      img
        opacity: 0
      .area
        opacity: 0
.inner.active
  img
    opacity: 1!important
    width: 70%
.inner.active-second
  transition-timing-function: ease
  transform: scale(2) translate(-4.5vw, 43px)
  @media (max-width: $sm-desktop)
    transform: scale(1.4) translate(-3vw, 4vh)
  @media (max-width: $b-tablet)
    transform: scale(1) translate(2vw, -6vh) !important
.inner.fadeout
  opacity: 0
  transition-delay: 0s
  transform: scale(2) translate(-0.5vw, 43px)!important
  @media (max-width: $sm-desktop)
    transform: scale(1.4) translate(-3vw, 4vh)!important
  @media (max-width: $b-tablet)
    transform: scale(1) translate(2vw, -6vh) !important
.close
  width: 30px
  height: 30px
  margin-top: 50px
  position: relative
  z-index: 2
  &:before, &:after
    content: ''
    width: 60%
    height: 1.3px
    +center
    background: black
    position: absolute
  &:before
    transform: rotate(45deg)
  &:after
    transform: rotate(-45deg)
</style>