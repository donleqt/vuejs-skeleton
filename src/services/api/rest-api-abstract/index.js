import defaultApiCaller from '@/services/api-caller';

class RestApiAbstract {
  // resource api paths and example schema
  resource = {
    base: '',
    single: '',
    trash: '',
  };

  defaultParams = {};

  apiCaller;

  constructor({ apiCaller = defaultApiCaller } = {}) {
    this.apiCaller = apiCaller;
  }

  getOne = async (id) => {
    const resp = await this.apiCaller.get(this.resource.single, {
      inUrl: {
        id,
      },
    });
    return resp && resp.data && this.parseResponse(resp.data);
  };

  getList = async (params = {}) => {
    const resp = await this.apiCaller.get(this.resource.base, {
      query: {
        ...params,
        ...this.defaultParams.getlist,
      },
    });
    if (resp.data && resp.data.length) {
      resp.data = resp.data.map(this.parseResponse);
    }
    return resp;
  };

  update = async (id, body) => {
    const resp = await this.apiCaller.put(this.resource.single, {
      inUrl: { id },
      body,
    });
    return resp;
  };

  create = async (body) => {
    const resp = await this.apiCaller.post(this.resource.base, {
      body,
    });
    return resp;
  };

  delete = async (id) => {
    const resp = await this.apiCaller.delete(this.resource.single, {
      inUrl: { id },
    });
    return resp;
  };

  parseResponse = data => data;
}

export default RestApiAbstract;
