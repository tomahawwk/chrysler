<template lang='pug'>
.base(id="itemsWrapper").light
  CursorCustom(:theme="theme")
  .fullview
      .fullview__item(
        v-for="item in items"
      )
        .modal
          .title
            span(
              v-for="item in item.date"
            ) {{ item }}
          .text
            p.p-1(
              v-for="item in item.text"
            ) {{ item }}
      button(class="fullview__close cursor__link" aria-label="Close preview")
  HorizontalViewAW(:theme="theme" :appear="appear" :orientation="orientation")
    PageScroll(
      :theme="theme"
      :type="type"
      :title="pageProps.title"
      :link="pageProps.link"
      
      )
      ProgressCarousel(:items="items")
</template>

<script>
import CursorCustom from "../../components/elements/Cursor/index";
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import PageScroll from "../../components/blocks/PageScroll/index";
import ProgressCarousel from "../../components/blocks/ProgressCarousel/index";
import { items } from "./items";
require("../../components/blocks/FullscreenAnimation/base.css");
export default {
  name: "Progress",
  data() {
    return {
      items: [],
      pageProps: {
        title: "Progress",
        link: {
          name: "Shedule",
          route: "/"
        }
      },
      scrollbar: true,
      type: "half",
      orientation: "vertical",
      preloader: true,
      theme: "light",
      appear: "normal"
    };
  },
  methods: {
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    }
  },
  components: {
    HorizontalViewAW,
    PageScroll,
    ProgressCarousel,
    CursorCustom
  },
  mounted() {
    this.items = items;
  },
  beforeDestroy() {
    document.querySelector("canvas").remove();
    document.querySelector(".fullview__close").remove();
    this.clearCursor();
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
@import "src/sass/general/page"
.fullview__close
  opacity: 0!important
  transition-duration: .6s
  transition-delay: 0s
  transform: initial!important
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
  @media (max-width: $b-tablet)
    right: 3vw
  @media (max-width: $b-mobile)
    right: 0
    top: 0
    height: 100px!important
    justify-content: flex-end
    background: $light
  &:before, &:after
    transition-duration: .6s
    transition-delay: .8s
    //transition-delay: 0s
    transition-timing-function: ease
    @media (max-width: $b-mobile)
      top: 30px
      height: 1px
.fullview__close.active
  opacity: 1!important
  transition-delay: .8s
  &:before
    transform: rotate(45deg)
  &:after
    transform: rotate(-45deg)
.fullview
  padding: 0
.fullview__item
  opacity: 0
  visivbility: hidden
  display: flex
  top: 0
  left: 0
  padding: 0 7vw
  width: 100vw
  justify-content: flex-end
  height: 100vh
  align-items: flex-start
  @media (max-width: $b-tablet)
    padding: 0
  @media (max-width: $b-mobile)
    align-items: flex-end
  .modal
    height: 70vh
    background: $light
    transition-duration: 1s
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
    width: 28vw
    display: flex
    flex-direction: column
    +modalPadding
    justify-content: flex-end
    transition-delay: 0s
    transform: translateY(-70vh)
    @media (max-width: $m-desktop)
      width: 33vw
    @media (max-width: $s-desktop)
      width: 40vw
    @media (max-width: $b-tablet)
      width: 50vw
    @media (max-width: $s-tablet)
      height: 100vh
      transform: translateY(-100vh)
    @media (max-width: 650px)
      width: 60vw
    @media (max-width: 550px)
      width: 70vw
    @media (max-width: $b-mobile)
      width: 100vw
      height: 50vh
      transform: translateY(50vh)
    @media (max-width: $m-mobile)
      height: 60vh
      transform: translateY(60vh)
    .title
      overflow: hidden
      line-height: .96
      font-family: 'Baza'
      margin-bottom: 35px
      font-size: 62px
      span
        transition-duration: .5s
        display: inline-block
        transform: translateY(100%)
        opacity: 0
        min-width: 14px
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        &:nth-child(1)
          transition-delay: 0s
        &:nth-child(2)
          transition-delay: .05s
        &:nth-child(3)
          transition-delay: .1s
        &:nth-child(4)
          transition-delay: .15s
        &:nth-child(5)
          transition-delay: .2s
        &:nth-child(6)
          transition-delay: .25s
        &:nth-child(7)
          transition-delay: .3s
        &:nth-child(8)
          transition-delay: .35s
        &:nth-child(9)
          transition-delay: .4s
        &:nth-child(10)
          transition-delay: .45s
        &:nth-child(11)
          transition-delay: .5s
        &:nth-child(12)
          transition-delay: .55s
        
    .text
      display: flex
      flex-direction: column
      p
        font-size: 15px
        color: #5A5852
        margin: 0
        transition-duration: .5s
        display: inline-block
        transform: translateY(100%)
        min-width: 14px
        opacity: 0
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        transition-delay: 0.1s
        @media (max-width: $b-tablet)
          width: max-content
          font-size: 14px
    &--active
      transition-delay: .3s
      transform: translateY(0)
      .title
        span
          transform: translateY(0)
          opacity: 1
          transition-timing-function: ease
          &:nth-child(1)
            transition-delay: 1s
          &:nth-child(2)
            transition-delay: 1.05s
          &:nth-child(3)
            transition-delay: 1.1s
          &:nth-child(4)
            transition-delay: 1.15s
          &:nth-child(5)
            transition-delay: 1.2s
          &:nth-child(6)
            transition-delay: 1.25s
          &:nth-child(7)
            transition-delay: 1.3s
          &:nth-child(8)
            transition-delay: 1.35s
          &:nth-child(9)
            transition-delay: 1.4s
          &:nth-child(10)
            transition-delay: 1.45s
          &:nth-child(11)
            transition-delay: 1.5s
          &:nth-child(12)
            transition-delay: 1.55s
      .text
        p
          transform: translateY(0)
          opacity: 1
          &:nth-child(1)
            transition-delay: 1.3s
          &:nth-child(2)
            transition-delay: 1.35s
          &:nth-child(3)
            transition-delay: 1.4s
          &:nth-child(4)
            transition-delay: 1.45s
          &:nth-child(5)
            transition-delay: 1.5s
          &:nth-child(6)
            transition-delay: 1.55s
          &:nth-child(7)
            transition-delay: 1.6s
          &:nth-child(8)
            transition-delay: 1.65s
    &--hide
      .title
        span
          transform: translateY(-100%)
      .text
        p
          transform: translateY(-100%)
          opacity: 0s
          &:nth-child(8)
            transition-delay: 0.7s
          &:nth-child(7)
            transition-delay: 0.6s
          &:nth-child(6)
            transition-delay: 0.5s
          &:nth-child(5)
            transition-delay: 0.4s
          &:nth-child(4)
            transition-delay: 0.3s
          &:nth-child(3)
            transition-delay: 0.2s
          &:nth-child(2)
            transition-delay: 0.1s
          &:nth-child(1)
            transition-delay: 0s
  &--current
    opacity: 1
    visibility: visible
      
</style>
