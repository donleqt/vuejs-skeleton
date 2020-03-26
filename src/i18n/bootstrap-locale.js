import locationHelper from '@/helpers/location';
import { getLocaleMessages } from './locales';

function detectLanguage(context) {
  if (global.isServer) {
    if (context.serverContext) {
      let lang = context.serverContext.req.query.lang;
      lang = lang && lang.toLowerCase();
      return lang;
    }
  } else {
    if (context.router.currentRoute.query.lang) {
      return context.router.currentRoute.query.lang;
    }
    const htmlLang = $('html').attr('lang');
    return htmlLang;
  }
  return null;
}

export default async function bootstrapLocale(context) {
  const { $i18n } = context.app;
  const queryLang = detectLanguage(context);

  if (queryLang) {
    const messages = await getLocaleMessages(queryLang);
    if (messages) {
      // Add language data
      $i18n.setLocaleMessage(queryLang, messages);
      // Set locale value
      $i18n.locale = queryLang;
    }
  }

  // hook router
  context.router.afterEach((to, from) => {
    const lang = context.app.$i18n.locale;

    if (global.isClient && lang !== 'en') {
      setTimeout(() => {
        locationHelper.setUrlParams({
          lang,
        });
      }, 0);
    }
  });
}