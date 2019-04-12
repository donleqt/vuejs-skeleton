function createCacheInstance() {
  const storage = {};
  const pending = {};
  return {
    async get(name, asyncFunction) {
      if (storage[name]) {
        pending[name] = asyncFunction().then(res => storage[name] = res);
        return storage[name];
      }
      if (!pending[name]) {
        pending[name] = asyncFunction().then(res => storage[name] = res);
      }
      return pending[name];
    },
  };
}

const lazyCache = createCacheInstance();

export default lazyCache;