// by donlq
import baseCreateApp from '@/app';
import { loadAllComponentsAsync } from './helpers';

const isUseSSR = ({ req, nodeServer }) => nodeServer.ssrAll
|| req.query.ssr || (req.headers['user-agent'] && /(google)|(bot)|(facebook)|(skype)|(bing)|(yahoo)|(zalo)/i.test(req.headers['user-agent']));

export default function createApp(context) {
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = baseCreateApp();
    const { logger } = context;

    router.beforeEach(async (to, from, next) => {
      await app.bootstrap();
      next();
    });

    if (isUseSSR(context)) {
      logger.log({ render: 'Server - No Cached' });
      router.asyncData = {};
      router.beforeEach(async (to, from, next) => {
        const matchedComponents = router.getMatchedComponents(to);
        const ssrContext = {
          $store: store,
          $router: router,
          $route: to,
          $context: app.$context,
        };
        if (!matchedComponents.length) {
          return reject({ code: 404 });
        }
        return Promise.all(await loadAllComponentsAsync(matchedComponents, ssrContext))
          .then(() => next()) // resolved. send to route ready
          .catch(reject);
      });
    } else {
      logger.log({ render: 'Client - No Cached' });
    }

    router.onReady(async () => {
      // after beforehook resolve
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      context.asyncData = router.asyncData;
      context.state = store.state;
      context.meta = app.$meta(); // pass vue-meta
      context.router = router; // pass router to outside
      resolve(app);
    }, reject);

    // set server-side router's location
    router.push(context.url);
  });
}
