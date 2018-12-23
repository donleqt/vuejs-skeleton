<template>
  <div class="global-wrapper">
    <base-loading :loading="loading">
      <slot v-if="isReady">
      </slot>
    </base-loading>
    <div
      class="container text-center"
      v-if="websiteConfig.error"
    >
      <code>
        <small>
          {{websiteConfig.error.errors}}
        </small>
      </code>
    </div>

  </div>
</template>
<script>

import globalStore from '@/store/global';
import { useStores } from '@/helpers/vue/store-mapper';

export default {
  name: 'GlobalWrapper',
  mixins: [useStores({
    global: globalStore,
  })],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    websiteConfig() {
      return this.stores.global.getters.selectWebsiteConfig();
    },
    isReady() {
      return true || this.websiteConfig.data;
    },
  },
};
</script>
<style lang="scss">
  .global-wrapper {
    .base-loading.is-loading {
      padding: 0.1px 0;
      height: 100vh;
      overflow: hidden;
    }
  }
</style>

