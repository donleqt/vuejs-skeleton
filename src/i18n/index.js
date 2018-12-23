import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en';
import fr from './fr';
import de from './de';

Vue.use(VueI18n);

const messages = {};
const locales = [
  en,
  fr,
  de,
];

locales.forEach((data) => {
  // eslint-disable-next-line import/no-dynamic-require
  messages[data.locale] = data;
});

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

export default i18n;
