import loadDefinedModules from './core/loaders';

const requireContext = require.context('@/modules', true, /\.\/([\w-]+)\/index.js$/);
const ALL_MODULES = requireContext.keys().map(path => requireContext(path).default);

export default function registerAllModules(context) {
  loadDefinedModules(context, ALL_MODULES);
}