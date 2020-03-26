<template lang="pug">
  .app-wrapper
    slot
</template>
<style lang="scss" src="@/scss/style.scss"></style>
<script>
import globalStore from '@/store/global';
import config from '@/config';
import { hostPath } from '@/helpers/javascript/functions';
import initCookieMessage from '@/common/cookie-message';
import { supportedLocales } from '@/i18n/locales';

export default {
  name: 'AppWrapper',
  useStores: {
    globalStore,
  },
  metaInfo() {
    const languages = supportedLocales;
    const currentLang = this.$i18n.locale;

    return {
      htmlAttrs: {
        lang: currentLang,
      },
      meta: [
        {
          vmid: 'robots',
          name: 'robots',
          content: this.$webConfig.seoIndex ? 'index, follow' : 'noindex, nofollow',
        },
        {
          vmid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
      ],
      // multi language link
      link: [
        ...languages.map(e => ({
          rel: 'alternate',
          hreflang: e,
          href: `${hostPath(this.$route.path)}${e !== 'en' ? `?lang=${e}` : ''}`,
        })),
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: hostPath(this.$route.path),
        },
      ],
    };
  },
  mounted() {
    initCookieMessage({
      message: this.$webConfig.cookieMessage,
    });
  },
};
</script>
