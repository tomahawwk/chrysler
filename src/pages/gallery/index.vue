<template lang='pug'>
.base(id="itemsWrapper")
  CursorCustom(:theme="theme")
  HorizontalViewAW(
    :theme="theme"
    :appear="appear"
    :animation="animation"
    )
    PageGallery
      GalleryCarousel(:items="items")
      .fullview
      .fullview__item(
          v-for="item in items"
        )
      button(class="fullview__close zoom-out" aria-label="Close preview")
</template>

<script>
import CursorCustom from "../../components/elements/Cursor/index";
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import PageGallery from "../../components/blocks/PageGallery/index";
import GalleryCarousel from "../../components/blocks/GalleryCarousel/index";
export default {
  name: "Gallery",
  data() {
    return {
      pageProps: {
        title: "Gallery",
        link: {
          name: "test",
          route: "/"
        }
      },
      items: [
        {
          preview: require("./items/1.jpg"),
          detail: require("./items/1-detail.jpg")
        },
        {
          preview: require("./items/2.jpg"),
          detail: require("./items/2-detail.jpg")
        },
        {
          preview: require("./items/3.jpg"),
          detail: require("./items/3-detail.jpg")
        },
        {
          preview: require("./items/1.jpg"),
          detail: require("./items/1-detail.jpg")
        },
        {
          preview: require("./items/2.jpg"),
          detail: require("./items/2-detail.jpg")
        },
        {
          preview: require("./items/3.jpg"),
          detail: require("./items/3-detail.jpg")
        },
        {
          preview: require("./items/1.jpg"),
          detail: require("./items/1-detail.jpg")
        },
        {
          preview: require("./items/2.jpg"),
          detail: require("./items/2-detail.jpg")
        },
        {
          preview: require("./items/3.jpg"),
          detail: require("./items/3-detail.jpg")
        },
        {
          preview: require("./items/1.jpg"),
          detail: require("./items/1-detail.jpg")
        },
        {
          preview: require("./items/2.jpg"),
          detail: require("./items/2-detail.jpg")
        },
        {
          preview: require("./items/3.jpg"),
          detail: require("./items/3-detail.jpg")
        },
        {
          preview: require("./items/1.jpg"),
          detail: require("./items/1-detail.jpg")
        }
      ],
      scrollbar: true,
      type: "full",
      theme: "light",
      appear: "normal",
      animation: "clear"
    };
  },
  methods: {
    clearCursor() {
      document.querySelector(".circle-cursor--outer").remove();
      document.querySelector(".circle-cursor--inner").remove();
    }
  },
  beforeDestroy() {
    document.querySelector(".fullview__close").remove();
    document.querySelector("canvas").remove();
    this.clearCursor();
  },
  components: {
    HorizontalViewAW,
    PageGallery,
    GalleryCarousel,
    CursorCustom
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/variables"
@import "src/sass/general/page"
.fullview__close
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  position: fixed
  transform: none!important
  &:before, &:after
    display: none
.base
  background: $light
</style>
