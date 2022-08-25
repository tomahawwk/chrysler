<template lang='pug'>
.btn_start
  .link-preload.circle__link(id="btn") Press
    .outer
</template>

<script>
import * as THREE from "three";
import { TweenMax } from "gsap/TweenMax";
require("./scripts/WebGL.js");
import { setupCanvas } from "./scripts/mainlegend";
require("./scripts/mainlegend.js");
export default {
  name: "Canvas",
  mounted() {
    setupCanvas();
    document.querySelector("canvas").style.position = "fixed";
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/text"
.btn_start 
  position: absolute
  margin: 0 0 0 0
  padding: 0 0 0 0
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  z-index: 10
  display: flex
  justify-content: center
  align-items: center
  #btn
    cursor: pointer
    opacity: 0!important
    transition-duration: .6s
#btn.active
  opacity: 1!important
</style>
