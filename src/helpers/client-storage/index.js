import Cookies from 'universal-cookie';

const cookies = new Cookies({ path: '/' });
const tokenKey = 'access_token';
const userKey = 'user';

class ClientStorageHelper {
  static getToken() {
    return cookies.get(tokenKey);
  }

  static clearUserData() {
    ClientStorageHelper.clearToken();
    cookies.remove(userKey);
  }

  static saveTokenData({ tokenType, accessToken }) {
    cookies.set(tokenKey, `${tokenType} ${accessToken}`);
  }

  static clearToken() {
    cookies.remove(tokenKey);
  }
  static clearAllData() {
    cookies.remove(tokenKey);
  }
}

export default ClientStorageHelper;
