<template lang="pug">
  .documents
    .documents__head
      h1.title.title-4
        span D
        span o
        span c
        span u
        span m
        span e
        span n
        span t
        span s
    .documents__content(
      :style="{ transform: `translate3d(0, -${translate}px, 0) ` }"
      ref="container"
    )
      .inner
        ul.documents__list
          li(v-for="item in documents")
            .count {{ item.count }}
            .part
              a(
                :href="item.url"
                download
                ) {{ item.name }}
              .desc
                .version {{ `Версия от: ${item.versionDate}` }}
                .size {{ `Размер: ${item.fileSize}` }}
</template>

<script>
import VirtualScroll from "virtual-scroll";
import inobounce from "inobounce";
import loop from "../../../utils/loop";
const roundDec = n => Math.round(n * 100) / 100;
const lerp = (a, b, n) => (1 - n) * a + n * b;
export default {
  name: "PageDocuments",
  data: () => ({
    scroll: 0,
    translate: 0,
    vs: null,
    documents: [
      {
        name: "Annual balance sheet for 2019 (dynamics)",
        fileSize: "449.65 КБ",
        count: "01",
        url: "./src/documents/document.doc",
        versionDate: "8 октября 2018"
      },
      {
        name: "Report on financial results for 2017 (dynamics)",
        fileSize: "423.45 КБ",
        count: "02",
        url: "./documents/document.doc",
        versionDate: "7 октября 2018"
      },
      {
        name: " Institutsky 16 site lease agreement",
        fileSize: "2 МБ",
        count: "03",
        url: "./documents/document.doc",
        versionDate: "2 сентября 2018"
      },
      {
        name: " Building Permit Institutsky 16",
        fileSize: "123.45 КБ",
        count: "04",
        url: "./documents/document.doc",
        versionDate: "12 августа 2018"
      },
      {
        name: "Annual balance sheet for 2019 (dynamics)",
        fileSize: "449.65 КБ",
        count: "05",
        url: "./documents/document.doc",
        versionDate: "8 октября 2018"
      },
      {
        name: "Report on financial results for 2017 (dynamics)",
        fileSize: "423.45 КБ",
        count: "06",
        url: "./documents/document.doc",
        versionDate: "7 октября 2018"
      },
      {
        name: " Institutsky 16 site lease agreement",
        fileSize: "2 МБ",
        count: "07",
        url: "./documents/document.doc",
        versionDate: "2 сентября 2018"
      },
      {
        name: " Building Permit Institutsky 16",
        fileSize: "123.45 КБ",
        count: "08",
        url: "./documents/document.doc",
        versionDate: "12 августа 2018"
      },
      {
        name: "Annual balance sheet for 2019 (dynamics)",
        fileSize: "449.65 КБ",
        count: "09",
        url: "./documents/document.doc",
        versionDate: "8 октября 2018"
      },
      {
        name: "Report on financial results for 2017 (dynamics)",
        fileSize: "423.45 КБ",
        count: "10",
        url: "./documents/document.doc",
        versionDate: "7 октября 2018"
      },
      {
        name: " Institutsky 16 site lease agreement",
        fileSize: "2 МБ",
        count: "11",
        url: "./documents/document.doc",
        versionDate: "2 сентября 2018"
      },
      {
        name: " Building Permit Institutsky 16",
        fileSize: "123.45 КБ",
        count: "12",
        url: "./documents/document.doc",
        versionDate: "12 августа 2018"
      }
    ]
  }),
  methods: {
    moveHead() {
      this.$el
        .querySelector(".documents__content")
        .appendChild(this.$el.querySelector(".documents__head"));
    },
    showPage() {
      this.$el.classList.add("active");
    },
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    },
    onScroll(e) {
      const scroll = this.scroll + -1 * e.deltaY;
      this.scroll = Math.min(
        Math.max(scroll, 0),
        this.$refs.container.scrollHeight - window.innerHeight
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
    checkSmooth() {
      var smoothFactor;
      if (window.innerWidth > 900) {
        smoothFactor = 0.13;
      } else {
        smoothFactor = 0.7;
      }
      if (Math.round(this.scroll) !== Math.round(this.translate)) {
        this.translate = roundDec(
          lerp(this.translate, this.scroll, smoothFactor)
        );
      }
    }
  },

  mounted() {
    this.showPage();
    this.setup();
    if (window.innerWidth <= 900) {
      this.moveHead();
    }
    this.scrollHeight = this.$refs.container.scrollHeight;
  },
  beforeDestroy() {
    loop.remove("checkSmooth");
    this.vs.off(this.onScroll);
    loop.stop(true);
    this.clearCursor();
  }
};
</script>

<style lang="sass">
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.documents
  width: 100vw
  transform: translateX(50vw)
  transition-delay: .75s
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
  transition-duration: 2s
  height: 100vh
  position: relative
  padding: $view-indent $view-indent 0 $head
  display: flex
  @media (max-width: $b-tablet)
    flex-direction: column
    padding: 100px $view-indent 0 $view-indent
    display: block
  &__head
    width: 45%
    display: flex
    position: relative
    +center-flex
    @media (max-width: $b-tablet)
      width: 100%
      padding-left: 7vw
    @media (max-width: $s-tablet)
      padding-left: 33px
    @media (max-width: $b-mobile)
      padding: 0
      justify-content: center
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
    width: 55%
    position: relative
    padding: 10vh 0 0
    @media (max-width: $b-tablet)
      width: 100%
      display: flex
      flex-direction: column-reverse
      padding: 0vh 0 0
    .inner
      border-left: 1px solid $grey3
      height: auto
      width: 100%
      padding-bottom: 20vh
      @media (max-width: $b-tablet)
        border: none
  &__list
    list-style: none
    padding: 0 7vw
    margin: 0
    @media (max-width: $s-tablet)
      padding: 0 33px
    @media (max-width: $b-mobile)
      padding: 0 7px
    li
      font-family: 'Futura PT Book'
      display: flex
      transform: translateX(5vw)
      opacity: 0
      position: relative
      transition-duration: .7s
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1)
      padding: 30px 0
      &:not(:first-child)
        border-top: 1px solid $grey3
        @media (max-width: $b-mobile)
          border: none
        .part
          position: relative
          @media (max-width: $b-mobile)
            width: 100%
          &:before
            @media (max-width: $b-mobile)
              content: ''
              position: absolute
              width: 100%
              height: 1px
              background: $grey3
              right: 0
              top: -25px
      a
        +doc-link
        font-weight: 300
        display: inline-block
        margin-bottom: 20px
      .count
        font-size: 10px
        letter-spacing: 1px
        margin-right: 40px
        @media (max-width: $b-mobile)
          margin-right: 25px
          margin-top: 5px
      .desc
        display: flex
        font-size: 11px
        text-transform: uppercase
        letter-spacing: 1px
        color: $brown4
        .version
          margin-right: 20px
        .size
          @media (max-width: $b-mobile)
            display: none
.documents.active
  transform: translateX(0)
  .documents__list
    li
      transform: translateX(0)
      opacity: 1
      &:nth-child(9)
        transition-delay: 2.6s
      &:nth-child(8)
        transition-delay: 2.5s
      &:nth-child(7)
        transition-delay: 2.4s
      &:nth-child(6)
        transition-delay: 2.3s
      &:nth-child(5)
        transition-delay: 2.2s
      &:nth-child(4)
        transition-delay: 2.1s
      &:nth-child(3)
        transition-delay: 2s
      &:nth-child(2)
        transition-delay: 1.9s
      &:nth-child(1)
        transition-delay: 1.8s

  .title
    span
      transform: translateX(0)
      opacity: 1
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
</style>