<template lang="pug">
  .app-wrapper
    slot
</template>
<style lang="scss" src="@/scss/style.scss"></style>
<script>
import globalStore from '@/store/global';

export default {
  name: 'AppWrapper',
  useStores: {
    globalStore,
  },
  computed: {
    websiteConfig() {
      return this.$globalStore.state().websiteConfig;
    },
  },
};
</script>
