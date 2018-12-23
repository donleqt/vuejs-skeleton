<template lang="pug" src="./Sitemap.pug"></template>
<script>
import { injectAsync } from '@/server/ssr/inject-async';

function asyncData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        title: 'SSR Sitemap',
      });
    }, 1);
  });
}

export default {
  name: 'Sitemap',
  mixins: [injectAsync(asyncData)],
  metaInfo() {
    return {
      title: this.async.data && this.async.data.title,
    };
  },
  data() {
    // eslint-disable-next-line no-underscore-dangle
    return {
      routePaths: [{
        name: 'Home',
        link: '/',
      }],
    };
  },
};
</script>
<style lang="scss">
  .sitemap-page {
    margin-top: 100px;
    margin-bottom: 100px;
  }
  ol {
    font-size: 2.5rem;
    display: inline-block;
    li {
      margin: 10px 0;
    }
    a {
      font-size: inherit;
      &:hover {
        opacity: 0.6;
      }
    }
  }
</style>

