/* eslint-disable no-underscore-dangle */
import Vue from 'vue';

if (global.isClient) {
  Vue.prototype.$asyncData = window.__ASYNC_DATA__;
}

export default function injectAsync(asyncFunc, asyncKey) {
  return {
    asyncKey,
    asyncData: asyncFunc, // inject for ssr
    data() {
      return {
        async: this.async,
      };
    },
    beforeCreate() {
      this.async = {
        data: null,
        error: false,
        loading: false,
      };
    },
    created() {
      const cacheId = asyncKey || this.$options.name;

      this.loadAsync = async () => {
        if (global.isServer) {
          this.$asyncData = this.$router.asyncData;
        }
        if (this.$asyncData && this.$asyncData[cacheId]) {
          this.async.data = this.$asyncData[cacheId];
          if (this.onAsyncResolved) {
            this.onAsyncResolved(this.async.data);
          }
          if (global.isClient) {
            delete this.$asyncData[cacheId];
          }
        } else {
          try {
            this.async.loading = true;
            const resp = await asyncFunc.call(this);
            this.async.loading = false;
            this.async.data = resp;
            if (resp && this.onAsyncResolved) {
              this.onAsyncResolved(resp);
            }
          } catch (error) {
            console.error(error);
            this.async.error = error;
          }
        }
      };
      this.loadAsync();
    },
    methods: {
      onAsyncResolved() {
      },
    },
  };
}

export function injectAsyncDataSSR(component, data, { $router }) {
  // inject to data container
  const mixin = component.mixins.find(e => e.asyncKey);
  const cacheId = mixin ? mixin.asyncKey : component.name;
  $router.asyncData[cacheId] = data;
}
