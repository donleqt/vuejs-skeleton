import '@/modules/shared/components/import';
import AbstractVueModule from '../abstract/index';
import AppWrapper from './views/AppWrapper';
import routes from './routes/index';

export default class MainAppModule extends AbstractVueModule {
  routes = routes;
  // no need store in static-html
  moduleStore = null;

  moduleName = 'main-app';

  wrapper = AppWrapper;

  onEnter = () => {
    document.querySelector('html').classList.add(this.moduleName);
  };

  onExit = () => {
    document.querySelector('html').classList.add(this.moduleName);
  };
}
