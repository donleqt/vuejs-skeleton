import { map } from '@/helpers/javascript/functions';
import createStoreMapper from './create-mapper';

const StoreMapper = {
  install(Vue, options) {
    if (global.isServer) {
      // fix vue inspect
      Vue.prototype.inspect = () => {};
    }

    Vue.mixin({
      beforeCreate() {
        if (this.$options.useStores && this.$store) {
          map(this.$options.useStores, (storeModule, name) => {
            try {
              this[`$${name}`] = createStoreMapper(storeModule, this);
            } catch (error) {
              console.error(error);
            }
          });
        }
      },
    });
  },
};

export default StoreMapper;
