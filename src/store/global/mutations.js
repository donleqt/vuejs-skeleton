import { GET_WEBSITE_CONFIG, GET_WEBSITE_CONFIG_FAIL, GET_WEBSITE_CONFIG_SUCCESS } from './mutation-types';

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
};
