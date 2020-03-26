import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './locales/en';

Vue.use(VueI18n);

export function getLocaleLink(link) {
  const { $i18n } = this;
  const lang = $i18n.locale;
  if (lang !== 'en' && link && !link.includes('lang=')) {
    return `${link}?lang=${lang}`;
  }
  return link;
}

export function createI18n() {
  // Create VueI18n instance with options
  const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en',
    messages: {
      en,
    }, // set locale messages
    silentTranslationWarn: global.appConfig && global.appConfig.production,
  });

  return i18n;
}

export default createI18n;
