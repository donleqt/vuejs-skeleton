/* eslint-disable */
/**
 * Handle api response
 */
import toast from '@/helpers/user-interface/toast';
import {objectMap} from '@/helpers/utils';
import apiResponseCodes from '@/constants/api/api-response-codes';
import ClientStorageHelper from '@/helpers/client-storage';

export default class APIResponseHandler {
  static handleNetworkError(params, error) {
    const mockErrors = {
      status:
        error.response && error.response.status
          ? error.response.status
          : apiResponseCodes.networkError,
      errors: [`Network Error: ${error.message}`],
      message: error.message,
    };
    return mockErrors;
  }

  static handleBusinessError(params, { response }) {
    if (!response.data.errors) {
      response.data.errors = [response.data.message];
    }
    if (response.status === apiResponseCodes.unAuthenticated) {
      if (params.originUrl === apiPaths.auth.login) {
        toast.error('Incorrect email or password. Please try again!', 'Login error!');
        return response.data;
      }

      toast.error('Please login again!', 'Session Timeout');
      ClientStorageHelper.clearUserData();
      if (window.appHistory) {
        window.appHistory.loginRedirectTo = window.location.pathname.replace(routePaths.begin, '');
        window.appHistory.push(routePaths.pages.login);
      } else {
        window.location.pathname = routePaths.pages.login;
      }
    } else {
      objectMap(response.data.errors, m => toast.error(m));
    }
    return {
      ...response.data,
      status: response.status,
    };
  }

  static handleTimeout(params) {
    if (!params.isUpload) {
      toast.error('Request timeouted');
      return params;
    }
  }
}
