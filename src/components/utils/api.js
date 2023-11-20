import axios from 'axios';

// const jwt = localStorage.getItem("token");
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzODkyNDIzMiwiZW1haWwiOiJsZUBwcmlzbWEuaW8iLCJpYXQiOjE3MDA0ODU4MjQsImV4cCI6MTcwMDUxNTgyNH0.v8udjK5jrqEYOc3OwNhsoNHJwN-Ens0siQiCsdF2H3I";
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