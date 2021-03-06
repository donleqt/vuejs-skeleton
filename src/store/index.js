import Vue from 'vue';
import Vuex from 'vuex';
import StoreMapper from '@/helpers/vue/store-mapper';
import global from './global';

Vue.use(Vuex);
Vue.use(StoreMapper);

export default function createStore() {
  /* eslint-disable */
  const storeModules = [global];
  const initialState = typeof window !== 'undefined' && window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : null;
  const modules = {};
  /* eslint-enable */

  // inject SSR state to modules
  storeModules.forEach((e) => {
    if (initialState && initialState[e.name]) {
      e.state = initialState[e.name];
    }
    modules[e.name] = e;
  });

  const store = new Vuex.Store({
    modules,
    state: initialState || {},
    mutations: {},
    actions: {},
  });

  // Add custom data
  store.modules = {};

  store.bootstrap = () => {
    if (!store.state.global.websiteConfig.data) {
      return store.dispatch('global/getWebsiteConfig');
    }
    return Promise.resolve(true);
  };
  return store;
}
