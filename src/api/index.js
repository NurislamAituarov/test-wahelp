import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const request = (method, url, data) => {
  return instance({
    method,
    url,
    data,
  });
};

export const get = (url, params) => request('get', url, { params });
export const post = (url, data) => request('post', url, data);
