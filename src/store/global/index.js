import { createSampleListing, createSampleResource } from '@/helpers/samples';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

const initState = () => ({
  menus: createSampleListing(),
  websiteConfig: createSampleResource(),
});

const global = {
  name: 'global',
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions,
};

export default global;
