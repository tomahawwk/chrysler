<template lang='pug'>
router-link(to="/" :class="theme" class="logo-link")
  picture(v-if="theme == 'dark'")
    source(
      media="(max-width: 900px)"
		  srcset="./logo.svg"
    )
    img(src="./logo.svg")
  picture(v-else)
    source(
      media="(max-width: 900px)"
		  srcset="./logoAWLightMobile.svg"
    )
    img(src="./logoAWLight.svg")
</template>

<script>
export default {
  props: ["theme"],
  name: "LogoAW",
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.logo-link
  display: block
</style>
