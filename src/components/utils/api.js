import axios from 'axios';

const jwt = localStorage.getItem("token");
const baseUrl = 'http://localhost:3000';
const instance = axios.create({
  baseURL: baseUrl,
  transformRequest: [function (data, headers) {
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    headers.Accept = 'application/json';
    headers['Content-type'] = 'application/json';
    console.log("headers: ", headers);
    return data;
  }, ...axios.defaults.transformRequest],
});

export const get = url => {
  return instance.get(`${url}`);
};
export const post = (url, body) => {
  return instance.post(`${url}`, body);
};
export const _delete = url => {
  return instance.delete(`${url}`);
};
export const put = (url, body) => {
  return instance.put(`${url}`, body);
};
export default {
  get,
  post,
  put,
  _delete,
}