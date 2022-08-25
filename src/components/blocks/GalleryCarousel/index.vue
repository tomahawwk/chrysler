<template lang="pug">
  .gallery__carousel(v-bind:class="{ active: showSlides }")
    .gallery__inner(
      :style="{ transform: `translate3d(${translate}px, 0, 0)` }"
      v-bind:class="{ active: active}"
      )
      .gallery__item.zoom(
        v-for="item in items"
      )
        img(:src="item.preview" class="album__item-img album__item-img--small")
        img(:src="item.detail" class="album__item-img album__item-img--large")
    .return.circle__link(
      v-bind:class="{ active: returnArrow }"
      )
    .close.cursor__link(v-on:click="close()" v-bind:class="{ active: showSlides }")
    .hidden__arrow.prev
    .hidden__arrow.next 
    .slider__controls(v-bind:class="{ active: showSlides }")
      .half
        .show__slides.optional__button(
            v-on:click="showSlides = !showSlides" 
            class="circle__link"
            ) Show all
        .slider__button.circle__link.prev
          img(src="./prev.svg" )
      .center
        .slider__counter {{ `${current}/${allSlides}` }}
      .half
        .slider__button.circle__link.next
          img(src="./next.svg" )
        .zoom-it.optional__button Zoom it
</template>

<script>
import ScrollBooster from "scrollbooster";
require("../FullscreenAnimation2/base.css");
import { FullscreenAnimation2 } from "../FullscreenAnimation2/init";
export default {
  props: ["items"],
  name: "GalleryCarousel",
  data() {
    return {
      translate: 0,
      current: 1,
      clearSize: 0,
      allSlides: 0,
      active: false,
      returnArrow: false,
      showSlides: false
    };
  },
  methods: {
    scrollBust() {
      const items = this.$el.querySelectorAll(".gallery__item");
      let viewport = document.querySelector(".gallery");
      let content = this.$el.querySelector(".gallery__inner");
      viewport.addEventListener("mousedown", () => {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.add("gallery__item--active");
        }
      });
      viewport.addEventListener("mouseup", () => {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove("gallery__item--active");
        }
      });

      let sb = new ScrollBooster({
        viewport,
        bounce: true,
        content,
        emulateScroll: true,
        mode: "x",
        onUpdate: data => {
          if (this.active == false) {
            this.translate = -data.position.x;
            if (this.translate < -200) {
              this.returnArrow = true;
            } else {
              this.returnArrow = false;
            }
          }
        }
      });
      this.$el.querySelector(".return").addEventListener("click", () => {
        this.$el.querySelector(
          ".gallery__inner"
        ).style.transitionDuration = `.6s`;
        sb.setPosition({
          x: 0
        });

        setTimeout(() => {
          this.$el.querySelector(
            ".gallery__inner"
          ).style.transitionDuration = ``;
        }, 1000);
      });
    },
    sliderChange() {
      const galleryItems = this.$el.querySelectorAll(".gallery__item"),
        galleryInner = this.$el.querySelector(".gallery__inner"),
        next = this.$el.querySelector(".slider__button.next"),
        prev = this.$el.querySelector(".slider__button.prev"),
        hiddenNext = this.$el.querySelector(".hidden__arrow.next"),
        hiddenPrev = this.$el.querySelector(".hidden__arrow.prev"),
        medias = [
          { width: 2600, coeff: 30 },
          { width: 1600, coeff: 15 },
          { width: 1400, coeff: 60 },
          { width: 1200, coeff: 50 },
          { width: 1000, coeff: 30 },
          { width: 900, coeff: 0 },
          { width: 500, coeff: 100 },
          { width: 400, coeff: 85 },
          { width: 350, coeff: 75 }
        ];
      var current, itemSize, currentSize, currentSlide, center, coeff;
      galleryItems.forEach(item => {
        item.classList.add("visible");
        setTimeout(() => {
          item.style.transitionDelay = "0s";
        }, 2000);
      });

      const getAbsoluteWidth = el => {
        el = typeof el === "string" ? document.querySelector(el) : el;
        var styles = window.getComputedStyle(el);
        var margin =
          parseFloat(styles["marginRight"]) + parseFloat(styles["marginLeft"]);
        return Math.ceil(el.offsetWidth + margin);
      };
      this.$el.querySelector(".show__slides").addEventListener("click", () => {
        if (
          this.$el.querySelector(".show__slides").classList.contains("active")
        ) {
          galleryItems[0].click();
        } else {
          this.close();
        }
      });
      this.$el.querySelector(".zoom-it").addEventListener("click", () => {
        const click = (x, y) => {
          var ev = new MouseEvent("mousedown", {
            view: window,
            bubbles: true,
            cancelable: true,
            screenX: x,
            screenY: y
          });
          var el = document.elementFromPoint(x, y);
          el.dispatchEvent(ev);
        };

        click(window.innerWidth / 2, window.innerHeight / 2);
      });
      this.allSlides = galleryItems.length;
      for (let i = 0; i < galleryItems.length; i++) {
        itemSize = getAbsoluteWidth(galleryItems[i]);
        galleryItems[i].style.left = `${itemSize * i}px`;
        galleryInner.style.width = `${itemSize * galleryItems.length}px`;
        galleryItems[i].addEventListener("click", () => {
          current = i;
          (this.showSlides = true), (this.active = true);
          this.returnArrow = false;
          currentSlide = current;
          change(currentSlide);
        });
      }

      const prevSlide = () => {
        currentSlide = current - 1;
        if (currentSlide > -1) {
          galleryItems[currentSlide].click();
        }
      };
      const nextSlide = () => {
        currentSlide = current + 1;
        if (currentSlide < this.allSlides) {
          galleryItems[currentSlide].click();
        }
      };
      next.addEventListener("click", () => {
        nextSlide();
      });
      prev.addEventListener("click", () => {
        prevSlide();
      });
      hiddenNext.addEventListener("click", () => {
        nextSlide();
      });
      hiddenPrev.addEventListener("click", () => {
        prevSlide();
      });
      const change = currentSlide => {
        for (let i = 0; i < galleryItems.length; i++) {
          galleryItems[i].classList.remove("active");
          galleryItems[i].classList.remove("right");
          galleryItems[i].classList.remove("left");
          if (i > currentSlide) {
            galleryItems[i].classList.add("right");
          }
          if (i < currentSlide) {
            galleryItems[i].classList.add("left");
          }
        }
        galleryItems[currentSlide].classList.add("active");
        currentSize = itemSize * currentSlide;
        for (let i = 0; i < medias.length; i++) {
          if (window.innerWidth <= medias[i].width) {
            coeff = medias[i].coeff;
          }
        }
        var scaleFactor;
        if (window.innerWidth > 900) {
          scaleFactor = 2.7;
        } else if (window.innerWidth < 900) {
          scaleFactor = 2;
        } else {
          scaleFactor = 2.1;
        }
        center =
          window.innerWidth / 2 -
          (galleryItems[currentSlide].offsetWidth * scaleFactor) / 2 +
          coeff;
        if (currentSize > 1) {
          this.translate = -(currentSize - center);
        } else if (currentSize == 1) {
          this.translate = currentSize - center;
        } else {
          this.translate = center;
        }
        this.clearSize = currentSize;
        this.current = current + 1;
        if (this.current >= galleryItems.length) {
          next.classList.add("disable");
        } else if (this.current <= 1) {
          prev.classList.add("disable");
        } else {
          next.classList.remove("disable");
          prev.classList.remove("disable");
        }
      };
    },
    close() {
      this.showSlides = false;
      this.active = false;
      const galleryItems = document.querySelectorAll(".gallery__item");
      for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].classList.remove("active");
        galleryItems[i].classList.remove("right");
        galleryItems[i].classList.remove("left");
      }
    },
    moveCarousel() {
      this.$el.classList.add("move");
    },
    mobile() {
      this.$el.appendChild(this.$el.querySelector(".show__slides"));
    }
  },
  mounted() {
    if (window.innerWidth > 900) {
      FullscreenAnimation2();
    } else {
      this.mobile();
    }
    this.moveCarousel();
    this.sliderChange();
    this.scrollBust();
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/medias"
@import "src/sass/general/variables"
@import "src/sass/general/text"
.gallery__carousel.active
  .hidden__arrow
    display: block
.gallery__carousel
  padding: 0 7vw
  display: flex
  align-items: center
  height: 100%
  .gallery
    
    &__inner
      height: 20vh
      transform: translateX(0px)
      display: flex
      @media (max-width: $b-tablet)
        height: 25vh
      @media (max-width: $b-mobile)
        height: 23vh
      .inner
        transition-duration: .5s
        transition-timing-function: easeOut
        display: flex
    &__item
      width: 15vw
      height: 100%
      margin-right: 30px
      display: block
      transition-duration: 1s
      cursor: pointer
      will-change: transform
      opacity: 0
      transform: scale(1) translateX(15vw)
      transition-timing-function: cubic-bezier(.165,.84,.44,1)
      overflow: hidden
      position: absolute
      top: 0
      backface-visibility: hidden
      @media (max-width: $m-desktop)
        width: 20vw
      @media (max-width: $b-tablet)
        width: 30vw
      @media (max-width: $s-tablet)
        width: 40vw
      @media (max-width: $b-mobile)
        width: 60vw
        margin-right: 15px
        background: rgba(0,0,0,.1)
      img
        display: block
        pointer-events: none
        height: 100%
        will-change: transform
        transition-timing-function: easeOut
        transition-duration: .5s
        width: 100%
        transform: scale(1)
        object-fit: cover
      &--active
        transform: scaleX(.95) scaleY(.9)!important
        img
          transform: scale(1.26)

.gallery__item.active
  transition-delay: 0s!important
  opacity: 1
  margin: 0
  transition-duration: .7s
  transform: scale3d(2.7, 2.7, 1)!important
  @media (max-width: $b-tablet)
    transform: scale3d(1.5, 1.5, 1)!important
  @media (max-width: $b-mobile)
    transform: scale3d(1.3, 1.3, 1)!important
  img
    pointer-events: auto
.gallery__item.left
  transform: translateX(-27vw)!important
  transition-delay: 0s!important
  margin: 0
  @media (max-width: $b-tablet)
    transform: translateX(-12vw)!important
  @media (max-width: $b-mobile)
    transform: translateX(-9vw)!important
.gallery__item.right
  transform: translateX(27vw)!important
  transition-delay: 0s!important
  margin: 0
  @media (max-width: $b-tablet)
    transform: translateX(12vw)!important
  @media (max-width: $b-mobile)
    transform: translateX(9vw)!important
.gallery__inner.slowly
  transition-duration: .7s
.gallery__inner.active
  transition-duration: .7s
  transition-delay: .05s
.slider__controls
  position: absolute
  bottom: 0
  display: flex
  transition-timing-function: cubic-bezier(.165,.84,.44,1)
  border-top: 1px solid $grey3
  z-index: 2
  left: 0px
  height: 70px
  transition-duration: .4s
  transform: translateY(5px)
  opacity: 0
  bottom: $view-indent
  justify-content: space-between
  width: 100%
  font-family: 'Futura PT'
  color: $grey2
  @media (max-width: $b-tablet)
    position: fixed
    bottom: $view-indent-mobile
  .center
    width: 66px
    display: flex
    +center-flex
    border-right: 1px solid $grey3
    border-left: 1px solid $grey3
  .half
    width: calc(50% - 33px)
    display: flex
    .prev
      img
        transform: scale(-1, 1)
        @media (max-width: $s-tablet)
          transform: scale(-1, 1) scale(.7)!important
    .slider__button
      transition-duration: .4s
      width: 100%
      display: flex
      +center-flex
      img
        @media (max-width: $s-tablet)
          transform: scale(.7)
    .slider__button.disable
      opacity: .5
  .slider__counter
    font-size: 11px
    font-family: 'Futura PT'
    letter-spacing: 2px
    @media (max-width: $s-tablet)
      font-size: 9px
  .optional__button
    cursor: pointer
    letter-spacing: 1px
    position: relative
    transition-duration: .4s
    height: 100%
    text-transform: uppercase
    font-family: 'Futura PT Book'
    +center-flex
    color: black
    display: flex
    width: 10vw
    letter-spacing: 2px
    transition-delay: 2.5s
    font-size: 11px
    @media (max-width: $m-desktop)
      width: 17vw
  .zoom-it
    border-left: 1px solid $grey3
    margin-right: $view-indent
    @media (max-width: $b-tablet)
      display: none
  .show__slides
    border-right: 1px solid $grey3
    margin-left: $head
  .slider__button
    position: relative
    overflow: hidden
    transition-duration: .6s
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
    &:not(.disable):hover
      &:before
        transform: translateY(0%)
    
.hidden__arrow
  height: 20vh
  display: none
  width: 14%
  position: fixed
  +center
.hidden__arrow.prev
  right: initial
.hidden__arrow.next
  left: initial

.gallery__inner.active
  .gallery__item img
    transform: none!important
.return
  position: fixed
  top: 4em
  right: 4em
  opacity: 0
  width: 70px
  cursor: pointer
  pointer-events: non
  background-size: 100%
  background-repeat: no-repeat
  transition-duration: .5s
  opacity: 0
  visibility: hidden
  transition-timing-function: cubic-bezier(.165,.84,.44,1)
  height: 30px
  &:before
    content: ''
    background: $grey2
    position: absolute
    width: 100%
    height: 1px
    +center
  &:after
    content: ''
    position: absolute
    border: 5px solid transparent
    border-right: 5px solid $grey2
    left: 0
    top: 6px
    border-bottom: 5px solid $grey2
  @media (max-width: $b-tablet)
    display: none
.close
  position: fixed
  top: 4em
  right: 4em
  width: 30px
  cursor: pointer
  pointer-events: none
  transition-duration: .5s
  opacity: 0
  transition-timing-function: cubic-bezier(.165,.84,.44,1)
  height: 30px
  &:before,&:after
    content: ''
    position: absolute
    width: 50%
    height: 2px
    background: $grey2
    +center
  &:before
    transform: rotate(45deg)
  &:after
    transform: rotate(-45deg)
  @media (max-width: $m-desktop)
    top: 1.5em
    right: 1.5em
  @media (max-width: $b-tablet)
    display: none
.close.active
  opacity: 1
  pointer-events: auto
.return.active
  opacity: 1
  visibility: visible

.gallery__item.visible
  opacity: 1
  transform: translateX(0)
  &:nth-child(1)
    transition-delay: 1.6s
  &:nth-child(2)
    transition-delay: 1.7s
  &:nth-child(3)
    transition-delay: 1.8s
  &:nth-child(4)
    transition-delay: 1.9s
  &:nth-child(5)
    transition-delay: 2s
  &:nth-child(6)
    transition-delay: 2.1s
.slider__controls.active
  opacity: 1
  transform: translateY(0)
</style>