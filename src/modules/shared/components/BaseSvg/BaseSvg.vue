<template lang="pug">
  i.base-svg(:class="[{'loaded': loaded}, fileName]", ref="icon", v-on="$listeners")
    i(v-html="code")
</template>
<script>
import apiCaller from '@/services/api-caller';
import createSafeLocalStorage from '@/helpers/javascript/safe-localstorage';

const cached = createSafeLocalStorage();
const pendings = {};

export default {
  name: 'BaseSvg',
  props: ['src'],
  data() {
    return {
      code: null,
      loaded: false,
      fileName: null,
      ssrStyle: {
        backgroundImage: `url(${this.src})`,
      },
    };
  },
  async mounted() {
    this.fileName = /\/([^/]+)\.\w+\.svg$/.exec(this.src)[1];
    try {
      const data = await this.getSvg();
      this.code = data;
      this.loaded = true;
    } catch (err) {
      // do nothing
    }
  },
  methods: {
    async getSvg() {
      const { src } = this;
      if (!cached[src]) {
        if (!pendings[src]) {
          pendings[src] = apiCaller.get(src, { keepUrl: true, noEvent: true });
        }
        try {
          const { data } = await pendings[src];
          cached[src] = data;
        } catch (err) {}
        delete pendings[src];
      }
      return cached[src];
    },
  },
};
</script>

<style lang="scss">
  .base-svg {
    font-size: inherit !important;
    line-height: 0;
  }
  svg {
    width: 2rem;
  }
  svg.ssr-fallback {
    background-size: 100%;
    background-repeat: no-repeat;
    max-height: 2em;
    @at-root .client-mode & {
      display: none;
    }
  }
</style>
