<template lang="pug">
  .page-scroll(:class="theme")
    .page-scroll__inner(
      :class="type"
      )
      .head__part(:style="{ transform: `scale3d(${brightness/100}, ${brightness/100}, 1)`}")
        h1.title-4.title
          span P
          span r
          span o
          span g
          span r
          span e
          span s
          span s
        router-link(:to="link.route" class="link-sub router__link circle__link") {{ link.name }}
      .content__part(
        :style="{ transform: `translate3d(-${translate}px, 0, 0) ` }"
        ref="container")
        .border(:style="{ transform: `scaleY(${borderScale})` }")
        slot
</template> 

<script>
import VirtualScroll from "virtual-scroll";
import inobounce from "inobounce";
import loop from "../../../utils/loop";
const roundDec = n => Math.round(n * 100) / 100;
const lerp = (a, b, n) => (1 - n) * a + n * b;
export default {
  name: "PageScroll",
  props: ["theme", "type", "title", "link"],
  data: () => ({
    scroll: 0,
    translate: 0,
    scrollValue: 0,
    brightness: 100,
    borderScale: 1,
    vs: null
  }),
  beforeDestroy() {
    loop.remove("checkSmooth");
    this.vs.off(this.onScroll);
    loop.stop(true);
  },
  methods: {
    onScroll(e) {
      const scroll = this.scroll + -1 * e.deltaY;
      this.scroll = Math.min(
        Math.max(scroll, 0),
        this.$refs.container.scrollWidth - window.innerWidth
      );
    },
    setup() {
      loop.start();
      this.vs = new VirtualScroll({
        mouseMultiplier: 0.7,
        touchMultiplier: 0.7,
        passive: true
      });
      loop.add(this.checkSmooth, "checkSmooth");
      inobounce.enable();
      this.vs.on(this.onScroll);
    },
    animHead() {
      if (this.scroll > 100) {
        this.$el.querySelector(".head__part").classList.add("animated");
      } else {
        this.$el.querySelector(".head__part").classList.remove("animated");
      }
    },
    showPage() {
      this.$el.classList.add("active");
      this.carouselActive = true;
    },
    checkSmooth() {
      if (Math.round(this.scroll) !== Math.round(this.translate)) {
        this.translate = roundDec(lerp(this.translate, this.scroll, 0.07));
        if (this.scroll < 1000) {
          this.borderScale =
            roundDec(lerp(this.translate, this.scroll, 0.07)) / 800 + 1;
          this.brightness =
            100 - roundDec(lerp(this.translate, this.scroll, 0.07)) / 10;
        }
      }
      this.animHead();
    }
  },
  mounted() {
    this.showPage();
    if (window.innerWidth > 900) {
      this.setup();
      this.scrollWidth = this.$refs.container.offsetWidth;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.page-scroll.light
  background: $light

.page-scroll
  min-height: 100vh
  transition-delay: .75s
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
  transition-duration: 2s
  transform: translateX(50vw)
  padding: 0vh 0 0 $head
  @media (max-width: $b-tablet)
    padding: 0 0 0vh 0
    margin-bottom: 10vh
    min-height: auto
    height: 100vh
    display: block
  &__inner
    height: 100vh
    display: flex
    position: relative
    @media (max-width: $b-tablet)
      height: auto
      flex-direction: column
    .head__part
      +center-flex
      display: flex
      background: $light
      height: 100%
      position: fixed
      flex-direction: column
      width: 40%
      //filter: brightness(50%)
      @media (max-width: $b-tablet)
        width: 100%
        position: static
        padding: 100px 0 10px 0
      .link-sub
        transition-duration: .8s
        opacity: 0
        transition-delay: .5s
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        @media (max-width: $b-tablet)
          display: none
      .title-4
        transition-duration: .8s
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        margin-bottom: 30px
        @media (max-width: $s-desktop)
          margin-bottom: 15px
        span
          @include delay(transition, 8, 0.1s)
          transition-duration: .8s
          transform: translateX(70px)
          opacity: 0
          display: inline-block
          transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
    .content__part
      margin-left: 40%
      -webkit-font-smoothing: subpixel-antialiased
      position: relative
      backface-visibility: hidden
      background: $light
      padding: 0 7vw
      height: 100%
      @media (max-width: $b-tablet)
        margin: 0
        height: auto
      .border
        // transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        // transition-duration: .8s
        content: ''
        position: absolute
        left: 0
        height: 60vh
        width: 1px
        top: 0
        transform: scale(1)
        bottom: 0
        margin: auto
        background: $grey4
        @media (max-width: $b-tablet)
          display: none
.head__part.animated
  .title-4
    span
      opacity: 0
      transform: translateY(-100%)
  .link-sub
    letter-spacing: 7px
    opacity: 0
    transition-delay: 0s
.page-scroll.active
  transform: translateX(0vw)
  .link-sub
    opacity: 1
    transition-delay: 1.9s
  .title
    span
      transform: translateX(0)
      opacity: 1
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
</style>