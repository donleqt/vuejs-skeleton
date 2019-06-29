import { mapActions, Store } from 'vuex';
import { map } from '@/helpers/javascript/functions';

/**
 * Check registered module
 * @param {Array} aPath - path to module - ex: ['my', 'nested', 'module']
 * @return {Boolean}
 */
Store.prototype.hasModule = function (aPath) {
  let m = this._modules.root;
  return aPath.every((p) => {
    m = m._children[p];
    return m;
  });
};

function findState(globalState, paths) {
  let moduleState = globalState;
  paths.forEach(p => (moduleState = moduleState[p]));
  return moduleState;
}

function createStoreMapper(storeModule, $store) {
  const path = storeModule.path || '';
  const paths = `${path}/${storeModule.name}`.split('/').filter(e => e !== '');

  // register module store if not registed
  if (!$store.hasModule(paths)) {
    $store.registerModule(paths, storeModule, {
      preserveState: false,
    });
  }

  const mapperActions = {};
  if (storeModule.actions) {
    map(storeModule.actions, (value, key) => (mapperActions[key] = key));
  }

  const mapperGetters = {};
  if (storeModule.getters) {
    map(storeModule.getters, (value, key) => {
      mapperGetters[key] = function mapGetter() {
        const { state } = this.$store;
        return storeModule.getters[key](findState(state, paths), mapperGetters, state);
      };
    });
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

export default createStoreMapper;