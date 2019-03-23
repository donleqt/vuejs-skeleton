import NotFound from '@/modules/shared/views/NotFound';
import utils from '@/helpers/utils';

function fixHref(router) {
  if (global.isClient) {
    $(document).on('click', 'a', (event) => {
      const url = event.currentTarget.href;
      if (!utils.isExternalLink(url, location.href)) {
        event.preventDefault();
        router.push(url.replace(/https?:\/\/([\w:.-]+)(\/|$)/i, '/'));
      }
    });
  }
}

// patch the router so that is can inject http code
export default function patchRouter(router) {
  router.res = (code, error) => {
    const { meta } = router.currentRoute;
    router.code = code;
    if ([404, 500].includes(code)) {
      meta.wrapper = NotFound;

      if (error) {
        console.error({ ...error });
      }

      if (global.isClient) {
        if (router.app.$children[0] && router.app.$children[0].$forceUpdate) {
          router.app.$children[0].$forceUpdate();
        }
      }
    }
  };

  router.redirect = (path, code = 302) => {
    if (global.isServer) {
      router.code = code;
      router.redirectPath = path;
    } else if (utils.isExternalLink(path)) {
      window.location = path;
    } else {
      router.push(path);
    }
  };

  fixHref(router);
}
