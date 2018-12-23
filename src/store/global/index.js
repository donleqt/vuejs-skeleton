import { createSampleListing, createSampleResource } from '@/helpers/samples';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import { PAGE_THEMES } from '../../constants/display';

const initState = () => ({
  menus: createSampleListing(),
  websiteConfig: createSampleResource(),
  display: {
    pageTheme: PAGE_THEMES.DEFAULT,
  },
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
