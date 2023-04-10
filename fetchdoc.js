const axios = window.axios;

class Fetch {
  constructor(options) {
    this.baseURL = options.baseURL + '/onshape';
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }
  async get(id, type,page) {
    page = page || 0;
    const args = [this.baseURL]
    // options.headers = this.headers
    // options.baseURL = this.baseURL;
    if (id && type) args.push({
      params: {
        url: id,
        type,
        page
      }
    });
    const res = await axios.get(...args);
    console.log(res)
    return res.data
  }
  async share(id,name){
    //https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
    const res = await axios.get(this.baseURL + "-sharefile",{responseType: 'blob',params:{document:id}});
    const href = URL.createObjectURL(res.data);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    console.log(name)
    link.setAttribute('download',name + '.stl'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    return res.data
  }
}

export { Fetch };