import apiPaths from '@/constants/api/api-paths';
import RestApiAbstract from './rest-api-abstract';

const makePagesLink = array =>
  array.map(e => ({
    ...e,
    link: `/pages/${e.slug}.html`,
  }));

export class CommonApiService extends RestApiAbstract {
  async getWebsiteConfig() {
    const resp = await this.apiCaller.get(apiPaths.general.config);

    // parse response
    const data = {
      logo: resp.data.logo,
      mainMenu: makePagesLink(resp.data.main_menu),
      footerMenu: makePagesLink(resp.data.footer_menu),
      staticPages: makePagesLink(resp.data.static_pages),
      privacyPages: makePagesLink(resp.data.privacy_pages),
      specialPages: makePagesLink(resp.data.special_pages),
      socialLinks: resp.data.social_links,
      themeColors: resp.data.colors,
    };

    if (resp.data.seo) {
      data.seo = {
        templateTitle: resp.data.seo.template_title || 'Lunaestella - %s',
        meta: resp.data.meta,
      };
    }

    return data;
  }
}

export default new CommonApiService();
