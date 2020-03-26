import actions from './actions';
import mutations, { initState } from './mutations';
import * as getters from './getters';

const global = {
  name: 'global',
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions,
};

export default global;
