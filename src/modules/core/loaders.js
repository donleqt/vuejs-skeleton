import locationHelper from '@/helpers/location/index';
import moduleEvent from '../core/event';

function shouldLoadModule(e, to) {
  return !e.loaded && locationHelper.isPathActive(e.loadPath, { location: to.path }) && (!e.shouldLoad || (e.shouldLoad && e.shouldLoad()));
}

export default function loadDefinedModules(context, APP_MODULES) {
  const { router } = context;

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
      try {
        await Promise.all(
          matchedModules.map(async (currentModule) => {
            const loading = currentModule.module();
            if (loading.then) {
              moduleEvent.emit('load', loading);
            }
            try {
              const ModuleClass = (await loading).default;
              currentModule.loaded = true;
              new ModuleClass(context).register();
            } catch (error) {
              throw error;
            }
          }),
        );
        router.replace(to.fullPath);
        next();
      } catch (error) {
        console.error(error);
        next();
        throw error;
      }
    } else {
      next();
    }
  });
}
