import appConfig from '@/config';
import { objectMap } from '../utils';

export const createRoute = (data) => {
  const path = global.isServer && data.path && data.path !== '*' ? `${appConfig.baseUrl}${data.path}` : data.path;
  return {
    path: path && path.replace(/\/{2}/, '/'),
    name: data.name,
    meta: data.meta || {},
    component: data.component,
  };
};

export const isRoute = (data) => {
  const sampleKeys = Object.keys(createRoute({}));
  return Object.keys(data).filter(e => sampleKeys.includes(e)).length === sampleKeys.length;
};

export const flatRoutes = (params) => {
  const flatted = [];
  const flatter = r =>
    objectMap(r, (e) => {
      if (isRoute(e)) {
        flatted.push(e);
      } else if (!e.path) {
        flatter(e);
      }
      return true;
    });
  flatter(params);
  return flatted;
};
