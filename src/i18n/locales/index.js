import { map } from '@/helpers/javascript/functions';

const allLanguages = {
  en: () => import(/* webpackChunkName: "lang-en" */ './en.json'), // English
  vi: () => import(/* webpackChunkName: "lang-vi" */ './vi.json'), // Vietnamese
};

export const supportedLocales = map(allLanguages, (e, key) => key);

export async function getLocaleMessages(lang) {
  // Check if server has return the language
  if (global.isClient && window.__SERVER_DATA__ && window.__SERVER_DATA__.languages && window.__SERVER_DATA__.languages[lang]) {
    return window.__SERVER_DATA__.languages[lang];
  }

  if (allLanguages[lang]) {
    return allLanguages[lang]().then(res => res.default);
  }

  return null;
}