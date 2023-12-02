import axios, { AxiosTransformer } from 'axios';

const jwt = localStorage.getItem("token");
const baseUrl = 'http://localhost:3000';
const defaultTransformers = (): AxiosTransformer[] => {
  const { transformRequest } = axios.defaults;
  if (!transformRequest) {
    return [];
  } else if (transformRequest instanceof Array) {
    return transformRequest;
  } else {
    return [transformRequest];
  }
};
const instance = axios.create({
  baseURL: baseUrl,
  transformRequest: [function (data: string, headers: Record<string, string>) {
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    headers.Accept = 'application/json';
    headers['Content-type'] = 'application/json';
    return data;
  }, ...defaultTransformers()],
});

export const get = (url: string) => {
  return instance.get(`${url}`);
};
export const post = (url: string, body?: any) => {
  return instance.post(`${url}`, body);
};
export const _delete = (url: string) => {
  return instance.delete(`${url}`);
};
export const put = (url: string, body?: any) => {
  return instance.put(`${url}`, body);
};