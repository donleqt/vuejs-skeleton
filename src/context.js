import Vue from 'vue';
import { CommonApiService } from '@/services/api/common';
import { ApiCaller } from './services/api-caller/index';

// create a fresh context for the app
// including api caller and services
// this pattern prevent poluted to the global
export function createContext() {
  const apiCaller = new ApiCaller();
  const context = {
    apiCaller,
    apiServices: {
      common: new CommonApiService({ apiCaller }),
    },
  };
  return context;
}

// create a business function to bootstrap app context
// this function will be run before the app start to mount
export function contextBootstrap(context) {
  return async function () {
    // inject $context to root vue instance (app)
    context.app.$context = context;
    // inject $context to vuex store
    context.store.$context = context;

    // create a mixins to easily access context from vue component in the app
    if (!Vue._contextMixinAdded) {
      Vue._contextMixinAdded = true;
      Vue.mixin({
        beforeCreate() {
          this.$context = this.$root.$context;
        },
      });
    }

    // do other bootstrap
    await context.store.bootstrap();
  };
}
