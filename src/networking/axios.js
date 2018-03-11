import axios from 'axios'

export async function fetch(url, params = {}) {
  return await axios.get(url, {params});
}

export async function post(url, params = {}) {
  let ret = '';
  for (let it in params) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
  }
  return await axios.post(url, ret);
}

export async function patch(url, params = {}) {
  return await axios.patch(url, params);
}

export async function put(url, params = {}) {
  let ret = '';
  for (let it in params) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
  }
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return await axios.put(url, ret, config);
}

export async function getBuffer(url, params = {}) {
  return await axios.get(url, {
    params: params,
    responseType: 'arraybuffer'
  });
}
