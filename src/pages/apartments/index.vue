<template lang='pug'>
.base.light
  CursorCustom(:theme="theme")
  HorizontalViewAW(
    :theme="theme"
    :appear="appear"
    :orientation="orientation"
    )
    PageApartments
</template>

<script>
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import CursorCustom from "../../components/elements/Cursor/index";
import PageApartments from "../../components/blocks/PageApartments/index";
export default {
  name: "Apartments",
  data() {
    return {
      type: "half",
      theme: "light",
      appear: "normal",
      orientation: "vertical"
    };
  },
  components: {
    HorizontalViewAW,
    CursorCustom,
    PageApartments
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/page"
</style>
