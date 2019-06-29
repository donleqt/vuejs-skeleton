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
          const stores = {};
          map(this.$options.useStores, (storeModule, name) => {
            try {
              const { actions, getters, state } = this[`$${name}`] = stores[name] = createStoreMapper(storeModule, this.$store);
              map(actions, (val, key) => actions[key] = actions[key].bind(this));
              map(getters, (val, key) => getters[key] = getters[key].bind(this));
              stores[name].state = state.bind(this);
            } catch (error) {
              console.error(error);
            }
          });
          this.stores = stores;
        }
      },
    });
  },
};

export default StoreMapper;
