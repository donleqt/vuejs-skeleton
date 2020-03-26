import { objectMap } from '@/helpers/utils';
import { injectAsyncDataSSR } from '@/server/ssr/inject-async';

function findAsyncData(component) {
  // find async function in component and component's mixins
  if (component.asyncData) {
    return component.asyncData;
  } else if (component.mixins) {
    const mixin = component.mixins.find(e => e.asyncData);
    if (mixin) {
      return mixin.asyncData;
    }
  }
  return null;
}

const loadComponents = async (component, asyncPromises, ssrContext) => {
  if (typeof component === 'function') {
    component = await component().then(c => c.default);
  }
  const asyncData = findAsyncData(component);
  if (asyncData) {
    const exec = asyncData.apply(ssrContext);
    exec.then(data => injectAsyncDataSSR(component, data, ssrContext));
    asyncPromises.push(exec);
  }
  if (component.components) {
    await Promise.all(objectMap(component.components, loadComponents));
  }
  return true;
};

export function loadAllComponentsAsync(components, ssrContext) {
  const asyncPromises = [];

  return Promise.all(components.map(e => loadComponents(e, asyncPromises, ssrContext))).then(() => {
    return asyncPromises;
  });
}