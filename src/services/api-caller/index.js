import config from '@/config';
import { create } from 'axios';
import ClientStorageHelper from '@/helpers/client-storage';
import utils from '@/helpers/utils';
import createObserver from '@/helpers/javascript/observer';
import APIResponseHandler from './api-response-handler';

const BASE_URL = config.api.endPoint;
const TIMEOUT = 20 * 1000;
const defaultAxios = create({});

export class ApiCaller {
  cached = {};
  responseHandler = APIResponseHandler;

  event = createObserver();

  createCallerMethod = method => (url, options = {}) => {
    const cacheKey = `${url}-${method}`;
    options.axios = defaultAxios;

    if (options.useCache) {
      if (!this.cached[cacheKey]) {
        this.cached[cacheKey] = this.callApi(url, options, method);
      }
      return this.cached[cacheKey];
    }
    return this.callApi(url, options, method);
  };

  callApi = async (url, options, method) => {
    const opt = { ...options };
    const headers = { ...opt.headers };
    const originUrl = url;

    // Add access token to request
    const accessToken = ClientStorageHelper.getToken();

    if (!opt.noAuth && accessToken) {
      headers.Authorization = accessToken;
    }

    // Fix the internal url
    if (/^\//.test(url) && !options.keepUrl) {
      url = BASE_URL + url;
    }

    if (!opt.noEvent) {
      this.event.emit('apiCall', { options: opt, url });
    }

    /* Prepare the api data */
    // Check if is files
    if (!opt.isUpload) {
      headers.Accept = 'application/json';
      headers['Content-Type'] = 'application/json; charset=utf-8';
      if (opt.body) {
        opt.body = JSON.stringify(opt.body);
      }
    }

    // Parse inUrl params
    if (opt.inUrl) {
      Object.keys(opt.inUrl).map((key) => {
        if (opt.inUrl[key] !== undefined) {
          return url = url.replace(`:${key}`, opt.inUrl[key]);
        }
        throw new Error(`You didn't pass :${key} params in api url => ${originUrl}`);
      });
    }

    // Parse query params
    if (opt.query) {
      url += ApiCaller.generateUrl(opt);
    }

    // Call api
    const sendingParams = {
      url,
      method,
      body: opt.body,
      headers,
      originUrl,
    };

    const apiPromise = this.doSendApi({
      url,
      method,
      body: opt.body,
      headers,
      opt,
    });
    let isDone = false;

    setTimeout(() => {
      if (!isDone && !opt.isUpload && !opt.noTimeOut) {
        this.responseHandler.handleTimeout(sendingParams);
      }
    }, opt.timeout || TIMEOUT);

    try {
      const resp = ApiCaller.afterSuccess(await apiPromise);
      isDone = true;
      return resp;
    } catch (err) {
      isDone = true;
      if (err.response && err.response.data && (err.response.data.errors || err.response.data.message)) {
        return Promise.reject(this.responseHandler.handleBusinessError(sendingParams, err));
      }
      return Promise.reject(this.responseHandler.handleNetworkError(sendingParams, err));
    }
  };

  doSendApi({
    url, method, body, headers, opt,
  }) {
    const axios = opt.axios;
    if (opt.isUpload) {
      const cancelSource = axios.CancelToken.source();
      return axios[method](url, utils.convertToFormData(body), {
        headers,
        cancelToken: cancelSource.token,
        onUploadProgress: event => opt.onProgress && opt.onProgress(event, cancelSource),
      });
    }
    if (['get', 'delete'].includes(method)) {
      return axios[method](url, { headers });
    }
    return axios[method](url, body, { headers });
  }

  static afterSuccess(resp) {
    return { ...resp, paging: ApiCaller.parsePaging(resp) };
  }

  static parsePaging(resp) {
    if (resp.headers && resp.headers['x-current-page']) {
      return {
        currentPage: parseInt(resp.headers['x-current-page'], 10),
        totalPage: parseInt(resp.headers['x-last-page'], 10),
        limit: parseInt(resp.headers['x-limit'], 10),
        totalData: parseInt(resp.headers['x-total'], 10),
      };
    }
    return null;
  }

  static generateUrl(opt) {
    return `?${Object.entries(opt.query)
      .filter(([key, value]) => key !== undefined && value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          const str = value.map((e) => {
            return `${key.toString()}=${encodeURIComponent(e.toString())}`;
          });
          return str.join('&');
        }
        return `${key.toString()}=${encodeURIComponent(value.toString())}`;
      })
      .join('&')}`;
  }

  // Create public api call methods
  get = this.createCallerMethod('get');
  post = this.createCallerMethod('post');
  put = this.createCallerMethod('put');
  delete = this.createCallerMethod('delete');
}

export default new ApiCaller();
