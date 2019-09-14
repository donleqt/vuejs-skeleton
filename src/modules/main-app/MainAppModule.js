import '@/modules/shared/components/import';
import AbstractAppModule from '../core/AbstractAppModule';
import AppWrapper from './views/AppWrapper';
import routes from './routes/index';

export default class MainAppModule extends AbstractAppModule {
  routes = routes;
  // no need store in static-html
  moduleStore = null;

  moduleName = 'main-app';

  wrapper = AppWrapper;

  onEnter = () => {

  };

  onExit = () => {

  };
}
