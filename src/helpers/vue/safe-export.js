const MockComponent = {
  render: h => <div class="ssr-skip-render"></div>,
};

/**
 * Use this function to export component is not compatible with SSR mode.
 * The helper simply skip rendering that component on server side.
 * but client-side still renders without change.
 * @param {*} Component Vue Component,  Vue Async component
 */
export default function safeExport(Component) {
  return global.isServer ? MockComponent : Component;
}
