<template lang='pug'>
router-link(to="/").logo-link
  img(src="./logo.svg")
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.logo-link
  display: block
</style>
