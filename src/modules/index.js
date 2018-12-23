import locationHelper from '../helpers/location/index';
import moduleEvent from './event';

function shouldLoadModule(e, to) {
  return !e.loaded && locationHelper.isPathActive(e.loadPath, { location: to.path }) && (!e.shouldLoad || (e.shouldLoad && e.shouldLoad()));
}

function registerAllModules(context) {
  const { router } = context;
  // REGISTER APP MODULES HERE
  const APP_MODULES = [
    {
      module: require('./main-app'),
    },
    // // static html
    // {
    //   loadPath: '/',
    //   shouldLoad: () => true,
    //   module: () => import(/* webpackChunkName: "static-html" */ './static-html'),
    // },
  ];

  // load default module
  APP_MODULES.forEach((e) => {
    if (typeof e.module !== 'function') {
      e.loaded = true;
      const ModuleClass = e.module.default;
      new ModuleClass(context).register();
    }
  });

  // Function to load module when matched
  router.beforeEach(async (to, from, next) => {
    const matchedModules = APP_MODULES.filter(e => shouldLoadModule(e, to));
    if (matchedModules.length) {
      await Promise.all(
        matchedModules.map(async (currentModule) => {
          currentModule.loaded = true;
          const loading = currentModule.module();
          if (loading.then) {
            moduleEvent.emit('load', loading);
          }
          const ModuleClass = (await loading).default;
          new ModuleClass(context).register();
        }),
      );
      router.replace(to.fullPath);
      next();
    } else {
      next();
    }
  });
}

export default registerAllModules;
