import { flatRoutes } from '@/helpers/vue/route-helper';

export default class AbstractVueModule {
  routes = {};
  basePath = '';
  wrapper = {};

  constructor(context) {
    const {
      basePath, router, store, app,
    } = context;
    this.$context = context;
  }

  register() {
    const flattedRoutes = flatRoutes(this.routes);
    const { wrapper } = this;
    this.onRegister();
    let ModuleWrapper = {
      name: 'ModuleWrapper',
      beforeMount: this.onEnter,
      beforeDestroy: this.onExit,
      render(h) {
        return <div>{this.$slots.default}</div>;
      },
    };

    if (wrapper) {
      wrapper.mixins = wrapper.mixins || [];
      wrapper.mixins = wrapper.mixins.filter(e => e.name !== 'ModuleWrapper');
      wrapper.mixins.push(ModuleWrapper);
      ModuleWrapper = wrapper;
    }

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
