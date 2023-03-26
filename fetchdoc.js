const axios = window.axios;

class Fetch {
  constructor(options) {
    this.baseURL = options.baseURL + '/onshape';
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }
  async get(id, type) {
    const args = [this.baseURL]
    // options.headers = this.headers
    // options.baseURL = this.baseURL;
    if (id && type) args.push({
      params: {
        url: id,
        type,
      }
    });
    const res = await axios.get(...args);
    console.log(res)
    return res.data
  }
}

export { Fetch };