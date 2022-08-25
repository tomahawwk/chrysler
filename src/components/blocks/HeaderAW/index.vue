<template lang='pug'>
header.header(:class="theme" )
  .overlay(v-bind:class="{ active: showMenu }" v-on:click="showMenu = !showMenu")
  .header__menu.menu(v-bind:class="{ active: showMenu }")
    .menu__head
      .menu__part_first
        a.double-line.circle__link(href="https://legenda-dom.ru/" target="_blank") Legenda Intelligent Development
      .menu__part_second
        router-link.double-line.circle__link(to="/") Subscribe to news
    .menu__content(:style="{ transform: `translate3d(0, ${translate}px, 0)` }")
      .menu__part_first
        ul.menu__list
          li(
            v-for="item in menu"
          )
            router-link(
              :to="item.url"
              v-on:click="preloaderActive"
              class="circle__link router__link"
            ).one-line {{ item.title }}
      .menu__part_second
        .contact
          .contact__part
            .label Phone
            a(href="tel:+78123854677").contact__item 8 (812) 385 46 77
          .contact__part
            .label Sales department
            .contact__item 8, Startovaya st, St. Petersburg
          .contact__part
            .copyright Made by 
              a.circle__link.double-line(href="https://its.agency/" target="_blank") its.agency 
  .header__inner
    .inner(:class="orientation")
      .header__buttons
        LogoAW(:theme="theme")
        .cursor__link(v-on:click="showMenu = !showMenu" v-bind:class="{ active: showMenu }")
          .menu__btn
            span
              div
            span
              div
</template>

<script>
import ScrollBooster from "scrollbooster";
import LogoAW from "../../elements/LogoAW/index";
export default {
  name: "HeaderAW",
  props: ["theme", "appear", "orientation"],
  data() {
    return {
      showMenu: false,
      translate: 0,
      menu: [
        {
          title: "Home",
          active: true,
          url: "/"
        },
        {
          title: "Progress",
          url: "/progress"
        },
        {
          title: "Gallery",
          url: "/gallery"
        },
        {
          title: "Location",
          url: "/location"
        },
        {
          title: "Documents",
          url: "/documents"
        },
        {
          title: "Apartments",
          url: "/apartments"
        }
      ]
    };
  },
  methods: {
    scrollBust() {
      let viewport = document.querySelector("body");
      let content = this.$el.querySelector(".menu__content");
      let sb = new ScrollBooster({
        viewport,
        bounce: true,
        content,
        emulateScroll: true,
        mode: "y",
        onUpdate: data => {
          this.translate = -data.position.y;
        }
      });
    },
    preloaderActive() {
      const preloaders = document.querySelectorAll(".preloader-intro");
      document.querySelector(".preloader").classList.add("right");

      preloaders.forEach(item => {
        item.classList.add("hidden");
      });
      setTimeout(() => {
        document.querySelector(".preloader").classList.remove("right");
      }, 2000);
    }
  },
  mounted() {
    const routerLinks = document.querySelectorAll(".router__link");
    routerLinks.forEach(item => {
      item.addEventListener("click", () => {
        this.preloaderActive();

        if (item.innerText.toLowerCase() != this.$route.name.toLowerCase()) {
          this.preloaderActive();
        }
      });
    });
    if ((this.appear = "normal")) {
      setTimeout(() => {
        this.$el.classList.add("active");
      }, 200);
    }
    if (window.innerWidth <= 900) {
      this.$el.querySelector(".cursor__link").addEventListener("click", () => {
        if (this.$el.classList.contains("header--active")) {
          setTimeout(() => {
            this.$el.classList.remove("header--active");
          }, 800);
        } else {
          this.$el.classList.add("header--active");
        }
      });
    }
  },
  components: {
    LogoAW
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.header.light
  .menu__btn
    div
      &:after, &:before
        background: $brown2
  .inner
    background: $light
  .header__inner
    border-left: none
    border-right: 1px solid $grey3
    @media (max-width: $b-tablet)
      border-right: none
.header
  height: 100vh
  position: fixed
  display: flex
  transform: translateX(-#{$head})
  transition-delay: 0.2s
  z-index: 4
  transition-timing-function: ease
  transition-duration: 1s
  @media (max-width: $b-tablet)
    width: 100vw
    transform: translateX(0)
    overflow: auto
    -webkit-overflow-scrolling: touch
    height: auto
    transition-duration: 0s
  &--active
    @media (max-width: $b-tablet)
      min-height: 100vh
  &__menu
    width: 90vw
    height: 100%
    background: $light
    position: absolute
    z-index: 1
    transition-duration: 1s
    display: flex
    left: 0
    transition-timing-function: cubic-bezier(.77,0,.175,1)
    transform: translateX(-90vw)
    @media (max-width: $b-tablet)
      width: 100vw
      height: auto
      min-height: 100vh
      transform: translateX(-100vw)
    .border-left
      width: 1px
      height: 100%
      background: $brown2
      margin-left: $view-indent
  &__buttons
    width: 100%
    position: relative
    display: flex
    align-items: center
    height: 100%
    flex-direction: column
    @media (max-width: $b-tablet)
      flex-direction: row
      padding: 20px 30px
      justify-content: space-between
  &__text
    flex-direction: column
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
.header__inner
  display: flex
  height: 100%
  border-left: 1px solid $brown2
  border-right: 1px solid $brown2
  width: $head
  @media (max-width: $b-tablet)
    width: 100%
    border: none
  .inner
    display: flex
    background: $brown
    width: 100%
    align-items: center
    flex-direction: column
    justify-content: space-between
    @media (max-width: $b-tablet)
      background: none!important
  .logo-link
    margin-top: 45px
    @media (max-width: $b-tablet)
      margin: 0
  .label
    margin-bottom: 45px
  
  .menu-button, .call-button, .share-button
    height: $head
    width: 100%
  .menu-button, .call-button
    border-bottom: 1px solid $brown2
  .share-button
    align-self: flex-end
    border-top: 1px solid $brown2
.header.active
  transform: translateX(0)
.menu-button
  +center-flex
  cursor: pointer
  .button
    display: flex
    width: 27px
    +center-flex
    position: relative
    height: 27px
    span
      position: absolute
      width: 100%
      height: 1px
      background: $gold
      transition-duration: .3s
      transition-timing-function: ease
      &:nth-child(1)
        margin-top: 3px
      &:nth-child(2)
        margin-top: -1px
      &:nth-child(3)
        margin-top: -6px 
      
.menu-button.active
  .button
    span
      &:nth-child(1)
        transform: translateY(-5px) rotate(45deg)
      &:nth-child(2)
        opacity: 0
        transform: translateX(5px)
      &:nth-child(3)
        transform: translateY(5px) rotate(-45deg)

      
  &__separator
    width: 70px
    height: 1px
    margin: 50px 0
    display: block
    background: $brown2
  &__inner
    padding: 60px 20px 60px 60px
    // overflow-y: auto
    // -ms-overflow-style: none
    // overflow: -moz-scrollbars-none
    // &::-webkit-scrollbar
    //   width: 0
    .list
      list-style: none
      padding: 0
      &__first
        .list__item
          margin-bottom: 45px
          &:last-child
            margin-bottom: 0
          a
            display: flex
            .count
              color: $brown3
              font-size: 10px
              letter-spacing: 1px
              margin-right: 17px
              margin-top: -7px
              font-family: 'Futura PT Book'
            .title
              color: $gold
              font-family: 'Metropolis 1920'
              text-transform: uppercase
              font-size: 36px
              transition-duration: .4s
              transition-timing-function: ease
              &:hover
                letter-spacing: 1px
      &__second
        .list__item
          margin-bottom: 20px
          &:last-child
            margin-bottom: 0
          a
            display: flex
            .count
              color: $brown3
              font-size: 10px
              letter-spacing: .5px
              margin-right: 17px
              margin-top: -7px
              font-family: 'Futura PT Book'
            .title
              color: $gold
              font-family: 'Futura PT Book'
              font-size: 20px
              font-weight: 300
              opacity: .8
              letter-spacing: 1px
              transition-duration: .4s
              transition-timing-function: ease
              &:hover
                opacity: 1
.cursor__link.active
  .menu__btn
    span
      &:first-child
        transform: rotate(-45deg)
      &:last-child
        transform: rotate(45deg)
    div
      &:after, &:before
        transition-delay: .2s
        background: $brown2
    
.header__menu.active
  transform: translateX(0) 
.menu__btn.recolor
  div
      &:before, &:after
        background: $brown
.header.active
  transform: translateX(0)
.menu
  flex-direction: column
  padding: 65px 75px
  justify-content: space-between
  @media (max-width: $b-tablet)
    overflow-y: scroll
  @media (max-width: $s-tablet)
    padding: 40px
  @media (max-width: $b-mobile)
    padding: 30px
  &__list
    list-style: none
    padding: 0
    margin: 0 0 0 17vw
    @media (max-width: $m-desktop)
      margin: 0 0 0 10vw
    @media (max-width: $b-tablet)
      margin: 20vh 0 0
    li
      overflow: hidden
      &:not(:last-child)
        +menu-li
      a
        font-family: 'Baza'
        +menu-link
        transition: opacity .4s cubic-bezier(.165,.84,.44,1),transform 0s cubic-bezier(.165,.84,.44,1) .4s,-webkit-transform 0s cubic-bezier(.165,.84,.44,1) .4s
        display: inline-block
        letter-spacing: 2px
        line-height: 56px
        line-height: 1
        text-transform: uppercase
        padding: 0 0 4px
        opacity: 0
        transform: translateY(105%) translateZ(0)
        &:before
          bottom: 0
  &__part
    &_first
      width: 80%
      @media (max-width: $b-tablet)
        width: 50%
      @media (max-width: $s-tablet)
        width: 100%
    &_second
      width: 20%
      @media (max-width: $b-tablet)
        margin-top: 10vh
        width: 40%
      @media (max-width: $s-tablet)
        width: 100%
  &__head
    transition: opacity .4s cubic-bezier(.165,.84,.44,1)
    opacity: 0
    display: flex
    margin-bottom: 25px
    justify-content: space-between
    width: 100%
    @media (max-width: $b-tablet)
      display: none
    a
      margin: 0
      font-family: 'Futura PT'
      font-size: 18px
      color: $grey2
      display: inline-block
  &__content
    display: flex
    align-items: flex-end
    margin-bottom: 8vh
    @media (max-width: $b-tablet)
      padding-bottom: 15vh
      justify-content: space-between
    @media (max-width: $s-tablet)
      flex-direction: column
      align-items: flex-start
    .contact
      transition: opacity .4s cubic-bezier(.165,.84,.44,1)
      opacity: 0
      &__item
        color: grey
        font-family: 'Futura PT Book'
        font-size: 16px
        letter-spacing: 1px
      &__part
        margin-bottom: 35px
        &:last-child
          margin-bottom: 0
        .copyright
          margin: 0
          font-family: 'Futura PT'
          font-size: 18px
          color: $grey2
          display: inline-block
      .label
        color: $grey2
        font-family: 'Futura PT'
        font-size: 20px
        margin-bottom: 5px
        
.menu.active
  .menu__list li
    &:nth-child(1)
      transition-delay: .7s
    &:nth-child(2)
      transition-delay: .8s
    &:nth-child(3)
      transition-delay: .9s
    &:nth-child(4)
      transition-delay: 1s
    &:nth-child(5)
      transition-delay: 1.1s
    &:nth-child(6)
      transition-delay: 1.2s
    a
      transform: translateZ(0)
      opacity: 1
      transition-duration: .8s
      transition-delay: inherit
      transition-timing-function: cubic-bezier(.165,.84,.44,1)
  .menu__head, .contact
    opacity: 1
    transition: opacity 1.2s cubic-bezier(.165,.84,.44,1) 1s
.overlay
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1)
  transition-duration: 0.7s
  position: fixed
  top: 0
  overflow: hidden
  left: 0
  width: 100vw
  height: 100vh
  transition-delay: .4s
  opacity: 0
  background: rgba(0,0,0,.7)
  visibility: hidden

.overlay.active
  visibility: visible
  transition-delay: .1s
  opacity: 1
.cursor__link
  position: absolute
  width: 50px!important
  height: 50px!important
  +center
  @media (max-width: $b-tablet)
    position: relative
    display: flex
    +center-flex
    margin: 0
  @media (max-width: $s-tablet)
    margin-right: -10px
  @media (max-width: $b-mobile)
    margin-right: -15px
  .menu
    &__btn
      display: flex
      cursor: pointer
      position: absolute
      width: 36px
      z-index: 2
      overflow: hidden
      +center
      justify-content: center
      height: 32px
      align-items: center
      @media (max-width: $b-tablet)
        transform: rotate(90deg)
      span
        height: 100%
        width: 1px
        display: flex
        +center
        position: absolute
        transition-timing-function: cubic-bezier(.165,.84,.44,1)
        transition-duration: .6s
        overflow: hidden
        flex-direction: column
        justify-content: space-between
        @media (max-width: $b-tablet)
          width: 2px
        div
          position: absolute
          top: 0
          left: 0
          height: 67px
          transition-timing-function: cubic-bezier(.165,.84,.44,1)
          transition-duration: .6s
          width: 100%
          flex-direction: column
          display: flex
          justify-content: space-between
          &:before, &:after
            width: 100%
            background: $gold
            content: ''
            height: 30px
            transition-delay: .85s
        &:first-child
          transform: translateX(-3px)
        &:last-child
          transform: translateX(3px)
          div
            transform: translateY(-37px)
      &:hover
        span
          &:first-child
            div
              transform: translateY(-36px)
          &:last-child
            div
              transform: translateY(1px)
.light .inner.vertical
  @media (max-width: $b-tablet)
    background: $light!important
    border-bottom: 1px solid $grey3
.dark .inner.vertical
  @media (max-width: $b-tablet)
    background: $dark!important
    border-bottom: 1px solid $brown2
</style>
