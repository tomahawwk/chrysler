<template lang="pug">
    .progress
        p {{ `Ширина контейнера: ${scrollWidth}` }}
        p {{ `Ширина экрана: ${screenWidth}` }}
</template>
<script>
export default {
  name: "ProgressBar",
  props: ["scrollWidth"],
  data: () => ({
    screenWidth: 0
  }),
  methods: {
    getScrollProps() {
      this.screenWidth = window.outerWidth;
      setTimeout(() => {
        console.log(this.scrollWidth);
      }, 10);
    }
  },
  mounted() {
    this.getScrollProps();
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/main"

.progress
    position: fixed
    top: 100px
    left: 100px
</style>