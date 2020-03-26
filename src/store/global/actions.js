import lazyCache from '@/helpers/cache';
import { GET_WEBSITE_CONFIG, GET_WEBSITE_CONFIG_FAIL, GET_WEBSITE_CONFIG_SUCCESS, LOAD_PAGE_FAIL } from './mutation-types';

export default {
  async getWebsiteConfig({ commit, state, dispatch }) {
    try {
      commit(GET_WEBSITE_CONFIG);
      const data = await lazyCache.get('web-config', () =>
        this.$context.apis.configs.findOne());
      commit(GET_WEBSITE_CONFIG_SUCCESS, data);
    } catch (error) {
      commit(GET_WEBSITE_CONFIG_FAIL, error);
      throw error;
    }
  },
  loadPageFail({ commit, state, dispatch }, payload) {
    commit(LOAD_PAGE_FAIL, payload);
  },
};
