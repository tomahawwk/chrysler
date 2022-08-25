<template lang='pug'>
.base(:class="theme")
  CursorCustom(:theme="theme")
  Horizontal-ViewAW(
    :scroll="true",
    :theme="theme",
    :overlay="overlay",
    :orientation="orientation",
    :scrollbar="scrollbar",
    appear="normal"
  )
    .layers
      .layer.f-layer
        h1.f-title
          span C
          span H
          span R
          span Y
          span S
          span L
          span E
          span R
        .f-subtitle
          span B
          span u
          span i
          span l
          span d
          span i
          span n
          span g
        .layer__bg
          BuildingSVG
      .layer(
        v-for="layer in layers",
        :key="layer.id",
        :data-layer="layer.id",
        :style="{ 'background-image': `url(${layer.src})` }"
      )
    .main(
      ref="container",
      :style="{ transform: `${move}` }",
      @wheel="clearLayers"
    )
      .main-block.layer-trigger
      .main-block.horizontal-content.horizontal-content-1
        Roller(:count="12", :type="1")
        .main-block__content
          .main-block__title
            .title-3.title.title-observe.observe
              span N
              span E
              span W
              span &nbsp
              span Y
              span O
              span R
              span K
            .title-3.title.title-observe.observe
              span L
              span E
              span G
              span E
              span N
              span D

          .description.observe
            span.count 001
            .description__part
              .p-1.text.text-observe
                p The most fanciful and famous top of all of Manhattan's ornamental
                p beauties is certainly the Chrysler Building, a quintessential
                p expression of Jazz-Age New York. Its flashy modernism was
                p communicated through the stainless steel crown with its crescendo
                p of seven scalloped domes and spiky triangular windows.
                p The needle spire stretched its height to 1,046 ft., which won it the title of
                p tallest building in the world from 1930 to 1931, until the completion
                p of the Empire State Building.
              .p-1.text.mobile The most fanciful and famous top of all of Manhattan's ornamental beauties is certainly the Chrysler Building, a quintessential expression of Jazz-Age New York. Its flashy modernism was communicated through the stainless steel crown with its crescendo of seven scalloped domes and spiky triangular windows. The needle spire stretched its height to 1,046 ft., which won it the title of tallest building in the world from 1930 to 1931, until the completion of the Empire State Building.
              router-link.link-border.link.circle__link(to="/") Legenda
        .horizontal-content__pics
          .pic__item.border-pic.observe
            .picture
              img(src="./pics/part-1/part-1_1.jpg")
          .pic__item.dop-pic.observe
            .picture
              img(src="./pics/part-1/part-1_2.jpg")

      .main-block.layer-trigger.observe.trigger-1(
        data-trigger="1",
        data-lax-preset="lazy-200"
      )
      .main-block.horizontal-content.horizontal-content-2
        .main-block__content
          h2.title-5.title With its sky-piercing spire, its sleek, metallic ornament poking out over the streetscape, and its luxurious marble- and metal-lined interiors, the Chrysler Building epitomizes its time: an era of concentrated wealth, industrial power, and large-scale city building. It is often said that architecture is a measure of civilization. If so, there may be few better artifacts of the short-lived epoch called the Roaring Twenties than the Chrysler Building. Ironically, the Art Deco Chrysler Building also marked the end of that dizzying period.
          .description__area
            .description.observe
              .description__part
                .p-1.text.text-observe
                  p The project began in 1927, when entrepreneur William H.
                  p Reynolds, known for developing Dreamland at Coney Island, hired
                  p architect William Van Alen to design a speculative skyscraper, to
                  p be called the Reynolds Building, for a site on the northeast corner
                  p of Lexington Avenue and 42nd Street. The project was planned to rise
                  p 67 stories and 808 feet. In October 1928, the land lease and plans
                  p were acquired by the automobile magnate Walter P.
                  p Chrysler, who was in the news as Time Magazine "Man of the Year" for 1928.
                .p-1.text.mobile The project began in 1927, when entrepreneur William H. Reynolds, known for developing Dreamland at Coney Island, hired architect William Van Alen to design a speculative skyscraper, to be called the Reynolds Building, for a site on the northeast corner of Lexington Avenue and 42nd Street. The project was planned to rise 67 stories and 808 feet. In October 1928, the land lease and plans were acquired by the automobile magnate Walter P. Chrysler, who was in the news as Time Magazine "Man of the Year" for 1928.
                router-link.link-border.link.circle__link(to="/") Локация
            .description.observe
              .description__part
                .p-1.text.text-observe
                  p The project began in 1927, when entrepreneur William H.
                  p Reynolds, known for developing Dreamland at Coney Island, hired
                  p architect William Van Alen to design a speculative skyscraper, to
                  p be called the Reynolds Building, for a site on the northeast corner
                  p of Lexington Avenue and 42nd Street. The project was planned to rise
                  p 67 stories and 808 feet. In October 1928, the land lease and plans
                  p were acquired by the automobile magnate Walter P.
                  p Chrysler, who was in the news as Time Magazine "Man of the Year" for 1928.
                .p-1.text.mobile The project began in 1927, when entrepreneur William H. Reynolds, known for developing Dreamland at Coney Island, hired architect William Van Alen to design a speculative skyscraper, to be called the Reynolds Building, for a site on the northeast corner of Lexington Avenue and 42nd Street. The project was planned to rise 67 stories and 808 feet. In October 1928, the land lease and plans were acquired by the automobile magnate Walter P. Chrysler, who was in the news as Time Magazine "Man of the Year" for 1928.
                router-link.link-border.link.circle__link(to="/") Локация
        .pic__item.dop-pic.observe
          .picture
            img(src="./pics/part-2/part-2_1.jpg")

      .main-block.layer-trigger.observe.trigger-2(
        data-trigger="2",
        data-lax-preset="lazy-200"
      )
      .main-block.horizontal-content.horizontal-content-3
        Roller(:count="12", :type="1")
        .main-block__content
          h2.title-big.title-observe.observe
            .title__part
              span S
              span I
              span L
              span V
              span E
              span R
            .title__part
              span S
              span P
              span I
              span K
              span E
          .description__area
            .description.observe
              span.count 003
              .description__part
                .p-1.text.text-observe
                  p On October 16, 1929, the 185-foot-long spire, assembled in
                  P secret in the building’s tower, emerged from its chrome cocoon
                  p and was bolted triumphantly into place. The gleaming silvery spike
                  p raised the Chrysler Building’s overall height to 1,048 feet, 121 feet taller
                  p than its downtown rival. The spire was fabricated and delivered to the building
                  p in five sections and assembled inside the dome. The drawings created for Popular
                  p Science Monthly in 1930.
                .p-1.text.mobile On October 16, 1929, the 185-foot-long spire, assembled in secret in the building’s tower, emerged from its chrome cocoon and was bolted triumphantly into place. The gleaming silvery spike raised the Chrysler Building’s overall height to 1,048 feet, 121 feet taller than its downtown rival. The spire was fabricated and delivered to the building in five sections and assembled inside the dome. The drawings created for Popular Science Monthly in 1930, above, shows a cutaway diagram of the assembled spire, spanning seven floors of an open well within the steel skeleton ready to be hoisted into place.
                router-link.link-border.link.circle__link(to="/") Дайджест
            .description.observe
              .description__part
                .p-1.text.text-observe
                  p In its exterior form and ornament, the scalloped dome and finial, which seems
                  p like a silver helmet on an almost-anthropomorphic “head,” has no precedent,
                  p nor any clear explanation. An unnamed critic wrote in the Architectural Forum
                  p in October 1930: The Chrysler … stands by itself, something apart and alone.
                  p It is simply the realization, the fulfillment in metal and masonry, of a one-man
                  p dream, a dream of such ambitions and such magnitude as to defy the comprehension
                  p and the criticism of ordinary men or by ordinary standards.
                .p-1.text.mobile In its exterior form and ornament, the scalloped dome and finial, which seems like a silver helmet on an almost-anthropomorphic “head,” has no precedent, nor any clear explanation. An unnamed critic wrote in the Architectural Forum in October 1930: The Chrysler … stands by itself, something apart and alone. It is simply the realization, the fulfillment in metal and masonry, of a one-man dream, a dream of such ambitions and such magnitude as to defy the comprehension and the criticism of ordinary men or by ordinary standards.
                router-link.link-border.link.circle__link(to="/") Дайджест
        .pic__item.observe
          .picture
            img(src="./pics/part-3/part-3_1.jpg")

      .main-block.layer-trigger.observe.trigger-3(
        data-trigger="3",
        data-lax-preset="lazy-200"
      )
      .main-block.horizontal-content.horizontal-content-4
        .main-block__content
          h2.title-3.title.title-observe.observe
            .title__part
              span A
              span N
              span &nbsp
              span A
              span R
              span T
              span I
              span S
              span T
              span I
              span C
            .title__part
              span E
              span N
              span D
              span E
              span A
              span V
              span O
              span R

          .description.observe
            span.count 004
            .description__part
              .p-1.text.text-observe
                p The Chrysler Building has been home to many a New York business.
                p Upon completion, a viewing room was open to the public on the 71st
                p floor. However, by 1945 it was closed. The 71st floor remains the highest
                p occupied floor in the Chrysler Building. Many of the building’s initial
                p purposes included being an active transmitter for radio and television stations.
                p Longstanding NYC networks such as WCBS-TV and WKTU would use it for that very purpose.
                p Despite being a prominent function at the time, commercial broadcast stations
                p are no longer located in the skyscraper
              .p-1.text.mobile The Chrysler Building has been home to many a New York business. Upon completion, a viewing room was open to the public on the 71st floor. However, by 1945 it was closed. The 71st floor remains the highest occupied floor in the Chrysler Building. Many of the building’s initial purposes included being an active transmitter for radio and television stations. Longstanding NYC networks such as WCBS-TV and WKTU would use it for that very purpose. Despite being a prominent function at the time, commercial broadcast stations are no longer located in the skyscraper
              router-link.link-border.link.circle__link(to="/") Галерея
        .horizontal-content__pics
          .pic__item.border-pic.observe
            .picture
              img(src="./pics/part-4/part-4_1.jpg")
          .pic__item.dop-pic.observe
            .picture
              img(src="./pics/part-4/part-4_2.jpg")
          .decorate
        .pic__item.single-pic.observe
          .picture
            img(src="./pics/part-4/part-4_3.jpg")
        .main-block__content.main-block__content--second
          h2.title-6.title.title-observe.observe
            span O
            span N
            span &nbsp
            span T
            span H
            span E
            span &nbsp
            span I
            span N
            span S
            span I
            span D
            span E
          .description.observe
            span.count 005
            .description__part
              .p-1.text.text-observe
                p The Chrysler Building has been home to many a New York business.
                p Upon completion, a viewing room was open to the public on the 71st
                p floor. However, by 1945 it was closed. The 71st floor remains the highest
                p occupied floor in the Chrysler Building. Many of the building’s initial
                p purposes included being an active transmitter for radio and television stations.
                p Longstanding NYC networks such as WCBS-TV and WKTU would use it for that very purpose.
                p Despite being a prominent function at the time, commercial broadcast stations
                p are no longer located in the skyscraper
              .p-1.text.mobile The Chrysler Building has been home to many a New York business. Upon completion, a viewing room was open to the public on the 71st floor. However, by 1945 it was closed. The 71st floor remains the highest occupied floor in the Chrysler Building. Many of the building’s initial purposes included being an active transmitter for radio and television stations. Longstanding NYC networks such as WCBS-TV and WKTU would use it for that very purpose. Despite being a prominent function at the time, commercial broadcast stations are no longer located in the skyscraper
              router-link.link-border.link.circle__link(to="/") Галерея
      .main-block.layer-trigger.observe.trigger-4(
        data-trigger="4",
        data-lax-preset="lazy-200"
      )
      .main-block.horizontal-content.horizontal-content-5
        .border-effect-trigger.observe
        Building
        .main-block__content
          h2.title-3.title.title-observe.observe.uppercase
            span N
            span U
            span M
            span B
            span E
            span R
            span S
          .cells.observe
            .line-middle
            .cell.observe(v-for="cell in cells", :class="`cell-${cell.id}`")
              .count
                span.ct(v-for="ct in cell.count") {{ ct }}
              .text {{ cell.text }}
              .cell__inner
                span.line(v-for="i in 4", :class="`line-${i}`")
        .layout
          router-link(to="/gallery")
            .layout__arrow
            span GALLERY
            .layout__arrow
  .progressbar
    .mask
      //- input.thumbler(
      //-   type="range"
      //-   min="0"
      //-   max="100"
      //-   v-model="rangeValue"
      //-   @input="onThumbler"
      //-   )
      .line__section
      .text.circle__link(@click="movePage", data-scroll="1", data-trigger="0") New york legend
      .line__section
      .text.circle__link(@click="movePage", data-scroll="3", data-trigger="1") Location
      .line__section
      .text.circle__link(@click="movePage", data-scroll="5", data-trigger="2") Life style
      .line__section
      .text.circle__link(@click="movePage", data-scroll="7", data-trigger="3") Art deco
      .line__section
      .text.circle__link(@click="movePage", data-scroll="9", data-trigger="4") PROJECT
      .line__section
    .line(
      :style="`-webkit-clip-path:polygon(0px 0px, ${scrollValue}% 0px, ${scrollValue}% 100%, 0% 100%)`"
    )
      .line__section
      .text.circle__link(@click="movePage", data-scroll="1") New york legend
      .line__section
      .text.circle__link(@click="movePage", data-scroll="3") Location
      .line__section
      .text.circle__link(@click="movePage", data-scroll="5") Life style
      .line__section
      .text.circle__link(@click="movePage", data-scroll="7") Art deco
      .line__section
      .text.circle__link(@click="movePage", data-scroll="9") PROJECT
      .line__section
</template>

<script>
import CursorCustom from "../../components/elements/Cursor/index";
import VirtualScroll from "virtual-scroll";
import loop from "../../utils/loop";
import { triggers } from "./scripts/triggers";
import { scrollAnim } from "./scripts/scroll-anim";
import { parallax } from "./scripts/parallax";
import lax from "lax.js";
// Компоненты
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import Roller from "../../components/elements/Roller/index";
import BuildingSVG from "../../components/elements/BuildingSVG/index";
import Building from "../../components/blocks/Building/index";
const roundDec = (n) => Math.round(n * 100) / 100;
const lerp = (a, b, n) => (1 - n) * a + n * b;
export default {
  name: "MainAW",
  data: () => ({
    theme: "dark",
    scroll: 0,
    translate: 0,
    scrollValue: 0,
    orientation: "vertical",
    move: "",
    overlay: "none",
    appear: "main",
    scrollbar: true,
    vs: null,
    layers: [
      {
        id: 2,
        src: require("./layers/1.jpg"),
      },
      {
        id: 3,
        src: require("./layers/2.jpg"),
      },
      {
        id: 4,
        src: require("./layers/3.jpg"),
      },
      {
        id: 5,
        src: require("./layers/4.jpg"),
      },
      {
        id: 6,
        src: require("./layers/5.jpg"),
      },
      {
        id: 7,
      },
    ],
    scrollBarArray: [
      "Legenda",
      "Location",
      "Life style",
      "Art deco",
      "Project",
    ],

    cells: [
      {
        id: 1,
        count: [7, 7],
        text: "Floors",
      },
      {
        id: 2,
        count: [3, 9, 2],
        text: "Rivets used",
      },
      {
        id: 3,
        count: [3, 4],
        text: "Elevators",
      },
      {
        id: 4,
        count: [3, 1, 9, "m"],
        text: "Height",
      },
      {
        id: 5,
        count: ["$", 1, 5],
        text: "millons - cast",
      },
    ],
    ratios: [],
    covers: [],
  }),
  components: {
    HorizontalViewAW,
    Roller,
    CursorCustom,
    BuildingSVG,
    Building,
  },
  mounted() {
    this.start();
    scrollAnim();
  },
  beforeDestroy() {
    loop.remove("checkSmooth");
    this.vs.off(this.onScroll);
    loop.stop(true);
    this.clearCursor();
  },
  methods: {
    clearLayers() {
      const layers = this.$el.querySelector(".layers");
      layers.classList.remove("hide");
    },
    start() {
      if (window.innerWidth > 900) {
        this.setup();
        this.$el.querySelector(".f-title").classList.add("show");
        this.$el.querySelector(".f-subtitle").classList.add("show");
        this.$el.querySelector(".progressbar").classList.add("active");
      } else {
        this.mobileScroll();
        this.checkiOS();
      }
    },
    movePage() {
      const scrollParts = this.$el.querySelectorAll(".main-block"),
        layers = this.$el.querySelector(".layers"),
        scrollStep = this.$refs.container.scrollWidth / scrollParts.length;
      layers.classList.add("hide");
      this.scroll = scrollStep * event.target.dataset.scroll;
    },
    checkiOS() {
      var iOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;
      if (iOS == true) {
        this.$el.querySelector(".main").classList.add("main--ios");
      }
    },
    mobileScroll() {
      lax.setup();
      const layers = this.$el.querySelectorAll(".layer-trigger");
      for (let i = 0; i < layers.length; i++) {
        lax.addElement(layers[i]);
      }
      window.addEventListener(
        "scroll",
        function (x) {
          lax.update(window.scrollY);
        },
        false
      );
    },
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    },
    setup() {
      loop.start();
      this.vs = new VirtualScroll({
        mouseMultiplier: 1,
        touchMultiplier: 1,
        passive: true,
      });
      loop.add(this.checkSmooth, "checkSmooth");
      this.vs.on(this.onScroll);
    },
    onScroll(e) {
      const scroll = this.scroll + -1 * e.deltaY;
      triggers();
      this.scroll = Math.min(
        Math.max(scroll, 0),
        this.$refs.container.scrollWidth - window.innerWidth
      );
    },
    scrollBar() {
      var scrollBarWidth =
        this.scroll / (this.$refs.container.offsetWidth - window.innerWidth);
      this.scrollValue = scrollBarWidth * 100;
    },
    checkSmooth() {
      this.scrollBar();
      if (Math.round(this.scroll) !== Math.round(this.translate)) {
        this.getRatio();
        if (
          this.$el
            .querySelector(".border-effect-trigger")
            .classList.contains("animated")
        ) {
          document.querySelector(".border__right").classList.add("open");
        } else {
          document.querySelector(".border__right").classList.remove("open");
        }
        parallax(this.scroll);
        const layerList = this.$el.querySelectorAll(".layer");
        for (let i = 0; i < this.ratios.length; i++) {
          var scale = 1.5 - this.ratios[i].intersectionRatio / (1 * 2);
          var brightness = this.ratios[i].intersectionRatio;
          if (i > 0) {
            this.covers[i].style.transform = `scale(${scale})`;
            this.covers[i].style.filter = `brightness(${brightness})`;
          } else {
            this.covers[i].style = `opacity(${brightness})`;
          }
        }
        this.translate = roundDec(lerp(this.translate, this.scroll, 0.07));
        if (window.innerWidth > 900) {
          this.move = `translate3d(-${this.translate}px, 0, 0)`;
        }
      }
    },
    getRatio() {
      const triggerList = this.$el.querySelectorAll(".layer-trigger");
      const covers = this.$el.querySelectorAll(".layer");
      this.covers = covers;
      const observer = new IntersectionObserver(
        (items) => {
          items.forEach(({ target, intersectionRatio }, i) => {
            this.ratios[i] = {
              target,
              intersectionRatio,
            };
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );
      triggerList.forEach((el) => {
        observer.observe(el);
      });
    },
  },
};
</script>
<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
@import "src/sass/general/page"
@import "src/sass/utils/progressbar"
$content-indent: 8vw
.main
  min-height: 100vh
  position: absolute
  display: flex
  z-index: 1
  top: 0
  &--ios
    position: absolute!important
  @media (max-width: $b-tablet)
    display: block
    position: static
    overflow: auto
    -webkit-overflow-scrolling: touch
    height: auto
    width: 100vw
    top: initial
  &-block
    min-width: 100vw
    will-change: transform
    min-height: 100vh
    z-index: 2
    position: relative
    border-left: 1px solid $brown2
    border-right: 1px solid $brown2
    @media (max-width: $b-tablet)
      height: auto
      min-height: initial
    &:first-child
      display: flex
      align-items: flex-end
      h1
        margin-bottom: 20vh
        margin-left: 20vw
        display: flex
        flex-direction: column
        .title
          &:last-child
            margin-top: 20px
            margin-left: 3vw

  .main-block__title
    display: grid
    grid-gap: 30px
    .title-3
      line-height: 80%

  .main-block__content
    display: grid
    grid-gap: 60px
    @media (max-width: $b-tablet)
      padding: 0 45px
    @media (max-width: $b-mobile)
      padding: 0 25px
    .text.mobile
      display: none!important
      @media (max-width: $b-tablet)
        display: inline-block!important
        margin-right: 5px
        font-size: 16px
      p
        @media (max-width: $b-tablet)
          opacity: 1
          transform: none
          display: none

    .title
      @media (max-width: $b-tablet)
        font-size: 36px
        margin-bottom: 18px
        transition-duration: .5s
        opacity: 0
        transform: translateY(40px)
      @media (max-width: $b-mobile)
        font-size: 30px
        text-transform: uppercase
        letter-spacing: 0px
      span
        @media (max-width: $b-tablet)
          opacity: 1
          transform: none
    .description
      display: flex
      grid-gap: 70px
      @media (max-width: $b-tablet)
        flex-direction: сolumn
        grid-gap: 40px
        position: relative
      &__part
        @media (max-width: $b-tablet)
          transition-duration: .5s
          transform: translateY(40px)
          opacity: 0
          transition-delay: .2s
        .text
          margin: 0
          display: flex
          flex-direction: column
      .count
        color: $gold
        line-height: 2
        letter-spacing: 1px
        font-size: 10px
        font-family: 'Futura PT Book'
        @media (max-width: $b-tablet)
          position: absolute
          transition-duration: .5s
          transform: translateY(40px)
          opacity: 0
      .link
        transition-duration: .4s
        opacity: 0
        transition-delay: .5s
        margin-top: 50px
        @media (max-width: $b-tablet)
          opacity: 1
          margin-top: 35px
          margin-left: 4px
          padding: 17px 35px
      p
        max-width: 450px
    .quote
      margin-top: 30px

.layers.hide
  &:before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #1D1A1B
.layers
  position: fixed
  width: 100vw
  height: 100vh
  z-index: 1
  top: 0
  left: 0
  transition-duration: .3s
  .layer
    width: inherit
    height: inherit
    position: absolute
    background-position: center
    will-change: transform
    top: 0
    background-size: 100%
    display: none
    left: 0
    background-repeate: no-repeate
    @media (max-width: $m-desktop)
      background-position: center
      background-size: 110%
    @media (max-width: $sm-desktop)
      background-size: 125%
    @media (max-width: $b-tablet)
      background-size: cover
  .f-layer
    filter: brightness(100%)!important
    transform: scale(1)!important
    display: flex
    grid-gap: 20px
    +center-flex
    flex-direction: column
    h1
      +mainTitle
      color: $gold
      font-weight: 300
      font-family: 'Baza'
  .f-title, .f-subtitle
    overflow-y: hidden
    overflow-x: visible
    margin: 0
    line-height: 0.82
    span
      text-rendering: optimizeLegibility
      -webkit-font-smoothing: antialiased
      transform: translateY(100%)
      transition-timing-function: ease
      display: inline-block
      transition-duration: 1s
      @include delay(transition, 8, 0.1s)
  .show
    transition-duration: .7s
    span
      transform: translateY(0)
      opacity: 1
  .fade
    span
      transform: translateY(-100%)
      opacity: 0

  .f-subtitle
    font-size: 32px
    color: $gold
    font-weight: 300
    font-family: 'Baza'
    span
      margin: 0 3px

.layer-trigger
  background-size: cover
  z-index: 1
  will-change: transform
  @media (max-width: $b-tablet)
    height: auto
    min-height: 100vh
    margin-top: -20vh
    transform: scale(1.1)
  &:first-child
    margin: 0

.layer__bg
  position: absolute
  margin: auto
  right: 0
  left: 0
  display: flex
  justify-content: center
  z-index: -1

.trigger
  &-1
    @media (max-width: $b-tablet)
      background-image: url(./layers/2.jpg)
  &-2
    width: 70vw
    @media (max-width: $b-tablet)
      background-image: url(./layers/3.jpg)
  &-3
    width: 60vw
    @media (max-width: $b-tablet)
      background-image: url(./layers/4.jpg)
  &-4
    @media (max-width: $b-tablet)
      background-image: url(./layers/5.jpg)
.horizontal-content__pics
  position: relative
  @media (max-width: $b-tablet)
    margin-top: 55px
.pic__item
  transition-duration: .2s
  @media (max-width: $b-tablet)
    transition-duration: .6s
    transform: translateY(40px)
    opacity: 0
    transition-delay: .2s
  .picture
    overflow: hidden
    position: relative
    height: 100%
    width: 100%
    img
      margin-left: -25px
      transition-duration: .2s
      width: calc(100% + 50px)
      display: block
.dop-pic
  position: absolute
  @media (max-width: $b-tablet)
    position: static
.border-pic
  position: relative
  &:before
    content: ''
    position: absolute
    top: 30px
    left: -30px
    width: 100%
    height: 100%
    border: 1px solid $brown2
  @media (max-width: $b-tablet)
    &:before
      display: none

.decorate
  position: absolute
  height: 100vh
  width: 50%
  top: 0
  z-index: -1!important
  will-change: transform
  left: 0
  right: 0
  margin: auto
  background-size: cover
  background-image: url(./pics/part-4/decorate.svg)
  @media (max-width: $b-tablet)
    height: auto

$cell: 180px
$cell-m: 150px
$cell-s: 140px
.cells
  display: flex
  z-index: 2
  position: relative
  @media (max-width: $b-tablet)
    width: max-content
  @media (max-width: $s-tablet)
    flex-wrap: wrap
    width: calc(100vw - 45px)
    padding-right: 45px
  @media (max-width: $b-mobile)
    padding-right: 0
  .line-middle
    margin-top: calc(#{$cell} - 0px)
    position: absolute
    background: $brown2
    height: 1px
    width: 100%
    transform: scaleX(0) translateZ(0)
    //transition-delay: .2s
    transition-duration: .4s
    transition-timing-function: cubic-bezier(.165,.84,.44,1)
    transform-origin: right
    @media (max-width: $m-desktop)
      margin-top: calc(#{$cell-m} - 0px)
    @media (max-width: $s-desktop)
      margin-top: calc(#{$cell-s} - 0px)
  .cell
    width: $cell
    height: $cell
    display: flex
    +center-flex
    position: relative
    text-align: center
    flex-direction: column
    padding: 0 20px
    @media (max-width: $m-desktop)
      width: $cell-m
      height: $cell-m
    @media (max-width: $s-desktop)
      width: $cell-s
      height: $cell-s
    @media (max-width: $s-tablet)
      width: 50%
      border: 1px solid $brown2
    &-1
      .cell__inner
        .line-3
          transition-delay: .4s
        .line-2
          height: 200%
          transition-duration: .2s
          transition-delay: .6s
        .line-1
          transition-delay: .5s
    &-2
      .cell__inner
        .line-2
          height: 200%
          bottom: 0
          top: initial
          transition-duration: .2s
          transition-delay: .8s
          transform-origin: bottom
        .line-3
          display: none
        .line-4
          transition-delay: .7s
    &-3
      .cell__inner
        .line-3
          display: none
        .line-1
          transition-delay: .9s
        .line-2
          height: 200%
          transition-delay: .8s
    &-4
      .cell__inner
        .line-3
          display: none
        .line-4
          transition-delay: 1.2s
        .line-2
          bottom: 0
          transform-origin: bottom
          top: initial
          transition-duration: .2s
          height: 200%
          transition-delay: 1.3s
    &-5

      .cell__inner
        .line-3
          display: none
        .line-1
          transition-delay: 1.5s
        .line-2
          transition-delay: 1.6s
    &:nth-child(even)
      .cell__inner
        span
          &:nth-child(4)
            display: none
    &__inner
      position: absolute
      width: 100%
      height: 100%
      +center
      @media (max-width: $s-tablet)
        display: none
      .line
        position: absolute
        background: $brown2
        transition-duration: .1s
        transition-timing-function: linear
        &-1
          top: 0
          width: 100%
          height: 1px
          transform: scaleX(0) translateZ(0)
          transform-origin: left
          left: 0
        &-2
          top: 0
          width: 1px
          height: 100%
          right: 0
          transform-origin: top
          transform: scaleY(0) translateZ(0)
        &-3
          bottom: 0
          width: 1px
          height: 100%
          left: 0
          transform: scaleY(0) translateZ(0)
          transform-origin: bottom
        &-4
          bottom: 0
          width: 100%
          height: 1px
          left: 0
          transform-origin: left
          transform: scaleX(0) translateZ(0)
    &:nth-child(odd)
      margin-top: calc(#{$cell} - 0px)
      margin-left: -1px
      margin-right: -1px
      @media (max-width: $m-desktop)
        margin-top: calc(#{$cell-m} - 0px)
      @media (max-width: $s-desktop)
        margin-top: calc(#{$cell-s} - 0px)
      @media (max-width: $s-tablet)
        margin: 0 -2px -2px calc(50% -1px)
      .cell__inner
        .line
          &-1
            display: none
    .count
      color: $gold
      font-family: 'Futura Light'
      font-size: 54px
      font-weight: 100
      overflow: hidden
      @media (max-width: $b-tablet)
        font-size: 48px
      .ct
        transition-duration: .7s
        display: inline-block
        transform: translateY(105%) translateZ(0)
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
        @media (max-width: $b-tablet)
          transition-delay: 0s!important
        &:nth-child(1)
          transition-delay: .7s
        &:nth-child(2)
          transition-delay: .75s
        &:nth-child(3)
          transition-delay: .8s
        &:nth-child(4)
          transition-delay: .9s
    .text
      font-family: 'Futura PT Book'
      color: rgba(255,255,255,.6)
      font-size: 13px
      transition-delay: 1s
      opacity: 0
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
      transition-duration: .7s
      @media (max-width: $b-tablet)
        transition-delay: .4s!important

.cells.animated
  .line-middle
    @media (max-width: $s-tablet)
      display: none
      transform: scaleX(1) translateZ(0)
  .cell
    .cell__inner
      .line-1
        transform: scaleX(1) translateZ(0)
      .line-2
        transform: scaleY(1) translateZ(0)
      .line-3
        transform: scaleY(1) translateZ(0)
      .line-4
        transform: scaleX(1) translateZ(0)
.cell.animated
  .text
    opacity: 1
  .count
    .ct
      transform: translateY(0) translateZ(0)
.page
  transform: none!important

.horizontal-content
  background: $brown
  width: 110vw
  display: flex
  align-items: center
  padding: 0 9vw
  @media (max-width: $m-desktop)
    padding: 0 5vw
  @media (max-width: $s-desktop)
    width: 125vw
  @media (max-width: $b-tablet)
    width: 100vw
    display: block
    padding: 65px 0 95px
    height: auto
  &-1
    justify-content: space-between
    .roller
      left: 40%
      top: 25vh
    .pic__item
      &:first-child
        height: 70vh
        width: 25vw
        margin-top: -10vh
        z-index: 2
        @media (max-width: $b-tablet)
          width: 100%
          margin: 0px 0 0 0px
          height: 80vh
          padding-left: 85px
        @media (max-width: $b-mobile)
          padding-left: 65px
    .dop-pic
      width: 24vw
      bottom: -12vh
      left: -10vw
      z-index: 1
      @media (max-width: $b-tablet)
        left: 0
        bottom: initial
        width: 60vw
        margin-top: -15vh

  &-2
    justify-content: flex-start
    .main-block__content
      width: 80%
    .roller
      right: 8vw
      top: 12vh
    .map
      width: 35vw
      height: 80vh
      margin-right: $content-indent
      @media (max-width: $b-tablet)
        display: none
      img
        width: 100%
        object-fit: cover
    .dop-pic
      width: 22vw
      height: 62vh
      position: absolute
      right: -8vw
      bottom: 10vh
      @media (max-width: $b-tablet)
        display: none
      img
        background-position: center bottom
    .link
      @media (max-width: $b-tablet)
        display: none
  &-3
    justify-content: space-between
    @media (max-width: $b-tablet)
      display: flex!important
      flex-direction: column-reverse
    .roller
      left: 60vw
      top: 17vh
    .link
      @media (max-width: $b-tablet)
        display: none
    .pic__item
      z-index: 1
      position: absolute
      margin: auto
      right: -7vw
      @media (max-width: $b-tablet)
        display: none
  &-4
    width: 125vw
    .link
      @media (max-width: $b-tablet)
        display: none
    @media (max-width: $b-tablet)
      display: flex!important
      flex-direction: column-reverse
    .single-pic
      position: absolute
      right: -10vw
      width: 33vw
      top: 0
      height: 45vh
      @media (max-width: $m-desktop)
        height: 27vh
      @media (max-width: $b-tablet)
        display: none
    .main-block__content
      &:first-child
        margin-right: 7vw
      &:last-child
        grid-gap: 25px
        margin-top: 20vh
        margin-left: 7vw
        margin-right: 7vw
    .horizontal-content__pics
      margin-right: $content-indent
      height: 100%
      @media (max-width: $b-tablet)
        width: 100%
        margin: 0
        padding-left: 85px
      @media (max-width: $b-mobile)
        padding-left: 65px
      .pic__item
        &:nth-child(1)
          height: 70vh
          margin-top: 8vh
          z-index: 0
          width: 22vw
          @media (max-width: $b-tablet)
            width: 100%
            margin: 0
            height: 80vh
          &:before
            left: initial
            right: -30px
        &:nth-child(2)
          width: 22vw
          height: 28vh
          right: -38%
          z-index: 1
          filter: brightness(70%)
          bottom: 10vh
          @media (max-width: $b-tablet)
            display: none
  &-5
    width: auto!important
    padding-right: 0!important
    @media (max-width: $l-desktop)
      width: 130vw!important
    @media (max-width: $sm-desktop)
      width: 140vw !important
    @media (max-width: $s-desktop)
      width: 160vw !important
    .main-block__content
      padding-right: 7vw

    .layout
      display: none
      @media (max-width: $b-tablet)
        margin-top: 80px
        display: block
        a
          color: $gold
          text-transform: uppercase
          font-family: 'Baza'
          width: 100vw
          letter-spacing: 2px
          display: flex
          align-items: center
          font-size: 40px
          justify-content: space-between
        &__arrow
          height: 1px
          content: ''
          position: relative
          width: 45px
          background: $brown2
          &:before
            width: 6px
            height: 6px
            display: block
            position: absolute
            top: 0
            bottom: 0
            content: ''
            margin: auto
            border-top: 1px solid $brown2
            border-right: 1px solid $brown2
          &:first-child:before
            right: 0
            transform: rotate(45deg)
          &:last-child:before
            left: 0
            transform: rotate(-135deg)
    .border-effect-trigger
      position: absolute
      right: 10vw
      height: 100%

.description.animated
  .count
    @media (max-width: $b-tablet)
      transform: translateY(0)!important
      opacity: 1!important
      transition-delay: .1s
    .link
      opacity: 1!important
  .description__part
    @media (max-width: $b-tablet)
      transform: translateY(0)!important
      opacity: 1!important
      transition-delay: .2s
.title.animated
  @media (max-width: $b-tablet)
    opacity: 1!important
    transform: translateY(0)!important
    transition-delay: .2s
.pic__item.animated
  @media (max-width: $b-tablet)
    transform: translateY(0px)!important
    opacity: 1!important

.description__area
  display: flex
  grid-gap: 60px
</style>
