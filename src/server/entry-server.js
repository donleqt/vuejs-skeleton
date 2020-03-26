// by donlq
import baseCreateApp from '@/app';
import { loadAllComponentsAsync } from './helpers';

const isUseSSR = ({ req, nodeServer }) => nodeServer.ssrAll
|| req.query.ssr || (req.headers['user-agent'] && /(google)|(bot)|(facebook)|(skype)|(bing)|(yahoo)|(zalo)/i.test(req.headers['user-agent']));

export default function createApp(context) {
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = baseCreateApp(context);
    const logInfo = {};
    router.beforeEach(async (to, from, next) => {
      try {
        await app.bootstrap();
        next();
      } catch (error) {
        reject(error);
      }
    });

    if (isUseSSR(context)) {
      router.asyncData = {};
      router.beforeEach(async (to, from, next) => {
        const matchedComponents = router.getMatchedComponents(to);
        const ssrContext = {
          req: context.req,
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
      logInfo.render = 'Client Side - No Cached';
    }

    router.onReady(async () => {
      try {
        // after beforehook resolve
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.asyncData = router.asyncData;
        context.state = store.state;
        context.webConfig = store.state.global.websiteConfig.data;
        context.meta = app.$meta(); // pass vue-meta
        context.$i18n = app.$i18n;
        context.router = router; // pass router to outside
        // Data send to client side
        context.serverData = {
          languages: {
            [app.$i18n.locale]: app.$i18n.getLocaleMessage(app.$i18n.locale),
          },
        };
        resolve(app);
      } catch (error) {
        reject(error);
      }
    }, reject);

    // set server-side router's location
    router.push({ path: context.url });
  });
}
