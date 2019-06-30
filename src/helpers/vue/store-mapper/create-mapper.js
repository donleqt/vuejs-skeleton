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

function createStoreMapper(storeModule, vm) {
  const { $store } = vm;
  const namespace = storeModule.path ? `${storeModule.path}/${storeModule.name}` : storeModule.name;
  const paths = namespace.split('/');

  // register module store if not registed
  if (!$store.hasModule(paths)) {
    $store.registerModule(paths, storeModule, {
      preserveState: false,
    });
  }

  // process state
  const mapper = {
    actions: {},
    getters: {},
    get state() {
      return findState(vm.$store.state, paths);
    },
  };

  // process actions
  if (storeModule.actions) {
    const actionsNames = {};
    map(storeModule.actions, (value, name) => (actionsNames[name] = name));
    mapper.actions = mapActions(storeModule.path ? namespace : storeModule.name, actionsNames);
    map(mapper.actions, (val, key) => mapper.actions[key] = val.bind(vm));
  }

  if (storeModule.getters) {
    mapper.getters = new Proxy(storeModule.getters, {
      get(target, key) {
        return vm.$store.getters[`${namespace}/${key}`];
      },
    });
  }
  return mapper;
}

export default createStoreMapper;