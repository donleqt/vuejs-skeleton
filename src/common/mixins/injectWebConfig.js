import globalStore from '@/store/global';
import { useStores } from '@/helpers/vue/store-mapper';

export default {
  useStores: {
    globalStore,
  },
  computed: {
    webConfig() {
      return this.$globalStore.getters.selectWebsiteConfig.data || {};
    },
  },
};
