import appConfig from '@/config';
import { objectMap } from '@/helpers/utils';

const {
  api: { endPoint },
} = appConfig;

// REST
const apiPaths = {
  general: {
    config: '/config',
  },
};

objectMap(apiPaths, e =>
  objectMap(e, (path, key) => {
    e[key] = endPoint + e[key];
  }),
);

export default apiPaths;
