import globalStore from '@/store/global';
import { useStores } from '@/helpers/vue/store-mapper';

export default {
  mixins: [
    useStores({
      global: globalStore,
    }),
  ],
  computed: {
    webConfig() {
      return this.stores.global.getters.selectWebsiteConfig().data || {};
    },
  },
};
