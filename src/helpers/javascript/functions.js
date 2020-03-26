import config from '@/config';

export function map(target, callback) {
  return Object.entries(target).map(([key, val], i) => callback(val, key, i));
}

/**
 * Append host to image
 * @param {string} path without host
 */
export function hostPath(path) {
  if (typeof path === 'string' && path.startsWith('/')) {
    return config.host + path;
  }
  return path;
}

export function loadScript(url, callback = () => { }) {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' ||
        script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { // Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Remove all falsty fields
 * @param {object} value want to remove all falsty fields
 */
export function stripFields(value) {
  map(value, (e, key) => {
    if ([null, undefined, '', false].includes(e)) {
      delete value[key];
      return;
    }
    if (typeof e === 'object') {
      stripFields(e);
    }
  });
  return value;
}

/**
 * Check if the browser is a bot
 */
export function isBot() {
  const userAgent = global.navigator && global.navigator.userAgent ? global.navigator.userAgent : '';
  return userAgent.includes('Chrome-Lighthouse') || userAgent.includes('bot');
}
