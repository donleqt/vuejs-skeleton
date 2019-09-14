import { flatRoutes } from '@/helpers/vue/route-helper';
import { removeFromArray } from '@/helpers/utils';

export default class AbstractAppModule {
  routes = {};
  basePath = '';
  wrapper = null;

  constructor(context) {
    this.$context = context;
  }

  register() {
    const flattedRoutes = flatRoutes(this.routes);
    const $this = this;
    this.onRegister();
    const ModuleWrapper = {
      name: `${this.moduleName}ModuleWrapper`,
      beforeCreate: () => {
        this.$context.modules.push(this);
        this.onEnter();
      },
      beforeDestroy: () => {
        removeFromArray(this.$context.modules, e => e === this);
        this.onExit();
      },
      render(h) {
        const wrapper = $this.wrapper || 'div';
        return <wrapper>{this.$slots.default}</wrapper>;
      },
    };

    flattedRoutes.forEach((e) => {
      e.path = `${this.basePath}${e.path}`;
      e.meta.wrapper = ModuleWrapper;
    });

    this.$context.router.addRoutes(flattedRoutes);
    this.registerStore();
  }

  registerStore() {
    const { store } = this.$context;
    const { moduleStore } = this;
    if (store && moduleStore) {
      const listStores = Array.isArray(moduleStore) ? moduleStore : [moduleStore];
      listStores.forEach(e => store.registerModule(e.name, e, { preserveState: false }));
    }
  }

  onRegister() {
  }

  onEnter = () => {};

  onExit = () => {};
}
