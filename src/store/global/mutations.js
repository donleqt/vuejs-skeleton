import { createSampleListing, createSampleResource } from '@/helpers/samples';
import { GET_WEBSITE_CONFIG, GET_WEBSITE_CONFIG_FAIL, GET_WEBSITE_CONFIG_SUCCESS, LOAD_PAGE_FAIL } from './mutation-types';

export const initState = () => ({
  menus: createSampleListing(),
  websiteConfig: createSampleResource(),
  routerError: null,
});

export default {
  [GET_WEBSITE_CONFIG]({ websiteConfig }) {
    websiteConfig.isFetching = true;
  },
  [GET_WEBSITE_CONFIG_SUCCESS]({ websiteConfig }, payload) {
    websiteConfig.isFetching = false;
    websiteConfig.data = payload;
  },
  [GET_WEBSITE_CONFIG_FAIL]({ websiteConfig }, payload) {
    websiteConfig.isFetching = false;
    websiteConfig.error = payload;
  },
  [LOAD_PAGE_FAIL](state, payload) {
    state.routerError = payload;
  },
};
