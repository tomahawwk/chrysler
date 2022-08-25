<template lang='pug'>
.base
  CursorCustom(:theme="theme")
  HorizontalViewAW(
    :theme="theme"
    :appear="appear"
    :scrollbar="scrollbar"
    :orientation="orientation"
    )
    PageDocuments
</template>

<script>
import HorizontalViewAW from "../../views/HorizontalViewAW/index";
import CursorCustom from "../../components/elements/Cursor/index";
import PageDocuments from "../../components/blocks/PageDocuments/index";
export default {
  name: "Documents",
  data() {
    return {
      type: "half",
      theme: "light",
      appear: "normal",
      orientation: "vertical",
      scrollbar: true
    };
  },
  components: {
    HorizontalViewAW,
    CursorCustom,
    PageDocuments
  }
};
</script>

<style lang="sass" scoped>
@import "src/sass/general/variables"
@import "src/sass/general/page"
.base
  background: $light
</style>
