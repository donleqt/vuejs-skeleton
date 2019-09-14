/* Register module */
export default {
  loadPath: '/',
  shouldLoad: () => true,
  module: () => require('./MainAppModule'),
};