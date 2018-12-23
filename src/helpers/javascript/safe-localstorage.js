function createSafeLocalStorage() {
  if (typeof window !== 'undefined') {
    return new Proxy({}, {
      get(target, name) {
        try {
          return window.localStorage.getItem(name);
        } catch (error) {
          return null;
        }
      },
      set(target, name, value) {
        try {
          window.localStorage.setItem(name, value);
        } catch (error) {
        }
        return value;
      },
    });
  }
  return {};
}

export default createSafeLocalStorage;
