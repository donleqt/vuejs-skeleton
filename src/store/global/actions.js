import { GET_WEBSITE_CONFIG, GET_WEBSITE_CONFIG_FAIL, GET_WEBSITE_CONFIG_SUCCESS } from './mutation-types';

export default {
  async getWebsiteConfig({ commit, state, dispatch }) {
    try {
      commit(GET_WEBSITE_CONFIG);
      const data = await this.$context.apiServices.common.getWebsiteConfig();
      commit(GET_WEBSITE_CONFIG_SUCCESS, data);
    } catch (error) {
      commit(GET_WEBSITE_CONFIG_FAIL, error);
      throw error;
    }
  },
};
