<template lang="pug">
  .app-wrapper
    slot
</template>
<style lang="scss" src="@/modules/shared/scss/style.scss"></style>
<script>
import globalStore from '@/store/global';
import { useStores } from '@/helpers/vue/store-mapper';

export default {
  name: 'AppWrapper',
  mixins: [
    useStores({
      global: globalStore,
    }),
  ],
  computed: {
    websiteConfig() {
      return this.stores.global.state().websiteConfig;
    },
  },
};
</script>
