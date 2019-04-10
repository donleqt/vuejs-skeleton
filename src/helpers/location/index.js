/* eslint-disable*/
import utils from '@/helpers/utils';

const locationHelper = {
  setUrlParams: data => {
    const currentData = locationHelper.getUrlParams();
    data = {
      ...currentData,
      ...data,
    };
    const str = Object.keys(data)
      .filter(key => data[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');
    if (location) {
      locationHelper.replaceUrl(`${location.pathname}?${str}`);
    }
  },
  clearUrlParams() {
    if (location) {
      locationHelper.replaceUrl(location.pathname);
    }
  },
  replaceUrl(newPath) {
    if (history) {
      history.replaceState(null, null, newPath + location.hash || '');
    }
  },
  getUrlParams: (str = location.search) => {
    const query = str.replace(/^([^=]*?\?)|(^\/)/, '');
    const result = {};
    if (query) {
      query.split('&').forEach(part => {
        const item = part.split('=');
        if (item.length === 2) {
          result[item[0]] = decodeURIComponent(item[1]);
        } else {
          result[item[0]] = true;
        }
      });
    }
    return result;
  },
  getLink(routePath, args) {
    const p = /:([^\d][\w]+)(\(.*?\))?/g;
    const matches = routePath.match(p);
    matches.map(e => {
      const result = p.exec(e) || /:([\w]+)/g.exec(e);
      const name = result[1];
      const value = args[name];
      const pattern = result[2];

      if (value) {
        if (pattern) {
          const regex = new RegExp(pattern);
          if (!regex.test(value)) {
            console.error(`:${name} (${value}) doesn't match Regex: ${pattern}`);
          }
        }
        routePath = routePath.replace(e, value);
      } else {
        console.error(`:${name} required`);
      }
    });
    return routePath;
  },
  appendPageParams(link, page) {
    if (page > 1) {
      return `${link}?page=${page}`;
    }
    return link;
  },
  checkPageParams(page) {
    return !isNaN(page) && page >= 1;
  },
  isInPaths(path) {
    if (path) {
      path = Array.isArray(path) ? path : [path];
      if (window && window.location.pathname) {
        for (const p of path) {
          if (locationHelper.isPathActive(window.location.pathname, p)) {
            return true;
          }
        }
      }
    }
    return false;
  },
  isPathActive: (path, opt = { exact: false, location: window.location.pathname }) => {
    let { location } = opt;
    let res = false;
    if (path) {
      location = utils.standardUrl(location);
      path = utils.standardUrl(path);
      if (opt.exact) {
        res = location === path;
      } else {
        res = location.indexOf(path) !== -1;
      }
    }
    return res;
  },
};

export default locationHelper;
