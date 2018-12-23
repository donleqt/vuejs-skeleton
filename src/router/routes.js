import { createRoute } from '@/helpers/vue/route-helper';
import NotFound from '@/modules/shared/views/NotFound';

const routes = {
  notFound: createRoute({
    path: '*',
    name: 'not-found',
    component: NotFound,
  }),
};

export default routes;
