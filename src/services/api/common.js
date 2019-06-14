import apiPaths from '@/constants/api/api-paths';
import RestApiAbstract from './rest-api-abstract';

const makePagesLink = array =>
  array.map(e => ({
    ...e,
    link: `/pages/${e.slug}.html`,
  }));

export class CommonApiService extends RestApiAbstract {
  async getWebsiteConfig() {
    return Promise.resolve(true);
  }
}

export default new CommonApiService();
