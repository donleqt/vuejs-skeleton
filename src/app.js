import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import i18n from './i18n';
import './js/plugins';
import './vue-setup';

import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import registerAllModules from './modules/index';
import { createContext, contextBootstrap } from './context';

// export a factory function for creating fresh app, router and store
export default function createApp() {
  const store = createStore();
  const router = createRouter();
  const context = createContext();

  // add store and router to the context
  // so far in the code, we can easily access store and router from the context
  Object.assign(context, {
    store,
    router,
  });

  // register all app Modules with current context
  registerAllModules(context);

  sync(store, router);

  const app = (context.app = new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
  }));

  // define bootstrap function of the app
  // entry-client, entry-server must run app.bootstrap()
  // before mount the app;
  app.bootstrap = contextBootstrap(context);

  return { app, store, router };
}
