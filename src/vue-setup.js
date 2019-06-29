import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import Meta from 'vue-meta';
import toast from '@/helpers/user-interface/toast';

import icons from './common/icons';
import { checkViewport } from './common/display';

Vue.config.productionTip = false;

// inject vm data
Object.assign(Vue.prototype, {
  console,
  jsv: 'javascript:void(0)',
  $icons: icons,
  $viewport: checkViewport(),
  $toast: toast,
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
