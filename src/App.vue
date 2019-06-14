<template>
  <global-wrapper id="app">
    <component :is="getWrapper()">
      <component :is="layout">
        <router-view />
      </component>
    </component>
  </global-wrapper>
</template>
<script>
import GlobalWrapper from '@/modules/shared/wrappers/GlobalWrapper';

export default {
  metaInfo: {
    titleTemplate: 'SIA - %s',
  },
  components: {
    GlobalWrapper,
  },
  computed: {
    layout() {
      return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout : 'div';
    },
  },
  methods: {
    getWrapper() {
      return this.$route.meta.wrapper || 'div';
    },
  },
};
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
