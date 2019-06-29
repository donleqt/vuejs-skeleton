<template>
  <div class="global-wrapper">
    <base-loading
      class="global-loading"
      :loading="loading"
    >
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

export default {
  name: 'GlobalWrapper',
  useStores: {
    globalStore,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    websiteConfig() {
      return this.$globalStore.getters.selectWebsiteConfig;
    },
    isReady() {
      return true || this.websiteConfig.data;
    },
  },
};
</script>
<style lang="scss">
  .global-wrapper {
    .global-loading.is-loading {
      padding: 0.1px 0;
      height: 100vh;
      overflow: hidden;
    }
    .page-loading {
      min-height: 80vh;
    }
  }
</style>

