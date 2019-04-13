function createCacheInstance() {
  const storage = {};
  const pending = {};

  const runAsyncFunction = (name, asyncFunction) => {
    return asyncFunction().then((res) => {
      storage[name] = res;
      return res;
    }).catch(err => delete storage[name]);
  };

  return {
    async get(name, asyncFunction) {
      if (storage[name]) {
        pending[name] = runAsyncFunction(name, asyncFunction);
        return storage[name];
      }
      if (!pending[name]) {
        pending[name] = runAsyncFunction(name, asyncFunction);
      }
      return pending[name];
    },
    delete(name) {
      delete storage[name];
    },
  };
}

const lazyCache = createCacheInstance();

export default lazyCache;