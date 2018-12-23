import Vue from 'vue';
import Router from 'vue-router';
import appConfig from '@/config';
import { flatRoutes } from '@/helpers/vue/route-helper';
import routes from './routes';
import applyMiddleWare from '../middleware/index';
import patchRouter from './patch';

Vue.use(Router);

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    base: appConfig.baseUrl,
    routes: flatRoutes(routes),
    scrollBehavior(to, from, savedPosition) {
      if (from) {
        return { x: 0, y: 0 };
      }
      return null;
    },
  });
  patchRouter(router);
  applyMiddleWare(router);
  return router;
}
