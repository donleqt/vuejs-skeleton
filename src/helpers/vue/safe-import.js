const isBrowser = () => typeof global.window !== 'undefined';

/**
 * Use this function to safe-ly import library which is not compatible
 * with SSR mode.
 * @param {function} importFunction example: () => require('some-lib').default
 */
export default function safeImport(importFunction) {
  if (isBrowser()) {
    // eslint-disable-next-line import/no-dynamic-require
    return importFunction();
  }
  return {
    render: h => <div class="ssr-skip-render-lib-import"></div>,
  };
}
