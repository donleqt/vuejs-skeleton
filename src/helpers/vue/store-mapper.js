import { mapActions } from 'vuex';

function findState(globalState, paths) {
  let moduleState = globalState;
  paths.forEach(p => (moduleState = moduleState[p]));
  return moduleState;
}

function createStoreMapper(storeModule, $store) {
  const path = storeModule.path || '';
  const paths = `${path}/${storeModule.name}`.split('/').filter(e => e !== '');

  // register module store if not registed
  if (!findState($store.state, paths)) {
    $store.registerModule(paths, storeModule, {
      preserveState: false,
    });
  }
  const mapperActions = {};
  if (storeModule.actions) {
    Object.keys(storeModule.actions).forEach(key => (mapperActions[key] = key));
  }

  const mapperGetters = {};
  if (storeModule.getters) {
    Object.keys(storeModule.getters).forEach(
      key =>
        (mapperGetters[key] = function mapGetter() {
          const { state } = this.$store;
          return storeModule.getters[key](findState(state, paths), mapperGetters, state);
        }),
    );
  }

  const mapper = {
    actions: mapActions(path ? `${path}/${storeModule.name}` : storeModule.name, mapperActions),
    getters: mapperGetters,
    state() {
      return findState(this.$store.state, paths);
    },
  };

  return mapper;
}

/**
 *
 * @param {object} params is {global: globalModule}
 */
export function useStores(params) {
  return {
    beforeCreate() {
      const stores = {};
      Object.entries(params).forEach(([name, storeModule]) => {
        const mapper = createStoreMapper(storeModule, this.$store);
        Object.keys(mapper.actions).forEach(key => (mapper.actions[key] = mapper.actions[key].bind(this)));
        Object.keys(mapper.getters).forEach(key => (mapper.getters[key] = mapper.getters[key].bind(this)));
        mapper.state = mapper.state.bind(this);
        stores[name] = mapper;
      });
      this.stores = stores;
    },
  };
}

export function globalStoreMixin(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.useStores && this.$store) {
        const stores = {};
        Object.entries(this.$options.useStores).forEach(([name, storeModule]) => {
          console.log(this);
          const mapper = createStoreMapper(storeModule, this.$store);
          Object.keys(mapper.actions).forEach(key => (mapper.actions[key] = mapper.actions[key].bind(this)));
          Object.keys(mapper.getters).forEach(key => (mapper.getters[key] = mapper.getters[key].bind(this)));
          mapper.state = mapper.state.bind(this);
          stores[name] = mapper;
        });
        this.stores = stores;
      }
    },
  });
}
