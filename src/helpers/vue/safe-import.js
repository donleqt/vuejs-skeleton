const isBrowser = () => typeof global.window !== 'undefined';

export default function safeImport(importFunction) {
  if (isBrowser()) {
    // eslint-disable-next-line import/no-dynamic-require
    return importFunction();
  }
  return {
    render: h => '',
  };
}
