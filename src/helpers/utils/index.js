/* eslint-disable */

export const isEmail = s =>
  /^(([^<>()[\]\\.,;:`~#$%^&*+=!\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s);
  
export const objectMap = (object, callback) => Object.entries(object).map(([key, v], idz) => callback(v, key, idz));

export function removeFromArray(array, comparer) {
  const i = array.findIndex(comparer);
  if (i !== -1) {
    array.splice(i,1);
  }
  return array;
}

export const toCapitalized = str => str.replace(/^\w/, c => c.toUpperCase());

export function stripFields(data, fields) {
  fields.forEach((e) => {
    if (data[e] === '' || data[e] === undefined || data[e] === null) {
      delete data[e];
    }
  });
}

export function plural(count, name, ext = 's') {
  if (count <= 1) {
    return `${count} ${name}`;
  }
  return `${count} ${name + ext}`;
}

export function isDevelopment() {
  return process && process.env && process.env.NODE_ENV === 'development';
}

export function justTry(func) {
  try {
    func();
  } catch (err) {
    console.log(err);
  }
}


export function isScrollPassed(element, offset = 0) {
  const elementPosition = $(element).offset().top;
  const scrollPosition = window.scrollY + offset;
  return scrollPosition > elementPosition;
}

export function isInView(element) {
  var elementTop = $(element).offset().top;
  var elementBottom = elementTop + $(element).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
}

export const isInteger = s => /^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/.test(s);

export function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function arrayToRegexAll(arrString) {
  return arrString.map(e => `(${e})`).join('|');
}

export function delayForATime(time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function imageLoaded(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = (event) => resolve(image, event);
    image.src = src;
  });
}

export function triggerWindowResized(){
  if (window) {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}

const utils = {
  intervalWorker(condition, timeRecheck = 100) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval);
          resolve(true);
        }
      }, timeRecheck);
    });
  },
  scrollToElement(selector, offset = 0) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) {
      window.scrollTo(0, el.offsetTop - offset);
    }
  },
  isInternalUrl(url) {
    return url && url[0] === '/';
  },
  isExternalLink(url, location) {
    const domainRe = /https?:\/\/([\w:.-]+)(\/|$)/i;

    function domain(url) {
      if (domainRe.test(url)) {
        return domainRe.exec(url)[1];
      }
      return null;
    }

    return domain(url) !== null && domain(location) !== domain(url);
  },
  isNullAll(obj) {
    return !!Object.keys(obj).find(e => [obj[e]]);
  },
  getDateWithTimeZone(offset) {
    const d = new Date();
    const utc = d.getTime() - d.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  },
  convertToLocalTime(date, offset) {
    const utc = date.getTime() - 3600000 * offset;
    return new Date(utc + new Date().getTimezoneOffset() * 60000);
  },
  minutes: second => utils.leftPad(Math.floor(second / 60)) + ':' + utils.leftPad(second % 60),
  leftPad: (number, pad = 2) => {
    const str = number.toString();
    pad = new Array(pad + 1).join('0');
    return pad.substring(0, pad.length - str.length) + str;
  },
  makeArray(item) {
    if (!item) {
      return [];
    }
    if (Array.isArray(item)) {
      return item;
    }
    return [item];
  },
  pointNumber: (bigNumber, separator = ',') => {
    if (bigNumber && bigNumber.toString()) {
      return bigNumber.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
    }
    return '0';
  },
  pathParams: (str, params) => {
    Object.keys(params).map((key) => {
      str = str.replace(`:${key}`, params[key]);
    });
    return str;
  },
  smartGo(url, history, isNewTab = true) {
    if (utils.isExternalLink(url, window.location)) {
      window.open(url, isNewTab ? '_self' : null);
    } else if (history) {
      history.push(url.replace(/https?:\/\/([\w:.-]+)(\/|$)/i, '/'));
    }
  },
  standardUrl(path) {
    // Reformat path
    let res = path;
    if (path[path.length - 1] !== '/') {
      res += '/';
    }
    return res;
  },
  isSamePath(path1, path2) {
    return utils.standardUrl(path1) === utils.standardUrl(path2);
  },
  objectToArray(obj) {
    return Object.entries(obj).map(([key, val]) => {
      val.key = key;
      return val;
    });
  },
  convertToFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key && val) {
        formData.append(key, val);
      }
    });
    return formData;
  },
  cutStringByChar(content, nChar) {
    if (content.length > nChar) {
      return content.substring(0, nChar + 1) + '...';
    }
    return content;
  },
  cutString: (string, num) => {
    if (string && num) {
      let arr = string.split(' ');
      if (arr.length > num) {
        arr = arr.slice(0, num);
        string = arr.join(' ') + '...';
      }
    }
    return string;
  }
};

export default utils;
