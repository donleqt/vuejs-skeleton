import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import Meta from 'vue-meta';

import icons from './common/icons';
import { checkViewport } from './common/display';

Vue.config.productionTip = false;

// inject vm data
Object.assign(Vue.prototype, {
  console,
  $icons: icons,
  jsv: 'javascript:void(0)',
  $viewport: checkViewport(),
});

// install core libraries
// ==== VUE-META
Vue.use(Meta);

// ==== VUE LAZY-LOAD
const placeholder = require('@/assets/images/1px.png');

Vue.use(VueLazyLoad, {
  lazyComponent: true,
  loading: placeholder,
  error: placeholder,
  listenEvents: ['scroll', 'resize'],
  // use observer DOM for better performance
  observer: true,
  // define threshold
  observerOptions: {
    rootMargin: '100px',
    threshold: 0.6,
  },
});
