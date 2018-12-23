import { createRoute } from '@/helpers/vue/route-helper';
// layouts
import BlankLayout from '@/modules/shared/layouts/BlankLayout';
// pages
import Home from '@/modules/main-app/views/Home';
import routePaths from './route-paths';


const routes = {
  index: createRoute({
    path: routePaths.index,
    name: 'main-app-index',
    component: Home,
    meta: {
      layout: BlankLayout,
    },
  }),
};

export default routes;
